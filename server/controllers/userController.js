const Property = require('./../models/propertyModel')
const User = require('./../models/userModel')

exports.getProperties = async (req, res) =>{

    try {
        const properties = await Property.find();
        res.status(200).json({
             properties 
            });
      } catch (err) {
        res.status(500).json({ 
            message: 'Error fetching properties' 
        });
      }
}

exports.getPropertyDetails = async (req, res) => {
    try {
      const { propertyId } = req.params; 
      console.log(propertyId)
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      res.status(200).json(property);
    } catch (error) {
      console.error('Error fetching property:', error);
      res.status(500).json({ message: 'Server error' });
    }
  };

  exports.applyForAccommodation = async (req, res) => {
    try {
      const { propertyId } = req.params; 
      const { fundingType, roomType } = req.body;
      const userId = req.user._id;  
  
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
      }
  
      const existingApplication = property.applicants.find(applicant => 
        applicant.user.toString() === userId.toString()
      );
  
      if (existingApplication) {
        return res.status(400).json({ message: 'You have already applied for this property' });
      }
  
      property.applicants.push({
        user: userId,
        fundingType,
        roomType
      });
  
      await property.save();
  
      res.status(200).json({ message: 'Application submitted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
  

  exports.requestToView = async (req, res) => {
    try {
      const { propertyId } = req.params; 
      const { name, email, phoneNum, date} = req.body;
  
      const property = await Property.findById(propertyId);
  
      if (!property) {
        return res.status(404).json({ message: 'Property not found' });
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
      res.status(500).json({ message: 'Server error' });
    }
  };

exports.getUserInfoWithTenantDetails = async (req, res) => {
  const userId = req.user._id; // Assuming you get the user's ID from a decoded token or session

  try {
    // Step 1: Fetch user information
    const user = await User.findById(userId).select('name email phoneNumber');
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Step 2: Find if the user is a tenant in any property
    const property = await Property.findOne({ 'tenants.user': userId })
      .select('name location price furnished tenants')
      .populate({
        path: 'tenants.user', // Populate tenant's user info
        select: 'name email phoneNumber', // Only select required fields
      });

    if (!property) {
      // If the user is not a tenant in any property, just return user details
      return res.status(200).json({
        user: {
          name: user.name,
          email: user.email,
          phoneNumber: user.phoneNumber,
        },
        tenantDetails: null, // User is not a tenant
      });
    }

    // Step 3: Extract the tenant details from the property
    const tenant = property.tenants.find((tenant) => tenant.user._id.toString() === userId.toString());

    if (!tenant) {
      return res.status(404).json({ message: 'Tenant details not found for this user' });
    }

    // Step 4: Return the user and tenant details
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
    res.status(500).json({ message: 'Server error' });
  }
};
