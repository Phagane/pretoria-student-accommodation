const Property = require('./../models/propertyModel')
const User = require('./../models/userModel')

exports.getProperties = async (req, res) => {
  try {
    
    const baseURL = 'http://127.0.0.1:8000'; 

    const properties = await Property.find().select('name price location furnished genderAllowed occupancyType images').lean();

    const propertiesWithSingleImage = properties.map((property) => ({
      ...property,
      image: property.images && property.images.length > 0 ? `${baseURL}${property.images[0]}` : null, // Add full URL for the first image
    }));

    res.status(200).json({
      properties: propertiesWithSingleImage,
    });
  } catch (err) {
    res.status(500).json({
      message: 'Error fetching properties',
      error: err.message,
    });
  }
};

exports.getPropertyDetails = async (req, res) => {
  try {
    const { propertyId } = req.params;

    const baseURL = 'http://127.0.0.1:8000';

    const property = await Property.findById(propertyId).lean();

    if (!property) {
      return res.status(404).json({
        message: 'Property not found',
      });
    }

    const propertyWithFullImageURLs = {
      ...property,
      images: property.images.map(image => `${baseURL}${image}`),
    };
console.log(propertyWithFullImageURLs)
    res.status(200).json(propertyWithFullImageURLs);
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({
      message: 'Server error',
    });
  }
};


  exports.applyForAccommodation = async (req, res) => {
    try {
      const { propertyId } = req.params; 
      const { fundingType, roomType } = req.body;
      const userId = req.user._id;  
  
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ 
          message: 'Property not found' 
        });
      }
  
      const existingApplication = property.applicants.find(applicant => 
        applicant.user.toString() === userId.toString()
      );
  
      if (existingApplication) {
        return res.status(400).json({ 
          message: 'You have already applied for this property' 
        });
      }
  
      property.applicants.push({
        user: userId,
        fundingType,
        roomType
      });
  
      await property.save();
  
      res.status(200).json({ 
        message: 'Application submitted successfully' 
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };
  

  exports.requestToView = async (req, res) => {
    try {
      const { propertyId } = req.params; 
      const { name, email, phoneNum, date} = req.body;
  
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ 
          message: 'Property not found' 
        });
      }
  
      property.viewingRequests.push({
        name,
        email,
        phoneNum,
        date,
      });
  
      await property.save();
  
      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ 
        message: 'Server error' 
      });
    }
  };

exports.getUserInfoWithTenantDetails = async (req, res) => {
  const userId = req.user._id; 

  try {

    const user = await User.findById(userId).select('name email phoneNumber');
    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    const property = await Property.findOne({ 'tenants.user': userId })
      .select('name location price furnished tenants')
      .populate({
        path: 'tenants.user', 
        select: 'name email phoneNumber', 
      });

    if (!property) {
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        tenantDetails: null, 
      });
    }

    const tenant = property.tenants.find((tenant) => tenant.user._id.toString() === userId.toString());

    if (!tenant) {
      return res.status(404).json({ 
        message: 'Tenant details not found for this user' 
      });
    }

    res.status(200).json({
      user: {
        name: user.name,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      tenantDetails: {
        propertyName: property.name,
        location: property.location,
        price: property.price,
        furnished: property.furnished ? 'Yes' : 'No',
        roomNumber: tenant.roomNumber,
        roomType: tenant.roomType,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ 
      message: 'Server error' 
    });
  }
};

exports.updateUserDetails = async (req, res) => {
  const  userId  = req.user._id; 
  const { name, email, phoneNumber } = req.body;
 
  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ 
        message: 'User not found' 
      });
    }

    user.name = name || user.name;
    user.email = email || user.email;
    user.phoneNumber = phoneNumber || user.phoneNumber;

    await user.save();

    res.status(200).json({ 
      message: 'User details updated successfully', 
      user 
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.searchProperties = async (req, res) => {
  try {
    // Log the incoming query parameters
    console.log('Query Params:', req.query);

    const { minPrice, maxPrice, gender, location, furnished } = req.query;

    // Initialize an empty query object
    let query = {};

    // Apply the filters only if the corresponding parameters are present
    if (minPrice) {
      query.price = { ...query.price, $gte: Number(minPrice) }; // Minimum price filter
    }

    if (maxPrice) {
      query.price = { ...query.price, $lte: Number(maxPrice) }; // Maximum price filter
    }

    if (gender) {
      query.gender = gender; // Gender filter
    }

    if (location) {
      query.location = { $regex: new RegExp(location, 'i') }; // Case-insensitive location filter
    }

    if (furnished === 'true') {
      query.furnished = true; // Furnished filter if 'true'
    }

    // Log the constructed query to ensure it's correct
    console.log('Constructed Query:', query);

    // Perform the database query with the constructed filters
    const properties = await Property.find(query);

    // Log the filtered properties to verify the results
    console.log('Filtered Properties:', properties);

    // Return the filtered properties
    res.status(200).json({
      success: true,
      properties,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Server error',
    });
  }
};
