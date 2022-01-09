import React from 'react';
import PropTypes from 'prop-types';
import { useParams, useNavigate, Navigate} from 'react-router-dom';
import { nanoid } from 'nanoid';
import PhotoCarousel from '../../features/Carousel/Carousel';
import Select from '../../features/Select/Select';
import AmountWidget from '../../features/AmountWidget/AmountWidget';
import Alert from '../../features/Alert/Alert';

import styles from './Product.module.scss';

/* COMPONENT DISPLAYING SINGLE PRODUCT*/
const Product = ({singleProduct, addToCart, getSingleProduct, updateLocalCart, enableAlert, disableAlert}) => {
  const navigate = useNavigate();
  const { categoryId, productId } = useParams();

  // Download product data if it is not already in global store
  if(singleProduct.productId !== parseInt(productId)) {
    getSingleProduct(categoryId, productId);
  }

  // Set price of the product on base of chosen size variant
  const changePrice = () => {
    const priceTag = document.getElementById('price');
    const price = document.getElementById('size-pickedValue').getAttribute('price');

    if (price !== undefined) {priceTag.innerHTML = price;}
    else {priceTag.innerHTML = '0';}

    multiply();
  };

  // Multiply the products price on the base of chosen amount
  const multiply = () => {
    const priceTag = document.getElementById('price');
    const amount = document.querySelector('[queryselector*=amount]');
    let number = parseInt(amount.innerHTML);
    const price =  parseInt(document.getElementById('size-pickedValue').getAttribute('price'));
    const newPrice = price * number;

    if (!isNaN(newPrice)) priceTag.innerHTML = newPrice;
  };

  // Base validation of chosen product and description before adding it to cart
  const checkOrder = async (name, addToCart, navigate, nanoid) => {
    const selects = document.querySelectorAll('[id*=pickedValue]');
    const description = document.querySelector('textarea');
    const priceTag = document.getElementById('price');
    const price = document.getElementById('size-pickedValue').getAttribute('price');
    const amount = document.querySelector('[queryselector*=amount]');
    const parsedPriceTag = parseInt(priceTag.innerHTML);
    const parsedAmount =  parseInt(amount.innerHTML);
    const parsedPrice = parseInt(price);
    const calculatedPrice = parsedPriceTag / parsedAmount;

    // Selects validation
    for (let select of selects) {
      if (select.innerHTML === 'Make Your Choice') {
        select.parentNode.classList.add('danger');
      } else {
        select.parentNode.classList.remove('danger');
      }
    }

    // Description validation
    if (description.value.length < 10 || description === null) {
      description.classList.add('danger');
    }  else {
      description.classList.remove('danger');
    }

    // Price validation
    if (parsedPriceTag <= 0 || calculatedPrice !== parsedPrice) {
      priceTag.classList.add('danger');
    } else {
      priceTag.classList.remove('danger');
    }

    // Product amount validation
    if (parsedAmount <= 0 || parsedAmount >= 11) {
      amount.classList.add('danger');
    } else {
      amount.classList.remove('danger');
    }

    // If violations found, set Alert. If not, add product to Cart
    const dangers = document.querySelectorAll('.danger');

    if (dangers.length === 0) {
      const order = {};
      order.name = name;

      if (selects.length <= 1) {
        const color = document.querySelector('span[class*="singleColorHighlight"]').innerHTML;

        order.colors = color;
      }

      for (let select of selects) {
        const split = select.id.split('-')[0];
        if(split === 'color') {
          order[split] = select.innerHTML.toUppercase();
        } else {
          order[split] = select.innerHTML;
        }
      }

      order.description = description.value;
      order.amount = parsedAmount;
      order.singleItemPrice = calculatedPrice;
      order.id = nanoid(10);

      await addToCart(order);
      await updateLocalCart();
      navigate('/cart/updated');
    } else {
      enableAlert();
    }
  };

  // If component is being acessed before a product is picked, navigate to Not Found
  if(!singleProduct) {
    return (
      <Navigate from='*' to='/404' />
    );
  } else {
    // Render component
    return (
      <div className={styles.root} >
        <h2 className={styles.header}> {singleProduct.name} </h2>
        <p className={styles.shortDescription}> {singleProduct.shortDescription} </p>

        <div className={styles.detailsContainer}>

          <div className={styles.carouselContainer}>
            <div className={styles.carousel}>
              <PhotoCarousel  images={singleProduct.images} />
            </div>
          </div>

          <div className={styles.options}>
            {singleProduct.color ?
              <div className={styles.selectContainer}>
                <p className={styles.singleColor}>
               This product is available in limited colors: <br />
                  <span className={styles.singleColorHighlight}>
                    {singleProduct.color}
                  </span>
                </p>
              </div> : null}

            {singleProduct.colors && singleProduct.colors.length !== 0 ?
              <div className={styles.selectContainer}>
                <p> Choose the desired color! </p>
                <Select options={singleProduct.colors} id='colors' />
              </div> : null}

            {singleProduct.size ?
              <div className={styles.selectContainer} onClick={changePrice}>
                <p> Choose the desired size! </p>
                <Select options={singleProduct.size} id='size' />
              </div> : null}
          </div>

          <div className={styles.customerDescription}>
            <h3> Please, describe the design You want! Spare no detail! </h3>
            <textarea />
          </div>

          <div className={styles.pricing}>
            <p className={styles.initialPrice}> Initial Price: <span id='price'> 0 </span><span>$</span> </p>
            <div className={styles.order} onClick={multiply}>
              <div className={styles.widgetContainer}>
                <AmountWidget />
              </div>
              <div className={styles.orderButton} onClick={() => checkOrder(singleProduct.name, addToCart, navigate, nanoid, updateLocalCart)}>
                <h3>Add to cart</h3>
              </div>
            </div>
            <p> The price You see above is the initial price for this product. Said price is approximate and can change depending on the complexity of the ordered design!</p>
            <p> After sending  the initial order, please wait for email from us, with details regarding the final price and means of payment! </p>

          </div>
        </div>
        {singleProduct.alert ? <Alert alertText='Not all required information was given! Please fill the information that are highlighted red!' clickFunction={disableAlert} /> : null}
      </div>
    );
  }
};

Product.propTypes = {
  singleProduct: PropTypes.object,
  addToCart: PropTypes.func,
  getSingleProduct: PropTypes.func,
  enableAlert: PropTypes.func,
};

export default Product;
