import Axios from 'axios';
import { URL } from '../config';

/* SELECTORS */
export const getProduct = ({singleProduct}) => singleProduct;

/* ACTION NAME CREATOR */
const reducerName = 'product';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTION TYPES */
const FETCH_PRODUCT = createActionName('FETCH_PRODUCT');
const SET_UNLOADED = createActionName('SET_UNLOADED');
const ENABLE_ALERT = createActionName('ENABLE_ALERT');
const DISABLE_ALERT = createActionName('DISABLE_ALERT');

/* ACTION CREATORS */
export const fetchProduct = payload => ({ payload, type: FETCH_PRODUCT });
export const setUnloaded = payload => ({ payload, type: SET_UNLOADED });
export const enableAlert = payload => ({ payload, type: ENABLE_ALERT });
export const disableAlert = payload => ({ payload, type: DISABLE_ALERT });

/* THUNK CREATORS */
// Get all data about one product from database
export const getSingleProduct = (categoryId, productId) => {

  return (dispatch, getState) => {
    Axios
      .get(`${URL}api/products/${categoryId}/${productId}`)
      .then(res => {
        dispatch(fetchProduct(res.data));
      })
      .catch(err => {
        console.log(err.message);
      });
  };
};

/* REDUCER */
export const reducer = (statePart = [], action = {}, state) => {
  switch (action.type) {
    case FETCH_PRODUCT: {
      return action.payload;
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
