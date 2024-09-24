const Property = require('./../models/propertyModel')

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