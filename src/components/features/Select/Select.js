import React from 'react';
import PropTypes from 'prop-types';
import styles from './Select.module.scss';

/* CUSTOM SELECT COMPONENT */
export default class Select extends React.Component {
  static defaultProps = {
    displayText: 'Make Your Choice',
    options: [],
  }

  static propTypes = {
    options: PropTypes.array,
    displayText: PropTypes.string,
    id: PropTypes.string,
    setPrice: PropTypes.any,
  };

  // Open the options list
  openSelect(e, id) {
    const element = document.getElementById(id);
    element.classList.toggle('active');
  }

  // Close the options list and save picked value
  pickOption(e, option, id) {
    const picked = document.getElementById(option);
    const element = document.getElementById(`${id}-pickedValue`);
    const price = picked.getAttribute('price');
    element.innerHTML = option;
    element.setAttribute('price', price);
  }


  render() {
    const {id, displayText} = this.props;
    let options = this.props.options, prices = [];

    if(this.props.options[0].size) {
      const parsedOptions = [];

      this.props.options.map(option => {
        parsedOptions.push(option.size);
        prices.push(option.price);
      });

      options = parsedOptions;
    }

    return (
      <div className={styles.customSelect} onClick={(e) => this.openSelect(e, id)} onFocus={(e) => this.openSelect(e, id)}>
        <div id={id} className={styles.select}>
          <span id={`${id}-pickedValue`}>{displayText}</span>
          <div className={styles.selectOptionsContainer}>
            {options.map(option => (
              <option className={styles.option} key={option} id={option} value={option} price={prices[options.indexOf(option)]} onClick={(e) => this.pickOption(e, option, id)}>{option}</option>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
