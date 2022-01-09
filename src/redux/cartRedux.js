/* SELECTORS */
export const getCart = ({cart}) => cart;

/* ACTION NAME CREATOR */
const reducerName = 'cart';
const createActionName = name => `app/${reducerName}/${name}`;

/* ACTION TYPES */
const ADD_TO_CART = createActionName('ADD_TO_CART');
const UPDATE_CART = createActionName('UPDATE_CART');
const CLEAR_CART = createActionName('CLEAR_CART');

/* ACTION CREATORS */
export const addToCart = payload => ({ payload, type: ADD_TO_CART });
export const updateCart = payload => ({ payload, type: UPDATE_CART });
export const clearCart = payload =>  ({ payload, type: CLEAR_CART });


/* THUNK CREATORS */
// Get cart data from local storage, if there is no data like this in global storage
export const getLocalCart = () => {
  return (dispatch, getState) => {
    const state = getState();

    const cart = JSON.parse(localStorage.getItem('cart'));

    if (cart && state.cart !== cart ) {
      dispatch(updateCart(cart));
    }
  };
};

// Update local storage cart data
export const updateLocalCart = (optional) => {
  return (dispatch, getState) => {
    const state = getState();

    if(optional) {
      localStorage.setItem('cart', JSON.stringify(optional));
    }
    else {
      if (state.cart.length > 0 ) {
        const cart = state.cart;
        localStorage.setItem('cart', JSON.stringify(cart));
      } else {
        localStorage.removeItem('cart');
      }
    }


  };
};

// Clear local storage cart data
export const clearLocalCart = () => {
  console.log('usuwam local!');
  localStorage.removeItem('cart');
};

/* REDUCER */
export const reducer = (statePart = [], action = {}, state) => {
  switch (action.type) {
    case ADD_TO_CART: {
      return [...statePart,
        action.payload,
      ];
    }
    case UPDATE_CART: {
      return action.payload;
    }
    case CLEAR_CART: {
      return [];
    }
    default:
      return statePart;
  }
};
