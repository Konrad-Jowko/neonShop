import Axios from 'axios';
import { URL } from '../config';

/* SELECTORS */
export const getProductsOptions = ({products}) => products;
export const getHeaders = ({products}) => products.map(option => option.name);
export const getOneImage = ({products}) => products.map(option => option.images[Math.floor(Math.random()*option.images.length)]);
export const getAbout = ({about}) => about;

/* ACTION NAME CREATOR */
const reducerName = 'products';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTION TYPES */
const FETCH_PRODUCTS = createActionName('FETCH_PRODUCTS');

/* ACTION CREATORS */
export const fetchProducts = payload => ({ payload, type: FETCH_PRODUCTS });

/* THUNK CREATORS */
// Get basic data about all products from database
export const getProducts = () => {

  return (dispatch, getState) => {
    const state = getState();

    if(state.products.length === 0 ) {
      Axios
        .get(`${URL}api/products`)
        .then(res => {
          dispatch(fetchProducts(res.data));
        })
        .catch(err => {
          console.log(err.message);
        });
    }
  };
};

/* REDUCER */
export const reducer = (statePart = [], action = {}, state) => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return action.payload;
    }
    default:
      return statePart;
  }
};
