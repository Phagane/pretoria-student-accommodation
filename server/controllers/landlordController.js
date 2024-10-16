const mongoose = require('mongoose');
const Property = require('../models/propertyModel');
const User = require('../models/userModel')
const dotenv = require('dotenv')
const nodemailer = require('nodemailer');
const multer = require('multer');
const path = require('path');


dotenv.config({path: './../config/config.env'})

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/'); // You can define your own path here for storing images
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique file name
  },
});

// File filter to allow only images
const fileFilter = (req, file, cb) => {
  const fileTypes = /jpeg|jpg|png/;
  const extname = fileTypes.test(path.extname(file.originalname).toLowerCase());
  const mimetype = fileTypes.test(file.mimetype);

  if (extname && mimetype) {
    cb(null, true);
  } else {
    cb(new Error('Only image files are allowed!'), false);
  }
};

// Initialize multer upload with the defined storage and file filter
const upload = multer({
  storage,
  limits: { fileSize: 1024 * 1024 * 5 }, // 5 MB file size limit
  fileFilter,
}).array('images', 6);

exports.addProperty = (req, res) => {
  upload(req, res, async (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message });
    }

    const {
      name,
      description,
      price,
      location,
      furnished,
      genderAllowed,
      occupancyType,
      latitude,
      longitude,
    } = req.body;

    // Extract image URLs
    const imageUrls = req.files.map(file => `/uploads/${file.filename}`);

    try {
      const property = new Property({
        name,
        description,
        price,
        location,
        furnished,
        genderAllowed,
        occupancyType,
        images: imageUrls,  // Store the array of image URLs
        agent: {
          email: req.user.email,
          phoneNum: req.user.phoneNumber
        },
        latitude,
        longitude,
      });

      await property.save();
      res.status(201).json({
        success: true,
        message: 'Property added successfully',
        property,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Error adding property',
        error: error.message,
      });
    }
  });
};

exports.getLandlordProperties = async (req, res) => {
    try {
      const landlordEmail = req.user.email; 
      const properties = await Property.find({ 'agent.email': landlordEmail });
  
      if (!properties) {
        return res.status(404).json({ 
          message: 'No properties found for this landlord' 
        });
      }
  
      res.status(200).json({ properties });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };

  exports.getPropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;

      const baseURL = `${process.env.BASE_URL}`

      const property = await Property.findById(propertyId).lean();
  
      if (!property) {
        return res.status(404).json({ 
          message: 'Property not found' 
        });
      }

      const propertyWithFullImageURLs = {
        ...property,
        images: property.images.map(image => `${baseURL}${image}`), // Prepend baseURL to each image path
      };

      res.status(200).json(propertyWithFullImageURLs);

    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.updatePropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;
      const updates = req.body;
  
      const updatedProperty = await Property.findByIdAndUpdate(propertyId, updates, { new: true });
  
      if (!updatedProperty) {
        return res.status(404).json({ 
          message: 'Property not found' 
        });
      }
  
      res.status(200).json({ 
        property: updatedProperty 
      });
    } catch (error) {
      console.error('Error updating property:', error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };

  exports.deletePropertyById = async (req, res) => {
    try {
      const { propertyId } = req.params;
  
      const deletedProperty = await Property.findByIdAndDelete(propertyId);
  
      if (!deletedProperty) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json({ 
        message: 'Property deleted successfully' 
      });
    } catch (error) {
      console.error('Error deleting property:', error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };

  exports.addTenantToProperty = async (req, res) => {
    const { propertyId } = req.params; 
    const { email, roomNumber, roomType } = req.body;
      
    try {
     
      const user = await User.findOne({ email });
  
      if (!user) {
        return res.status(404).json({ message: 'User not found' });
      }
  
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }

      const existingTenant = property.tenants.find((tenant) => tenant.user.toString() === user._id.toString());
  
      if (existingTenant) {
        return res.status(400).json({ message: 'Tenant already exists in this property' });
      }
    
      const newTenant = {
        user: user._id,  
        roomNumber,
        roomType,  
      }; 
    
      property.tenants.push(newTenant);

      await property.save();
  
      res.status(201).json({ message: 'Tenant added successfully', property });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  
exports.getTenants = async (req, res) => {
  const { propertyId } = req.params; 

  try {
    
    const property = await Property.findById(propertyId).populate({
      path: 'tenants.user', 
      select: 'name email phoneNumber', 
    });

    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }

    const tenants = property.tenants;

    res.status(200).json({ tenants });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
};


exports.deleteTenant = async (req, res) => {
  try {
    const { propertyId, tenantId } = req.params;

    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }


    const tenantIndex = property.tenants.findIndex(tenant => tenant._id.toString() === tenantId);
    if (tenantIndex === -1) {
      return res.status(404).json({ 
        message: 'Tenant not found' 
      });
    }

    property.tenants.splice(tenantIndex, 1);

    await property.save();

    res.status(200).json({ 
      message: 'Tenant deleted successfully', 
      property 
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

exports.getLandlordNotifications = async (req, res) => {
  try {
    const landlordEmail = req.user.email;

    const properties = await Property.find({ 'agent.email': landlordEmail })
      .select('applicants viewingRequests name')
      .populate({
        path: 'applicants.user', 
        select: 'name email phoneNumber', 
      });

    if (!properties.length) {
      return res.status(404).json({ message: 'No properties found for this landlord' });
    }

    const applicants = [];
    const viewingRequests = [];

    properties.forEach((property) => {
      property.applicants.forEach((applicant) => {
        applicants.push({
          ...applicant._doc,
          propertyId: property._id,
          propertyName: property.name, 
          applicantName: applicant.user.name, 
          applicantEmail: applicant.user.email, 
          applicantPhone: applicant.user.phoneNumber, 
        });
      });

      property.viewingRequests.forEach((request) => {
        viewingRequests.push({
          ...request._doc,
          propertyId: property._id,
          propertyName: property.name, 
        });
      });
    });

    res.status(200).json({
      applicants,
      viewingRequests,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
};

exports.acceptApplicant = async (req, res) => {

  const { propertyId, applicantId, roomNumber, roomType } = req.body;

  try {

    const property = await Property.findById(propertyId);
    
    if (!property) {
      return res.status(404).json({ success: false, message: 'Property not found' });
    }

    const applicant = property.applicants.id(applicantId);

    if (!applicant) {
      return res.status(404).json({ 
        success: false, 
        message: 'Applicant not found' 
      });
    }

    const tenant = {
      user: applicant.user,
      roomNumber: roomNumber, 
      occupancyType: roomType,

    };

    property.tenants.push(tenant);

    property.applicants = property.applicants.filter(app => app._id.toString() !== applicantId);

    await property.save();

    res.status(200).json({
      success: true,
      message: 'Applicant accepted and added as tenant',
      tenant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      success: false, 
      message: 'Server error'
     });
  }
};

exports.rejectApplicant = async (req, res) => {
  const { applicantId, propertyId } = req.body;

  try {
   
    const property = await Property.findById(propertyId);
    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }

    const applicant = property.applicants.id(applicantId);
    if (!applicant) {
      return res.status(404).json({ 
        message: 'Applicant not found' 
      });
    }

   
    property.applicants = property.applicants.filter(app => app._id.toString() !== applicantId);

    await property.save();

    return res.status(200).json({ 
      message: 'Applicant rejected successfully' 
    });
  } catch (error) {
    console.error('Error rejecting applicant:', error);
    return res.status(500).json({ 
      message: 'Server error' 
    });
  }
};

exports.acceptViewingRequest = async (req, res) => {
  try {
    const { propertyId, requestId } = req.body;
 
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }
    
    const viewingRequest = property.viewingRequests.id(requestId);

    if (!viewingRequest) {
      return res.status(404).json({ 
        message: 'Viewing request not found' 
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.pretoriastudentaccommodation.co.za',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    const mailOptions = {
      from:  process.env.EMAIL_ADDRESS,
      to: viewingRequest.email,
      subject: 'Viewing Request Approved',
      text: `Dear ${viewingRequest.name},

Your request to view the property "${property.name}" on ${viewingRequest.date.toLocaleDateString()} has been approved. We look forward to seeing you on the scheduled date.

Best regards,
Property Management`,
    };

   
    await transporter.sendMail(mailOptions);

    // viewingRequest.status = 'approved'; 
    property.viewingRequests =  property.viewingRequests.filter(app => app._id.toString() !== requestId);
    await property.save();

    return res.status(200).json({ message: 'Viewing request accepted and email sent to requester.' });
  } catch (error) {
    console.error('Error accepting viewing request:', error);
    return res.status(500).json({ message: 'An error occurred while processing the request.' });
  }
};

exports.rejectViewingRequest = async (req, res) => {
  try {
    const { propertyId, requestId } = req.body;
 
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }
    
    const viewingRequest = property.viewingRequests.id(requestId);

    if (!viewingRequest) {
      return res.status(404).json({ 
        message: 'Viewing request not found' 
      });
    }

    const transporter = nodemailer.createTransport({
      host: 'mail.pretoriastudentaccommodation.co.za',
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL_ADDRESS, 
        pass: process.env.EMAIL_PASSWORD, 
      },
    });

    const mailOptions = {
      from:  process.env.EMAIL_ADDRESS,
      to: viewingRequest.email,
      subject: 'Viewing Request Rejected',
      text: `Dear ${viewingRequest.name},

Your request to view the property "${property.name}" on ${viewingRequest.date.toLocaleDateString()} has been rejected. Go look for accommodation somewhere else. Ha ha ha ha ha

Best regards,
Property Management`,
    };

   
    await transporter.sendMail(mailOptions);

    // viewingRequest.status = 'approved'; 
    property.viewingRequests =  property.viewingRequests.filter(app => app._id.toString() !== requestId);
    await property.save();

    return res.status(200).json({ 
      message: 'Viewing request accepted and email sent to requester.' 
    });
  } catch (error) {
    console.error('Error accepting viewing request:', error);
    return res.status(500).json({ 
      message: 'An error occurred while processing the request.' 
    });
  }
};

exports.updateTenantInfo  = async (req, res) => {
  const { propertyId, tenantId } = req.params;
  const { roomNumber, roomType } = req.body;

  try {
    
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }

    const tenant = property.tenants.id(tenantId);

    if (!tenant) {
      return res.status(404).json({ 
        message: 'Tenant not found' 
      });
    }

    tenant.roomNumber = roomNumber || tenant.roomNumber;
    tenant.roomType = roomType || tenant.roomType;


    await property.save();

    res.status(200).json({
      message: 'Tenant information updated successfully',
      tenant,
    });
  } catch (error) {
    console.error('Error updating tenant information:', error);
    res.status(500).json({ 
      message: 'Internal server error'
     });
  }
};
