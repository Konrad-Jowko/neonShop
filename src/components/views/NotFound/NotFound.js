import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './NotFound.module.scss';

const NotFound = () => (
  <div className={styles.root}>
    <h2 className={styles.header}> Page not found!  </h2>
    <div className={styles.container}>
      <h3 className={styles.info}> Please, go back to our Homepage!  </h3>
      <div className={styles.buttonsContainer}>
        <NavLink className={styles.button} to='/'> Homepage </NavLink>
      </div>
    </div>
  </div>
);


export default NotFound;
