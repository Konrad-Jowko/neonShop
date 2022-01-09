import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';
import AmountWidget from '../../features/AmountWidget/AmountWidget';

import styles from './Cart.module.scss';

/* CART COMPONENT */
export default class Cart extends React.Component {
  static propTypes = {
    cart: PropTypes.array,
    updateCart: PropTypes.func,
    updateLocalCart: PropTypes.func,
    getLocalCart: PropTypes.func,
    clearCart: PropTypes.func,
    startSummary: PropTypes.func,
  };

  async componentDidMount() {
    await this.props.getLocalCart();
    this.disableButtons();
    if (this.props.cart.length >= 1) this.setTotalPrice();
  }

  // Set total price based on summarized price of all products
  setTotalPrice() {

    const initialPriceDom = document.getElementById('totalPrice');
    let newInitialPrice = 0;
    const pricesDOM = document.querySelectorAll('[id*=priceTag]');

    for(let priceDOM of pricesDOM) {
      newInitialPrice += parseInt(priceDOM.innerHTML);
    }
    if (initialPriceDom) initialPriceDom.innerHTML = newInitialPrice + '$';
  }

  // disable buttons which should not be avaiable at given moment
  disableButtons() {
    const parents = document.querySelectorAll('[class*=buttonsContainer]');

    for (let parent of parents) {
      const children = parent.childNodes;

      for (let child of children) {
        if (child.getAttribute('tobedisabled') === 'true') {
          child.classList.add('disabled');
        } else if (child.getAttribute('tobedisabled') === 'false') {
          child.classList.remove('disabled');
        }
      }
    }
  }

  // Toggle which elements of the cart should be disabled at given moment
  toggleDisabled(event) {
    const siblings = event.target.parentNode.childNodes;
    for (let sibling of siblings) {
      if (sibling.getAttribute('tobedisabled') === 'true') {
        sibling.setAttribute('tobedisabled', 'false');
      } else if (sibling.getAttribute('tobedisabled') === 'false') {
        sibling.setAttribute('tobedisabled', 'true');
      }
    }
  }

  // Enable edit of product description
  enableEdit(event, disableButtons, toggleDisabled) {
    const descriptionChildren = event.target.parentNode.previousSibling.childNodes;

    for (let child of descriptionChildren) {
      if(child.type === 'textarea') {
        child.classList.add('active');
        child.defaultValue = child.value;
        child.removeAttribute('disabled');
      }
    }
    toggleDisabled(event);
    disableButtons();
  }

  // Delete product from cart
  async deleteItem(event, itemToDelete, cart, updateCart, setTotalPrice, updateLocalCart) {
    const filteredCart = cart.filter(item => item !== itemToDelete );
    await updateLocalCart(filteredCart);
    await updateCart(filteredCart);
    setTotalPrice();
  }

  // Save edited product description
  saveEdit(event, updateCart, updateLocalCart, cart, id, disableButtons, toggleDisabled) {
    let newCart = cart;
    const description = document.getElementById(`description-${id}`);

    description.classList.remove('active');
    description.setAttribute('disabled', true);
    for (let item of newCart) {
      if (item.id === id) {
        if (item.description !== description.value) {
          item.description = description.value;
        }
      }
    }

    updateLocalCart(newCart);
    updateCart(newCart);
    toggleDisabled(event);
    disableButtons();
  }

  // Set new price for a product after changing the amount of it
  revaluatePrice(id, singleItemPrice, cart, updateCart, updateLocalCart, setTotalPrice) {
    let newCart = cart;
    const amount = parseInt(document.getElementById(`widget-${id}`).innerHTML);
    const priceTagDOM =  document.getElementById(`priceTag-${id}`);

    const newPrice = singleItemPrice * amount;

    for (let item of newCart) {
      if (item.id === id) {
        if (item.price !== newPrice) {
          item.price = newPrice;
          item.amount = amount;
        }
      }
    }

    priceTagDOM.innerHTML = newPrice;
    updateLocalCart(newCart);
    updateCart(newCart);
    setTotalPrice();
  }

  // Start checkout process and proceed to Summary component
  checkout(startSummary) {
    const products = document.querySelectorAll('[class*=singleProductContainer]');
    const finalOrder = [];

    for(let productDOM of products) {
      const product = {};
      const id = productDOM.getAttribute('id');

      product.id = id;
      product.name = document.getElementById(`name-${id}`).innerHTML;
      product.colors = document.getElementById(`colors-${id}`).innerHTML;
      product.size = document.getElementById(`size-${id}`).innerHTML;
      product.description = document.getElementById(`description-${id}`).innerHTML;
      product.price = parseInt(document.getElementById(`priceTag-${id}`).innerHTML);
      product.amount = parseInt(document.getElementById(`widget-${id}`).innerHTML);

      finalOrder.push(product);
    }
    startSummary(finalOrder);
  }

  // Delete all cart data from both Redux store and local store
  nukeCart(cart, localcart) {
    const newCart = [];

    localcart(newCart);
    cart();
  }

  render() {
    this.disableButtons();
    if (this.props.cart.length >= 1) this.setTotalPrice();

    // Render when cart includes product
    if (this.props.cart.length >= 1) {
      return (
        <div className={styles.root}>
          <h2 className={styles.header}> Here is Your Cart! </h2>
          <div className={styles.container}>
            <div className={styles.productsContainer}>
              {this.props.cart.map(item => (
                <div className={styles.singleProductContainer} key={item.id} id={item.id}>
                  <h2 className={styles.singleProductHeader} id={`name-${item.id}`}> {item.name} </h2>
                  <div className={styles.singleProductSubcontainer}>
                    <div className={styles.singleProductInfo}>
                      <h4> Color picked</h4>
                      <h3 id={`colors-${item.id}`}>{item.colors} </h3>
                    </div>
                    <div className={styles.singleProductInfo}>
                      <h4> Size</h4>
                      <h3 id={`size-${item.id}`}>{item.size} </h3>
                    </div>
                    <div className={styles.singleProductInfo}>
                      <h4> Price</h4>
                      <h3> <span id={`priceTag-${item.id}`}>{item.singleItemPrice * item.amount}</span>$</h3>
                    </div>
                    <div className={styles.singleProductInfo}>
                      <h4> Amount</h4>
                      <div className={styles.widgetContainer} onClick={event => this.revaluatePrice(item.id, item.singleItemPrice,
                        this.props.cart, this.props.updateCart, this.props.updateLocalCart, this.setTotalPrice)}>
                        <AmountWidget number={item.amount} id={`widget-${item.id}`}/>
                      </div>
                    </div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <h3> Description</h3>
                    <textarea id={`description-${item.id}`} defaultValue={item.description} disabled></textarea>
                  </div>
                  <div className={styles.buttonsContainer} >
                    <div className={styles.button} tobedisabled='false' onClick={(event) => this.enableEdit(event, this.disableButtons, this.toggleDisabled)}>
                     Edit Description </div>
                    <div className={styles.button} tobedisabled='true' onClick={(event) => this.saveEdit(event, this.props.updateCart, this.props.updateLocalCart,
                      this.props.cart, item.id, this.disableButtons, this.toggleDisabled)}> Save Edit </div>
                    <div className={styles.buttonClear} onClick={(event) => this.deleteItem(event, item, this.props.cart, this.props.updateCart,
                      this.props.updateLocalCart, this.setTotalPrice)}>
                     Delete
                    </div>
                  </div>
                </div>
              ))}
            </div>
            < h3 className={styles.totalPriceText}> Total Initial Price:  <span id={'totalPrice'}>0$</span> </h3>
            <div className={styles.buttonsContainer}>
              <NavLink className={styles.navlink} to='/summary'>
                <div className={styles.button} onClick={(event) => this.checkout(this.props.startSummary)}> Start Order </div>
              </NavLink>
              {this.props.cart.length > 1 ? <div className={styles.buttonClear} onClick={() => this.nukeCart(this.props.clearCart, this.props.updateLocalCart)}> Clear Cart </div> : null }
            </div>
            <p> The price You see above is the initial price for the chosen products. Remember, that it is approximate and can change depending on the complexity of the ordered design!</p>
            <p> After sending  the initial order, please wait for email from us, with details regarding the final price and means of payment! </p>
          </div>
        </div>
      );
    } else {
      // Render when cart is empty
      return (
        <div className={styles.root}>
          <h2 className={styles.header}> Your Cart is empty! </h2>
          <div className={styles.container}>
            <h3 className={styles.info}> Please, pick something and then come back here!  </h3>
            <div className={styles.buttonsContainer}>
              <NavLink className={styles.button} to='/products'> Products </NavLink>
            </div>
          </div>
        </div>
      );
    }
  }
}
