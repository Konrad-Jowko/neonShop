import { connect } from 'react-redux';
import Product from './Product';
import { getProduct, getSingleProduct, enableAlert, disableAlert} from '../../../redux/singleProductRedux';
import { addToCart, updateLocalCart } from '../../../redux/cartRedux';

const mapStateToProps = (state) => ({
  singleProduct: getProduct(state),
});

const mapDispatchToProps = (dispatch) => ({
  addToCart: (payload) => dispatch(addToCart(payload)),
  getSingleProduct: (categoryId, productId) => dispatch(getSingleProduct(categoryId, productId)),
  updateLocalCart: () => dispatch(updateLocalCart()),
  enableAlert: () => dispatch(enableAlert()),
  disableAlert: () => dispatch(disableAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Product);
