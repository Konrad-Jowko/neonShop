import { connect } from 'react-redux';
import Cart  from './Cart';
import { getCart, updateCart, clearCart, updateLocalCart, getLocalCart } from '../../../redux/cartRedux';
import { startSummary } from '../../../redux/summaryRedux';

const mapStateToProps = (state) => ({
  cart: getCart(state),
});

const mapDispatchToProps = (dispatch) => ({
  updateCart: (payload) => dispatch(updateCart(payload)),
  updateLocalCart: (payload) => dispatch(updateLocalCart(payload)),
  getLocalCart: () => dispatch(getLocalCart()),
  clearCart: () => dispatch(clearCart()),
  startSummary: (payload) => dispatch(startSummary(payload)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Cart);
