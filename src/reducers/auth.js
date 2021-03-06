import * as actionTypes from "../actions/actionTypes";

const authReducer = (state = { authdata: null }, action) => {
  switch (action.type) {
    case actionTypes.AUTH:
      localStorage.setItem("profile", JSON.stringify(action?.data));
      return { ...state, authdata: action?.data };
    case actionTypes.LOGOUT:
      localStorage.clear();
      return { ...state, authdata: action?.data };
    default:
      return state;
  }
};

export default authReducer;
