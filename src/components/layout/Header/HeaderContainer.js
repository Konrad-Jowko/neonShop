import { connect } from 'react-redux';
import Header from './Header';
import {getHeaderOptions} from '../../../redux/headerRedux';
import { getProducts } from '../../../redux/productsRedux';

const mapStateToProps = (state) => ({
  options: getHeaderOptions(state),
});

const mapDispatchToProps = (dispatch) => ({
  getProducts: () => dispatch(getProducts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Header);
