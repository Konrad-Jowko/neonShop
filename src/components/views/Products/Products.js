import React from 'react';
import PropTypes from 'prop-types';
import { NavLink } from 'react-router-dom';

import styles from './Products.module.scss';

/* COMPONENT DISPLAYING ALL AVAIABLE PRODUCTS */
export default class Products extends React.Component {
  static propTypes = {
    products: PropTypes.array,
    getProducts: PropTypes.func,
  };

  // Download all avaiable products, if not already in GLobal Storage
  componentDidMount() {
    this.props.getProducts();
  }

  // Expand or collapse the product category panel
  handlePanel(event) {
    const pickedContainer = event.target.parentNode;

    pickedContainer.classList.toggle('active');

    const pickedClass = pickedContainer.classList[0];
    const allContainers = document.querySelectorAll(`[class*="${pickedClass}"]`);

    for(let container of allContainers) {
      if (container !== pickedContainer) {
        container.classList.remove('active');
        container.classList.toggle('invisible');
      }
    }
  }

  render() {
    return (
      <div className={styles.root}>
        <h1 className={styles.header}> Here is all that we offer! </h1>
        <div className={styles.container}>
          {this.props.products.map(product => (
            <div key={product.name} className={styles.subContainer}>
              <h2 className={styles.title}> {product.name} </h2>
              <p className={styles.description}> {product.description}</p>

              <h3 className={styles.button} onClick={(event) => this.handlePanel(event)}>Pick Your style!</h3>
              <p className={styles.description}> Prices starting from: <span className={styles.highlight}> {product.startingPrice}$ </span></p>

              <div className={styles.itemsContainer}>
                {product.items.map(item => (
                  <div key={item.name} className={styles.singleItemContainer}>
                    <div className={styles.singleItemSubContainer}>
                      <h3  className={styles.subTitle}>{item.name}</h3>
                      <p className={styles.itemDescription}> {item.shortDescription}</p>
                      {item.color !== 'none' ? <span className={styles.singularColor}> What color Can You expect? <br /><span className={styles.colorDescription}> {item.color}</span> </span>:
                        <span className={styles.multiColor}> With multiple colors to pick! </span>}

                    </div>
                    <img alt='product' src={`./images/${item.image}`}/>
                    <NavLink className={styles.itemButtonContainer }to={`/products/${product.id}/${item.productId}`}> <h3 className={styles.itemButton}>Choose this product</h3> </NavLink>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }
}
