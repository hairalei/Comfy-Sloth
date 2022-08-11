import {
  ADD_TO_CART,
  CLEAR_CART,
  COUNT_CART_TOTALS,
  REMOVE_CART_ITEM,
  TOGGLE_CART_ITEM_AMOUNT,
} from '../actions';

const cart_reducer = (state, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const { id, color, amount, product } = action.payload;
      const tempItem = state.cart.find((item) => item.id === id + color);

      if (tempItem) {
        const tempCart = state.cart.map((cartItem) => {
          if (cartItem.id === id + color) {
            let newAmount = cartItem.amount + amount;
            if (newAmount > cartItem.max) {
              newAmount = cartItem.max;
            }

            return { ...cartItem, amount: newAmount };
          }
        });

        return { ...state, cart: tempCart };
      } else {
        const newItem = {
          id: id + color,
          name: product.name,
          color,
          amount,
          image: product.images[0].url,
          price: product.price,
          max: product.stock,
        };
        return { ...state, cart: [...state.cart, newItem] };
      }

    case REMOVE_CART_ITEM:
      return {
        ...state,
        cart: [...state.cart.filter((item) => item.id !== action.payload)],
      };

    case TOGGLE_CART_ITEM_AMOUNT: {
      const { id, value } = action.payload;
      const tempCart = state.cart.map((item) => {
        if (item.id === id) {
          if (value === 'inc') {
            item.amount = item.amount >= item.max ? item.max : item.amount + 1;
          } else {
            item.amount = item.amount === 1 ? 1 : item.amount - 1;
          }
        }
        return { ...item, amount: item.amount };
      });
      return { ...state, cart: tempCart };
    }

    case CLEAR_CART:
      return { ...state, cart: [] };

    case COUNT_CART_TOTALS:
      const { totalItems, totalAmount } = state.cart.reduce(
        (total, item) => {
          return {
            totalItems: total.totalItems + item.amount,
            totalAmount: total.totalAmount + item.amount * item.price,
          };
        },
        { totalItems: 0, totalAmount: 0 }
      );

      return { ...state, totalAmount, totalItems };
  }

  throw new Error(`No Matching "${action.type}" - action type`);
};

export default cart_reducer;
