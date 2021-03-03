const initialState = [];

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FETCH_ALL":
      return action.payload;
    case "CREATE":
      return [...state, action.payload];
    case "UPDATE":
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case "LIKED":
      return state.map((item) =>
        item._id === action.payload._id ? action.payload : item
      );
    case "DELETE":
      return state.filter((post) => post._id !== action.payload);
    default:
      return state;
  }
};

export default reducer;
