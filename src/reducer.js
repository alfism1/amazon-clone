export const initialState = {
  basket: [],
  basketLoaded: false,
  user: null
};

export const getBasketTotal = (basket) =>
  basket?.reduce((amount, item) => item.price + amount, 0);

const reducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_BASKET":
      window.localStorage.setItem("basket", JSON.stringify([...state.basket, action.item]));
      return {
        ...state,
        basket: [...state.basket, action.item],
      };

    case "EMPTY_BASKET":
      window.localStorage.removeItem("basket");
      return {
        ...state,
        basket: []
      };

    case "REMOVE_FROM_BASKET":
      const index = state.basket.findIndex(
        (basketItem) => basketItem.id === action.id
      );
      let newBasket = [...state.basket];

      if (index >= 0) { 
        newBasket.splice(index, 1);
      } else {
        console.warn(`Can't remove product (id: ${action.id}) as its not in basket!`);
      }

      window.localStorage.setItem("basket", JSON.stringify(newBasket));
      return {
        ...state,
        basket: newBasket
      };

    case "SET_USER":
      return {
        ...state,
        user: action.user
      }

    case "BASKET_LOADED":
      return {
        ...state,
        basketLoaded: true,
      };

    default:
      return state;
  }
};

export default reducer;
