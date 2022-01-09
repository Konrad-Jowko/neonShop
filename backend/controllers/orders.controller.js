const Order = require('../models/order.model');
const Product = require('../models/product.model');

/* GET ALL ORDERS */
exports.get = async (req, res) => {
  try{
    const results = await Order.find();

    if(!results) res.status(404).json({ post: 'Not found' });
    else res.json(results);
  }
  catch(err) {
    res.status(500).json(err);
  }
};

/* POST NEW ORDER */
exports.post = async (req, res) => {
  const {contact, items} = req.body,
    order = {
      contact: {},
      items: [],
    };

  /* AUXILIARY VARIABLES AND FUNCTIONS FOR INPUT VERIFICATION */
  const products = await Product.find();
  const forbidden = [ '&amp;', '&lt;', '&gt;', '&quot;', '&#039;'];

  function escape(html) {
    if(typeof html === 'string') {
      return html.replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#039;');
    }
  }

  function testForNumber(string) {
    let isNum = /^\d+$/.test(string);

    return isNum;
  }

  /*  MAIN FUNCTIONS FOR INPUT VERIFICATION */

  // Plain text strings verification
  function verifyText(text) {
    const escapedText = escape(text);

    for (let item of forbidden) {
      if(escapedText.includes(item)) {
        throw new Error('Forbidden text input!');
      }
    }
    return escapedText;
  }

  // Contact phone number verification
  function verifyPhone(phoneNumber) {
    const numberTest = testForNumber(phoneNumber);

    if(numberTest === true && phoneNumber.length >= 9 && phoneNumber.length <=10) {
      return phoneNumber;
    } else {
      throw new Error('Forbidden number input!');
    }
  }

  // Contact zipcode verification
  function verifyZipcode(zipcode) {
    const numberTest = testForNumber(zipcode);

    if(numberTest === true && zipcode.length >= 4 && zipcode.length <=5) {
      return zipcode;
    } else {
      throw new Error('Forbidden number input!');
    }
  }

  // Contact email verification
  function verifyEmail(email) {
    const regex = new RegExp(/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/);
    const escapedEmail = escape(email);

    for (let item of forbidden) {
      if(escapedEmail.includes(item)) {
        throw new Error('Forbidden email input!');
      }
    }

    if(regex.test(escapedEmail)) {
      return email;
    } else {
      throw new Error('Wrong email input!');
    }
  }

  // Product name validation and existence verification
  function verifyProductName(productName) {
    const escapedName = verifyText(productName);

    for (let product of products) {
      for (let item of product.items){
        let name = item.name;

        if(name === 'Modern' || name === 'Rustic' || name === 'Retro') {
          name = name + ' ' + product.name;
        }

        if(escapedName.includes(name)) {
          return name;
        }
      }
    }

    throw new Error('Wrong product input!');
  }

  // Product color validation
  function verifyProductColors(productColor) {
    const escapedColor = verifyText(productColor);

    for (let product of products) {
      for (let item of product.items){
        const singleContent = item.color,
          multiContent = item.colors;

        if (singleContent) {
          if (escapedColor.includes(singleContent)) {
            return singleContent;
          }
        } else {
          for (let item of multiContent) {
            if (escapedColor.includes(item)) {
              return item;
            }
          }
        }
      }
    }
    throw new Error('Wrong product input!');
  }

  // Product size validation
  function verifyProductSize(productSize) {
    const escapedSize = verifyText(productSize);

    for (let product of products) {
      for (let item of product.items){
        for (let element of item.size){
          if (escapedSize.includes(element.size)) {
            return escapedSize;
          }
        }
      }
    }
  }

  // Product amount validation
  function verifyProductAmount(amount) {
    const numberTest = testForNumber(amount);

    if(numberTest === true && amount >= 1 && amount <=10) {
      return amount;
    } else {
      throw new Error('Forbidden amount input!');
    }
  }

  // Product price validation
  function verifyProductPrice(productPrice, productAmount, productSize, productName) {
    const truePrice = productPrice / productAmount;

    for (let product of products) {
      for (let item of product.items){
        let name = item.name;

        if(name === 'Modern' || name === 'Rustic' || name === 'Retro') {
          name = name + ' ' + product.name;
        }

        if(productName.includes(name)) {
          for (let size of item.size) {
            if (productSize.includes(size.size)) {
              if (size.price === truePrice) {
                return productPrice;
              }
            }
          }
        }
      }
    }
    throw new Error('Forbidden price input!');
  }

  try {

    // Validating contact info
    order.contact.name = verifyText(contact.name);
    order.contact.surname = verifyText(contact.surname);
    order.contact.phone = verifyPhone(contact.phone);
    order.contact.email = verifyEmail(contact.email);
    order.contact.street = verifyText(contact.street);
    order.contact.building = verifyText(contact.building);
    order.contact.city = verifyText(contact.city);
    order.contact.zipcode = verifyZipcode(contact.zipcode);

    // Validating order info
    for (let item of items) {
      const orderItem = {};

      orderItem.id = verifyText(item.id);
      orderItem.name = verifyProductName(item.name);
      orderItem.colors = verifyProductColors(item.colors);
      orderItem.size = verifyProductSize(item.size);
      orderItem.description = verifyText(item.description);
      orderItem.amount = verifyProductAmount(item.amount);
      orderItem.price = verifyProductPrice(item.price, item.amount, item.size, item.name);

      order.items.push(orderItem);
    }

    const newOrder = new Order(order);
    await newOrder.save();
    res.json(order);
  }
  catch(err) {
    res.status(500).json({error: err.message});
  }
};
