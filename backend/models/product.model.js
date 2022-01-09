const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  longName: { type: Boolean, required: true },
  startingPrice: { type: Number, required: true },
  name: { type: String, required: true },
  description: { type: String, required: true },
  items: [new mongoose.Schema({
    productId: { type: Number, required: true },
    name: { type: String, required: true },
    shortDescription: { type: String, required: true },
    color: { type: String },
    colors: [{type: String}],
    images: [{type: String}],
    size: [new mongoose.Schema({
      size: { type: String, required: true },
      price: { type: Number, required: true },
    }, {_id: false})],
  }, {_id: false})],
  images: [{type: String}],
});


module.exports = mongoose.model('Product', productSchema);
