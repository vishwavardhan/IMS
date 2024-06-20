// server/routes/serviceRoutes.js
const express = require('express');
const router = express.Router();
const Service = require('../models/Service');

// Get all services
router.get('/', async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new service
router.post('/add', async (req, res) => {
  const { id, type, quantity, price, trackingId, attachment } = req.body;
  
  // Check if a service with the same ID already exists
  try {
    const existingService = await Service.findOne({ id });
    if (existingService) {
      return res.status(400).json({ status: false, message: 'Service with this ID already exists' });
    }
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }

  const service = new Service({
    id,
    type,
    quantity,
    price,
    trackingId,
    attachment: attachment || 'None'
  });

  try {
    const newService = await service.save();
    res.status(201).json({ status: true, message: 'Service added successfully', service: newService });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a service
router.put('/update/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    service.type = req.body.type || service.type;
    service.quantity = req.body.quantity || service.quantity;
    service.price = req.body.price || service.price;
    service.trackingId = req.body.trackingId || service.trackingId;
    service.attachment = req.body.attachment || service.attachment;

    const updatedService = await service.save();
    res.json(updatedService);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a service
router.delete('/delete/:id', async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) return res.status(404).json({ message: 'Service not found' });

    await service.remove();
    res.json({ message: 'Service deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
