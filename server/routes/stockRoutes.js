// server/routes/stockRoutes.js
const express = require('express');
const router = express.Router();
const Stock = require('../models/Stock');

// Get all stock items
router.get('/', async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Add a new stock item
router.post('/add', async (req, res) => {
  const { id, type, quantity, price } = req.body;

  const stock = new Stock({
    id,
    type,
    quantity,
    price
  });

  try {
    const newStock = await stock.save();
    res.status(201).json(newStock);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a stock item
router.delete('/delete/:id', async (req, res) => {
  try {
    const stock = await Stock.findOne({ id: req.params.id });
    if (!stock) {
      return res.status(404).json({ message: 'Stock item not found' });
    }

    await stock.remove();
    res.json({ message: 'Stock item deleted' });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
