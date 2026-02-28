const { readData, writeData } = require('../utils/db');
const mongoose = require('mongoose');

// Default initial services
const DEFAULT_SERVICES = [
  { _id: '1', name: 'Protez Tırnak Tasarımı', description: 'Özel tasarım protez tırnaklar', price: 150, duration: 45, isActive: true },
  { _id: '2', name: 'Tırnak Tamir', description: 'Hasarlı tırnak tamiri', price: 50, duration: 30, isActive: true },
  { _id: '3', name: 'Tırnak Bakımı', description: 'Profesyonel tırnak bakımı', price: 75, duration: 60, isActive: true }
];

// Initialize local file if empty
if (readData('services').length === 0) {
  writeData('services', DEFAULT_SERVICES);
}

exports.getAllServices = async (req, res) => {
  const services = readData('services');
  res.json(services.filter(s => s.isActive));
};

exports.getServiceById = async (req, res) => {
  const services = readData('services');
  const service = services.find(s => s._id === req.params.id);
  if (!service) return res.status(404).json({ message: 'Service not found' });
  res.json(service);
};

exports.createService = async (req, res) => {
  const { name, description, price, duration } = req.body;
  const services = readData('services');
  const newService = {
    _id: Date.now().toString(),
    name,
    description: description || '',
    price: parseInt(price),
    duration: parseInt(duration),
    isActive: true
  };
  services.push(newService);
  writeData('services', services);
  res.status(201).json({ message: 'Service created successfully', service: newService });
};

exports.updateService = async (req, res) => {
  const { name, description, price, duration, isActive } = req.body;
  const services = readData('services');
  const index = services.findIndex(s => s._id === req.params.id);

  if (index === -1) return res.status(404).json({ message: 'Service not found' });

  services[index] = {
    ...services[index],
    name: name || services[index].name,
    description: description !== undefined ? description : services[index].description,
    price: price !== undefined ? parseInt(price) : services[index].price,
    duration: duration !== undefined ? parseInt(duration) : services[index].duration,
    isActive: isActive !== undefined ? isActive : services[index].isActive
  };

  writeData('services', services);
  res.json({ message: 'Service updated successfully', service: services[index] });
};

exports.deleteService = async (req, res) => {
  let services = readData('services');
  const exists = services.some(s => s._id === req.params.id);
  if (!exists) return res.status(404).json({ message: 'Service not found' });

  services = services.filter(s => s._id !== req.params.id);
  writeData('services', services);
  res.json({ message: 'Service deleted successfully' });
};
