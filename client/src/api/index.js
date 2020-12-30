import axios from "axios";

export const registerUserApi = (userData) => axios.post("/user/register", userData);