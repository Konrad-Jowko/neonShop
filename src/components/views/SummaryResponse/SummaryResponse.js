import React from 'react';
import PropTypes from 'prop-types';
import { Navigate } from 'react-router-dom';

import styles from './SummaryResponse.module.scss';

/* SUMMARY OF THE SERVER RESPONSE FOR THE ORDER SENT*/
export default class SummaryResponse extends React.Component {
  static propTypes = {
    summary: PropTypes.object,
    closeSummary: PropTypes.func,
    clearCart: PropTypes.func,
    updateLocalCart: PropTypes.func,
  };

  // Close the "sucess" response, clearing the cart in global and local storage
  async closeSuccess(closeSummary, clearCart, updateLocalCart) {
    this.props.clearCart();
    this.props.updateLocalCart();
    closeSummary();
  }

  // Close the "failure" response, without clearing the cart
  async closeFailure(closeSummary) {
    closeSummary();
  }

  render() {
    const {success, fail} = this.props.summary;
    const { closeSummary } = this.props;

    // If posting the order was a sucess, render this
    if(success) {
      return (
        <div className={styles.root}>
          <h2 className={styles.header}> Your placed Your Order!  </h2>
          <div className={styles.container}>
            <h3 className={styles.info}> We will contact You in the next 3 work days!  </h3>
            <div className={styles.buttonsContainer}>
              <div className={styles.button} onClick={() => this.closeSuccess(closeSummary)}> Homepage </div>
            </div>
          </div>
        </div>
      );
    } else if (fail) {
      // If posting the order was a failure, render this
      return (
        <div className={styles.root}>
          <h2 className={styles.header}> Something went wrong with your order ;(  </h2>
          <div className={styles.container}>
            <h3 className={styles.info}> Please, try again in a moment!  </h3>
            <div className={styles.buttonsContainer}>
              <div className={styles.button} onClick={() => this.closeFailure(closeSummary)}> Homepage </div>
            </div>
          </div>
        </div>
      );
    } else {
      // If component is being accessed by typing URL, without necesity, go back to Homepage
      return (
        <Navigate from='*' to='/' />
      );
    }
  }
}
