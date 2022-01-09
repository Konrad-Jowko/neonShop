const Product = require('../models/product.model');

/* GET ALL PRODUCTS */
exports.getAll = async (req, res) => {
  try {
    const products = [];
    const results = await Product.find();

    for (let result of results) {
      const item = {};
      item.id = result._id;
      item.name = result.name;
      item.startingPrice = result.startingPrice;
      item.description = result.description;
      item.images = result.images;
      item.items = [];

      for (let product of result.items) {
        const details = {};

        details.productId = product.productId;
        details.name = product.name;
        details.shortDescription = product.shortDescription;
        details.color = product.color || 'none';
        details.image = product.images[Math.floor(Math.random() * product.images.length)];

        item.items.push(details);
      }
      products.push(item);
    }

    if(!results) res.status(404).json({ post: 'Not found' });
    else res.json(products);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

/* GET SINGLE PRODUCT */
exports.get = async (req, res) => {
  const categoryId = req.params.categoryId, productId = parseInt(req.params.productId);

  try {
    const result = await Product.findOne({_id: categoryId});
    const filteredItem = result.items.filter(item =>  item.productId  === productId)[0];

    if (result.longName) {
      filteredItem.name = filteredItem.name + ' ' + result.name;
    }

    if(!result) res.status(404).json({ post: 'Not found' });
    else res.json(filteredItem);
  }
  catch(err) {
    res.status(500).json(err);
  }
};
