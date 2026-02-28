const Service = require('../models/Service');

// In-memory demo services storage (demo mode)
let demoServices = [
  {
    _id: '1',
    name: 'Protez Tırnak Tasarımı',
    description: 'Özel tasarım protez tırnaklar',
    price: 150,
    duration: 45,
    isActive: true,
  },
  {
    _id: '2',
    name: 'Tırnak Tamir',
    description: 'Hasarlı tırnak tamiri',
    price: 50,
    duration: 30,
    isActive: true,
  },
  {
    _id: '3',
    name: 'Tırnak Bakımı',
    description: 'Profesyonel tırnak bakımı',
    price: 75,
    duration: 60,
    isActive: true,
  },
  {
    _id: '4',
    name: 'Hızlı Uygulaması',
    description: 'Hızlı protez tırnak uygulaması',
    price: 100,
    duration: 30,
    isActive: true,
  },
];

let isMongoDBConnected = true;
exports.getAllServices = async (req, res) => {
  try {
    const services = await Service.find({ isActive: true }).maxTimeMS(5000);
    res.json(services);
    isMongoDBConnected = true;
  } catch (error) {
    console.warn('MongoDB offline - returning demo services');
    isMongoDBConnected = false;
    return res.json(demoServices.filter(s => s.isActive));
  }
};

// Get service by ID
exports.getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id).maxTimeMS(5000);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    console.error('Service fetch error:', error.message);
    if (error.message.includes('buffering timed out') || error.message.includes('connect ECONNREFUSED')) {
      return res.status(404).json({ message: 'Service not found (database offline)' });
    }
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

// Create service (admin only)
exports.createService = async (req, res) => {
  try {
    const { name, description, price, duration } = req.body;

    if (!name || !price || !duration) {
      return res.status(400).json({ message: 'Name, price, and duration are required' });
    }

    try {
      const service = new Service({
        name,
        description: description || '',
        price,
        duration
      });
      await service.save();
      return res.status(201).json({ message: 'Service created successfully', service });
    } catch (err) {
      // MongoDB offline - add to demo services in memory
      if (err.message.includes('buffering timed out') ||
        err.message.includes('connect ECONNREFUSED') ||
        err.message.includes('Service validation failed')) {
        const demoService = {
          _id: Date.now().toString(),
          name,
          description: description || '',
          price: parseInt(price),
          duration: parseInt(duration),
          isActive: true,
        };
        // Bellekte tutulan demo services'e ekle
        demoServices.push(demoService);
        return res.status(201).json({ message: 'Service created (demo mode)', service: demoService });
      }
      throw err;
    }
  } catch (error) {
    console.error('Service creation error:', error.message);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

// Update service (admin only)
exports.updateService = async (req, res) => {
  try {
    const { name, description, price, duration, isActive } = req.body;

    try {
      const service = await Service.findByIdAndUpdate(
        req.params.id,
        { name, description, price, duration, isActive },
        { new: true }
      ).maxTimeMS(5000);

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      return res.json({ message: 'Service updated successfully', service });
    } catch (err) {
      // MongoDB offline or ObjectId cast error - update in demo services
      if (err.message.includes('buffering timed out') ||
        err.message.includes('connect ECONNREFUSED') ||
        err.message.includes('Cast to ObjectId failed')) {
        // Bellekteki services'de güncelle
        const index = demoServices.findIndex(s => s._id === req.params.id);
        if (index !== -1) {
          demoServices[index] = {
            _id: req.params.id,
            name: name || demoServices[index].name,
            description: description !== undefined ? description : demoServices[index].description,
            price: price !== undefined ? parseInt(price) : demoServices[index].price,
            duration: duration !== undefined ? parseInt(duration) : demoServices[index].duration,
            isActive: isActive !== undefined ? isActive : demoServices[index].isActive,
          };
        }
        const demoService = {
          _id: req.params.id,
          name: name || 'Updated Service',
          description: description || '',
          price: parseInt(price) || 0,
          duration: parseInt(duration) || 30,
          isActive: isActive !== undefined ? isActive : true,
        };
        return res.json({ message: 'Service updated (demo mode)', service: demoService });
      }
      throw err;
    }
  } catch (error) {
    console.error('Service update error:', error.message);
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

// Delete service (admin only)
exports.deleteService = async (req, res) => {
  try {
    try {
      const service = await Service.findByIdAndDelete(req.params.id).maxTimeMS(5000);

      if (!service) {
        return res.status(404).json({ message: 'Service not found' });
      }

      return res.json({ message: 'Service deleted successfully' });
    } catch (err) {
      // MongoDB offline - delete from demo services in memory
      if (err.message.includes('buffering timed out') ||
        err.message.includes('connect ECONNREFUSED') ||
        err.message.includes('Cast to ObjectId failed')) {
        // Bellekteki services'den sil
        const index = demoServices.findIndex(s => s._id === req.params.id);
        if (index !== -1) {
          demoServices.splice(index, 1);
        }
        return res.json({ message: 'Service deleted (demo mode)' });
      }
      throw err;
    }
  } catch (error) {
    console.error('Service delete error:', error.message);
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};
