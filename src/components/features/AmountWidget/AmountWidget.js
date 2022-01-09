import React from 'react';
import PropTypes from 'prop-types';
import { nanoid } from 'nanoid';
import styles from './AmountWidget.module.scss';

/* CUSTOM AMOUNT WIDGET */
export default class AmountWidget extends React.Component {
  static defaultProps = {
    number: 1,
    id: nanoid(5),
  }

  static propTypes = {
    number: PropTypes.number,
    id: PropTypes.string,
  };

  // Increasing the widget display number
  add(id) {
    const amount = document.getElementById(id);
    let number = parseInt(amount.innerHTML);

    if (number <= 9) number += 1;
    amount.innerHTML = number;
  }

  // Decreasing the widget display number
  subtract(id) {
    const amount = document.getElementById(id);
    let number = parseInt(amount.innerHTML);

    if (number >= 2) number -= 1;
    amount.innerHTML = number;
  }

  render() {
    return (
      <div className={styles.widget}>
        <div className={styles.subtraction} onClick={() => this.subtract(this.props.id)}>
        -
        </div>
        <div className={styles.amount} id={this.props.id} queryselector='amount'>
          {this.props.number}
        </div>
        <div className={styles.addition} onClick={() => this.add(this.props.id)}>
          +
        </div>
      </div>
    );
  }
}
