import React from 'react';
import PropTypes from 'prop-types';
import { Navigate, NavLink } from 'react-router-dom';
import Alert from '../../features/Alert/Alert';

import styles from './Summary.module.scss';

/* SUMMARY OF THE PRODUCTS ORDERED AND ORDER FINALIZATION */
export default class Summary extends React.Component {
  static propTypes = {
    summary: PropTypes.object,
    postOrder: PropTypes.func,
    enableAlert: PropTypes.func,
    disableAlert: PropTypes.func,
  };


  componentDidMount() {
    this.setPrice(this.props.summary.items);
  }

  // Set summarized price for all products
  setPrice(items) {
    const priceTagDOM = document.getElementById('totalPrice');

    if (priceTagDOM) {
      let price = 0;

      for (let item of items) {
        price += item.price;
      }

      priceTagDOM.innerHTML = price + '$';
    }

  }

  // Basic validation of the finished order before sending it to the server
  async verifyOrder(event, items, postOrder){
    const inputsDOM = document.querySelectorAll('input'),
      adressInfo = {};

    for(let inputDOM of inputsDOM) {
      const value = inputDOM.value,
        dom = inputDOM,
        id = inputDOM.getAttribute('id').split('-')[1];

      if(!value) {
        dom.classList.add('warning');
      }
      else if ((id === 'zipcode' || id === 'phone') && (isNaN(parseInt(value)) || (id === 'phone' && value.length < 9))) {
        dom.classList.add('warning');
        dom.value = '';
      }
      else if ((id === 'email' && !value.includes('@')) || (id === 'email' && !value.includes('.'))) {
        dom.classList.add('warning');
        dom.value = '';
      }
      else {
        dom.classList.remove('warning');
        adressInfo[id] = value;
      }
    }

    if(Object.keys(adressInfo).length !== 8) {
      this.props.enableAlert();
    } else {
      const finalOrder = {};
      finalOrder.contact = adressInfo;
      finalOrder.items = items;
      console.log(JSON.stringify(finalOrder));
      postOrder(finalOrder);
    }
  }

  render() {
    const { postOrder } = this.props;
    const {active, items, success, fail} = this.props.summary;

    // If server responds, navigate accordingly to response component
    if(success || fail) {
      return (
        <Navigate from='*' to='/summary/response' />
      );
    }  else if(!active) {
      // If component is being accessed by typing URL, without necesity, go back to Homepage
      return (
        <Navigate from='*' to='/' />
      );
    } else {
      // Render component
      return (
        <div className={styles.root}>
          <h2 className={styles.header}> Order Summary </h2>
          <div className={styles.container}>
            <div className={styles.subContainer}>
              <h3 className={styles.subContainerHeader}> Products </h3>
              {items.map(item => (
                <div className={styles.singleElementContainer} key={item.id} id={item.id}>
                  <h2 className={styles.singleElementHeader}> {item.name} </h2>
                  <div className={styles.singleElementSubcontainer}>
                    <div className={styles.singleElementInfo}>
                      <h4> Color picked</h4>
                      <h3>{item.colors} </h3>
                    </div>
                    <div className={styles.singleElementInfo}>
                      <h4> Size</h4>
                      <h3>{item.size} </h3>
                    </div>
                    <div className={styles.singleElementInfo}>
                      <h4> Price</h4>
                      <h3> <span id={`priceTag-${item.id}`}>{item.price}</span>$</h3>
                    </div>
                    <div className={styles.singleElementInfo}>
                      <h4> Amount</h4>
                      <h3> {item.amount}</h3>
                    </div>
                  </div>
                  <div className={styles.descriptionContainer}>
                    <h3> Description</h3>
                    <p className={styles.description}>
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
              < h3 className={styles.totalPriceText}> Total Initial Price:  <span id={'totalPrice'}></span> </h3>
            </div>

            <div className={styles.subContainer}>
              <h3 className={styles.subContainerHeader}> Adress & Contact Info </h3>
              <div className={styles.singleElementContainer}>
                <div className={styles.singleElementSubcontainer}>
                  <div className={styles.singleElementInfo}>
                    <h4> Name </h4>
                    <input type='text' placeholder='Type Here' id='adress-name' />
                  </div>
                  <div className={styles.singleElementInfo}>
                    <h4> Surname </h4>
                    <input type='text' placeholder='Type Here' id='adress-surname' />
                  </div>
                  <div className={styles.singleElementInfo}>
                    <h4> Phone </h4>
                    <input type='text' placeholder='Type Here' maxLength='10' id='adress-phone' />
                  </div>
                  <div className={styles.singleElementInfo}>
                    <h4> Email </h4>
                    <input type='email' placeholder='Type Here' id='adress-email' />
                  </div>
                  <div className={styles.singleElementInfo}>
                    <h4> Street </h4>
                    <input type='text' placeholder='Type Here' id='adress-street' />
                  </div>
                  <div className={styles.singleElementInfo}>
                    <h4> Building </h4>
                    <input type='text' placeholder='Type Here' id='adress-building' />
                  </div>
                  <div className={styles.singleElementInfo}>
                    <h4> City </h4>
                    <input type='text' placeholder='Type Here' id='adress-city' />
                  </div>
                  <div className={styles.singleElementInfo}>
                    <h4> Zip Code </h4>
                    <input type='text' placeholder='Type Here' id='adress-zipcode' maxLength='5'/>
                  </div>
                </div>
              </div>
              <div className={styles.buttonsContainer}>
                <div className={styles.button} onClick={(event) => this.verifyOrder(event, items, postOrder)}>
                  Make Order
                </div>
                <NavLink className={styles.navlink} to='/cart'>
                  <div className={styles.buttonClear} > Back To Cart </div>
                </NavLink>
              </div>
            </div>
          </div>
          {this.props.summary.alert ? <Alert alertText='Not all required information was given! Please fill the information that are highlighted red!'
            clickFunction={this.props.disableAlert} /> : null}
        </div>
      );
    }
  }
}
