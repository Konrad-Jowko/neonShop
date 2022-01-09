import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './Header.module.scss';

/* SIMPLE HEADER COMPONENT WITH NAVIGATION */
const Header = ({options, getProducts}) => {

  // Download site products to be avaiable everywhere on site
  React.useEffect(() => {
    getProducts();
  });

  return (
    <div className={styles.root}>
      <ul>
        {Object.keys(options).map(option => (
          <NavLink to={options[option].link} key={option}> <li className={styles.option}> {options[option].name} </li> </ NavLink>
        ))}
      </ul>
    </div>
  );
};

Header.propTypes = {
  options: PropTypes.object,
  getProducts: PropTypes.func,
};


export default Header;
