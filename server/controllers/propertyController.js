const Property = require('./../models/propertyModel');

// Controller function to add a new property
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
      const landlordEmail = req.user.email; // Assuming the middleware attaches the landlord's email to req.user
      console.log("Landlord email: ", landlordEmail)
      // Find all properties where the agent/landlord's email matches
      const properties = await Property.find({ 'agent.email': landlordEmail });
  
      if (!properties) {
        return res.status(404).json({ message: 'No properties found for this landlord' });
      }
  
      res.status(200).json({ properties });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server error' });
    }
  };
