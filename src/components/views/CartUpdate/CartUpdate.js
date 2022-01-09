import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './CartUpdate.module.scss';

/* COMPONENT INFORMING, THAT PRODUCT WAS ADDED TO THE CART */
const CartUpdate = () => (
  <div className={styles.root}>
    <h2 className={styles.header}> Product chosen by You was added to the Cart!  </h2>
    <div className={styles.container}>
      <h3 className={styles.question}> You want to continue shopping, or see Your Cart?   </h3>
      <div className={styles.buttonsContainer}>
        <NavLink className={styles.button} to='/cart'> Go to Cart </NavLink>
        <NavLink className={styles.button} to='/products'> Continue </NavLink>
      </div>
    </div>
  </div>
);

export default CartUpdate;
