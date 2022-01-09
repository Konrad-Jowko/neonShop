import React from 'react';
import PropTypes from 'prop-types';

import styles from './Alert.module.scss';

/* ALERT MODAL WITH CUSTOMABLE ALERT DESCRIPTION */
const Alert = ({alertText, clickFunction}) => (
  <div className={styles.container} id='alertModal' onClick={clickFunction}>
    <div className={styles.alert}>
      <h2>{alertText}</h2>
      <div className={styles.button}>
        OK
      </div>
    </div>
  </div>
);

Alert.defaultProps = {
  text: 'Alert!',
};

Alert.propTypes = {
  alertText: PropTypes.string,
  clickFunction: PropTypes.func,
};


export default Alert;
