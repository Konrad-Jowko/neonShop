import React from 'react';
import PropTypes from 'prop-types';
import styles from './Carousel.module.scss';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

/* IMPORTED PHOTO CAROUSEL*/
const PhotoCarousel = ({images}) => (
  <AliceCarousel autoPlay autoPlayInterval='2500' animationType='fadeout' disableButtonsControls='true' disableDotsControls='true' infinite='true'>
    {images.map(image => (
      <div key={image} className={styles.carouselItem}> <img alt={image} className={styles.itemImage} src={`/images/${image}`} /> </div>
    ))}
  </AliceCarousel>
);


PhotoCarousel.defaultProps = {
  images: [],
};

PhotoCarousel.propTypes = {
  images: PropTypes.array,
};

export default PhotoCarousel;
