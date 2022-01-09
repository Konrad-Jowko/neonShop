import { connect } from 'react-redux';
import Products from './Products';
import { getProductsOptions, getProducts } from '../../../redux/productsRedux';

const mapStateToProps = (state) => ({
  products: getProductsOptions(state),
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Products);
