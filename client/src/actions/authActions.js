import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import * as api from "../api";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING, REGISTER_USER } from "./types";

export const registerUser = (newUser) => async (dispatch) => {
    try {
        const { data } = await api.registerUserApi(newUser)
        dispatch({ type: REGISTER_USER, payload: data });
    } catch (error) {
        console.log(error);
    }
};

export const loginUser = (inputData) => dispatch => {
    axios
        .post("/user/login", inputData)
        .then(res => {
            // Save to localStorage
            // Set to localStorage
            const { token } = res.data;
            localStorage.setItem("jwt", token);
            // Set token to Auth header
            setAuthToken(token);
            // Decode token to get user data
            const decodedToken = jwt_decode(token)
            // Set current user
            dispatch(setCurrentUser(decodedToken))
        })
        .catch(err => dispatch({
            type: GET_ERRORS,
            payload: err.response.data
        }));
};

export const setCurrentUser = decodedToken => {
    return {
        type: SET_CURRENT_USER,
        payload: decodedToken
    };
};

export const userLoading = () => {
    return {
        type: USER_LOADING
    };
};

export const userLogout = () => dispatch => {
    // Remove token from localStorage
    localStorage.removeItem("jwt");
    // Remove Auth header for future requests
    setAuthToken(false);
    // Set current user to empty object {} which will set isAuthenticated to false
    dispatch(setCurrentUser({}));
}
