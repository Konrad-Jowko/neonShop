import React from 'react';
import PropTypes from 'prop-types';
import  Header  from '../Header/HeaderContainer';
import  Logo  from '../../features/Logo/Logo';

import styles from './MainLayout.module.scss';

const MainLayout = ({children}) => (
  <div className={styles.root}>
    <Logo />
    <Header />
    {children}
  </div>
);

MainLayout.propTypes = {
  children: PropTypes.node,
};

export default MainLayout;
