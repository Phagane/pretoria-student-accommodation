const mongoose = require('mongoose');
const Property = require('../models/propertyModel');
const User = require('../models/userModel')
exports.addProperty = async (req, res) => {
  const {
    name,
    description,
    price,
    location,
    furnished,
    genderAllowed,
    occupancyType,
    image,
  } = req.body;

  try {
    const property = new Property({
      name,
      description,
      price,
      location,
      furnished,
      genderAllowed,
      occupancyType,
      image,
      agent:{
        email:req.user.email
      } , 
    });

    await property.save();
    res.status(201).json({ 
        success: true, 
        message: 'Property added successfully', 
        property 
    });
  } catch (error) {
    res.status(500).json({ 
        success: false, 
        message: 'Error adding property', 
        error: error.message });
  }
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
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ 
          message: 'Property not found' 
        });
      }
  
      res.status(200).json({ property });
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

exports.addTenant = async (req, res) => {
  const { propertyId } = req.params; 
  const { name, email, phone, roomNumber, roomType } = req.body; 

  try {
    
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ 
        message: 'Property not found' 
      });
    }

    const newTenant = {
      name,
      email,
      phone,
      roomNumber,
      roomType,
    };

    property.tenants.push(newTenant);

    await property.save();

    res.status(201).json({
      message: 'Tenant added successfully',
      tenant: newTenant,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error' 
    });
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

// Controller to add a tenant to a property
exports.addTenantToProperty = async (req, res) => {
  const {propertyId} = req.params
  const { email, roomNumber, roomType } = req.body;
  console.log( email, roomNumber, roomType, propertyId)

  try {
    // Find the user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Find the property by its ID
    const property = await Property.findById(propertyId);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    // Check if the tenant already exists in the property
    const existingTenant = property.tenants.find((tenant) => tenant.user.toString() === user._id.toString());

    if (existingTenant) {
      return res.status(400).json({ message: 'Tenant already exists in this property' });
    }

    // Create a new tenant object
    const newTenant = {
      user: user._id,   // Reference to the user ObjectId
      roomNumber,
      roomType,         // Default is 'sharing' if not provided
    };

    // Add the new tenant to the property's tenants array
    property.tenants.push(newTenant);

    // Save the updated property document
    await property.save();

    res.status(201).json({ message: 'Tenant added successfully', property });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};
