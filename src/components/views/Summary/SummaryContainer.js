import { connect } from 'react-redux';
import Summary from './Summary';
import { getSummary, postOrder, enableAlert, disableAlert  } from '../../../redux/summaryRedux';

const mapStateToProps = (state) => ({
  summary: getSummary(state),
});

const mapDispatchToProps = (dispatch) => ({
  postOrder: (payload) => dispatch(postOrder(payload)),
  enableAlert: () => dispatch(enableAlert()),
  disableAlert: () => dispatch(disableAlert()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Summary);
