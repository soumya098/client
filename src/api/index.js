import axios from "axios";

//const url = "http://localhost:5000/posts";
const url = "https://memories-backend-server.herokuapp.com/posts";

export const fetchPosts = () => axios.get(url);

export const createPosts = (newPost) => axios.post(url, newPost);

export const updatePosts = (id, updatedPost) =>
  axios.patch(`${url}/${id}`, updatedPost);

export const deletePost = (id) => axios.delete(`${url}/${id}`);

export const likePost = (id) => axios.patch(`${url}/${id}/like`);
