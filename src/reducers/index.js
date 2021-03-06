import { combineReducers } from "redux";
import posts from "./reducer";
import auth from "./auth";

export const reducers = combineReducers({
  posts: posts,
  auth: auth,
});
