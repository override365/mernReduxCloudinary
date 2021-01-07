import axios from "axios";

export const registerUserApi = (userData) => axios.post("/user/register", userData);
export const loginUserApi = (userData) => axios.post("/user/login", userData);

export const getPostsApi = () => axios.get("/post");
export const addPostApi = (newPost) => axios.post("/post", newPost);
export const likePostApi = (id) => axios.patch(`/post/${id}`);