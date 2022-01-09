import { connect } from 'react-redux';
import  SummaryResponse  from './SummaryResponse';
import { getSummary, closeSummary } from '../../../redux/summaryRedux';
import {clearCart, updateLocalCart} from '../../../redux/cartRedux';

const mapStateToProps = (state) => ({
  summary: getSummary(state),
});

const mapDispatchToProps = (dispatch) => ({
  closeSummary: () => dispatch(closeSummary()),
  clearCart: () => dispatch(clearCart()),
  updateLocalCart: () => dispatch(updateLocalCart()),
});

export default connect(mapStateToProps, mapDispatchToProps)(SummaryResponse);
