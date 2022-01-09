import Axios from 'axios';
import { URL } from '../config';

/* SELECTORS */
export const getSummary = ({summary}) => summary;

/* ACTION NAME CREATOR */
const reducerName = 'summary';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTION TYPES */
const START_SUMMARY = createActionName('START_SUMMARY');
const DISPATCH_SUCCESS = createActionName('DISPATCH_SUCCESS');
const DISPATCH_FAILURE = createActionName('DISPATCH_FAILURE');
const CLOSE_SUMMARY = createActionName('CLOSE_SUMMARY');
const ENABLE_ALERT = createActionName('ENABLE_ALERT');
const DISABLE_ALERT = createActionName('DISABLE_ALERT');

/* ACTION CREATORS */
export const startSummary = payload => ({ payload, type: START_SUMMARY });
export const closeSummary = payload => ({ payload, type: CLOSE_SUMMARY });
const dispatchsuccess = payload => ({ payload, type: DISPATCH_SUCCESS });
const dispatchFailure = payload => ({ payload, type: DISPATCH_FAILURE });
export const enableAlert = payload => ({ payload, type: ENABLE_ALERT });
export const disableAlert = payload => ({ payload, type: DISABLE_ALERT });

/* THUNK CREATORS */
// Send POST request to the server to post new order on the database
export const postOrder = (order) => {

  return (dispatch) => {
    Axios
      .post(`${URL}api/orders`, order)
      .then(res => {
        if(res.data) {
          dispatch(dispatchsuccess());
        }
      })
      .catch(err => {
        dispatch(dispatchFailure());
      });
  };
};

/* REDUCER */
export const reducer = (statePart = [], action = {}, state) => {
  switch (action.type) {
    case START_SUMMARY: {
      return {
        ...statePart,
        active: true,
        items: action.payload,
      };
    }
    case DISPATCH_SUCCESS: {
      return {
        ...statePart,
        success: true,
        fail: false,
      };
    }
    case DISPATCH_FAILURE: {
      return {
        ...statePart,
        success: false,
        fail: true,
      };
    }
    case CLOSE_SUMMARY: {
      return {
        success: false,
        fail: false,
        active: false,
        items: [],
      };
    }
    case ENABLE_ALERT: {
      return {
        ...statePart,
        alert: true,
      };
    }
    case DISABLE_ALERT: {
      return {
        ...statePart,
        alert: false,
      };
    }
    default:
      return statePart;
  }
};
