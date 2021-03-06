import axios from "axios";

const API = axios.create({
  baseURL: "https://memories-backend-server.herokuapp.com",
});

//const url = "http://localhost:5000/posts";
//const url = "https://memories-backend-server.herokuapp.com/posts";
API.interceptors.request.use((req) => {
  if (localStorage.getItem("profile")) {
    req.headers.authorization = `Bearer ${
      JSON.parse(localStorage.getItem("profile")).token
    }`;
  }
  return req;
});

export const fetchPosts = () => API.get("/posts");
export const createPosts = (newPost) => API.post("/posts", newPost);
export const updatePosts = (id, updatedPost) =>
  API.patch(`/posts/${id}`, updatedPost);
export const deletePost = (id) => API.delete(`/posts/${id}`);
export const likePost = (id) => API.patch(`/posts/${id}/like`);

//for auth
export const signIn = (formData) => API.post("/user/signin", formData);
export const signUp = (formData) => API.post("/user/signup", formData);
