import axios from "axios";

export const registerUserApi = (userData) => axios.post("/user/register", userData);
export const loginUserApi = (userData) => axios.post("/user/login", userData);

export const getPostsApi = () => axios.get("/post");
export const getPostDetailApi = (id) => axios.get(`/post/${id}`);
export const addPostApi = (newPost) => axios.post("/post", newPost);
export const likePostApi = (id) => axios.patch(`/post/${id}`);
export const commentPostApi = (id, comment) => axios.patch(`/post/${id}/comment`, comment);