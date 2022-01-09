import { connect } from 'react-redux';
import About from './About';
import { getAbout } from '../../../redux/productsRedux';

const mapStateToProps = (state) => ({
  about: getAbout(state),
});

export default connect(mapStateToProps)(About);
