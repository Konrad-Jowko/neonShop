import { connect } from 'react-redux';
import Homepage  from './Homepage';
import {getHeaders, getOneImage} from '../../../redux/productsRedux';

const mapStateToProps = (state) => ({
  headers: getHeaders(state),
  images: getOneImage(state),
});

export default connect(mapStateToProps)(Homepage);
