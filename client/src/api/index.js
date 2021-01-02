import axios from "axios";

export const registerUserApi = (userData) => axios.post("/user/register", userData);
export const loginUserApi = (userData) => axios.post("/user/login", userData);