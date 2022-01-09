const express = require('express');
const router = express.Router();
const OrdersController = require('../controllers/orders.controller');

router.get('/orders', OrdersController.get);

router.post('/orders', OrdersController.post);

module.exports = router;
