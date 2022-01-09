import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './Homepage.module.scss';


const Homepage = ({headers, images}) => (
  <div className={styles.root}>
    <h1 className={styles.header}> Welcome! </h1>

    <p> Here at G&G, we are proud to present the results of our hard work - custom made <span>Lighting devices!</span> </p>
    <p> Our little company offers many different kinds of lighting appliances, each made by an artisan, who&apos;s field of interest directly overlaps with the work done here! </p>
    <p> Thanks to these unique approach towards our work, we offer not only unique, hand-made devices which present themselves beautifully, but are functional and practical as well.</p>
    <h2> So, what do we offer?</h2>

    <ul>
      {headers.map(header => {
        const index = headers.indexOf(header);

        return (
          <NavLink to='/products' key={header}>
            <li >
              <div className={styles.container}>
                <h2> {header} </h2>
                <img alt='' src={`./images/${images[index]}`} />
              </div>
            </li>
          </NavLink>
        );})}
    </ul>

    <NavLink to='/products'>
      <h2> Check out Products page for more information!</h2>
    </NavLink>
  </div>
);

Homepage.propTypes = {
  headers: PropTypes.array,
  images: PropTypes.array,
};


export default Homepage;
