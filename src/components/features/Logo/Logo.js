import React from 'react';
import { NavLink } from 'react-router-dom';

import styles from './Logo.module.scss';

const colors = [
  'violet',
  'ultramarine',
  'green',
  'yellow',
  'orange',
  'red',
];

// Randomize the logo color
function randomizeColor() {
  return colors[Math.floor(Math.random()*colors.length)];
}

/* CUSTOM LOGO WITH RANDOMIZED COLOR */
const Logo = () => (
  <NavLink to="/" className={`${styles.logo} ${randomizeColor()}`}>
    <span className={styles.upperText}> Gla<i className={styles.flicker}>s</i>s </span>
    <span className={styles.middleText}> & </span>
    <span className={styles.lowerText}>
      Gas
    </span>
  </NavLink>
);

export default Logo;
