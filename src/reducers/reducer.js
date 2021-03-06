import * as actionTypes from "../actions/actionTypes";

const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case actionTypes.FETCH_ALL:
      return action.payload;
    case actionTypes.CREATE:
      return [...state, action.payload];
    case actionTypes.UPDATE:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case actionTypes.LIKED:
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case actionTypes.DELETE:
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
