import * as api from "../api";
import * as actionTypes from "./actionTypes";

//action creators
export const getPosts = () => async (dispatch) => {
  try {
    const { data } = await api.fetchPosts();
    const action = { type: actionTypes.FETCH_ALL, payload: data };
    dispatch(action);
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPosts(newPost);
    dispatch({ type: actionTypes.CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, updatedpost) => async (dispatch) => {
  try {
    const { data } = await api.updatePosts(id, updatedpost);
    dispatch({ type: actionTypes.UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    dispatch({ type: actionTypes.DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: actionTypes.LIKED, payload: data });
  } catch (error) {
    console.log(error);
  }
};
