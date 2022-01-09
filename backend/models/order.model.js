const mongoose = require('mongoose');

const orderSchema = new mongoose.Schema({
  contact: {
    name: { type: String, required: true },
    surname: { type: String, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true },
    street: { type: String, required: true },
    building: { type: String, required: true },
    city: { type: String, required: true },
    zipcode: { type: String, required: true },
  },

  items: [new mongoose.Schema({
    id: { type: String, required: true },
    name: { type: String, required: true },
    colors: { type: String, required: true },
    size: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    amount: { type: Number, required: true },
  }, {_id: false})],
});


module.exports = mongoose.model('Order', orderSchema);
