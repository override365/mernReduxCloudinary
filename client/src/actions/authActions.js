import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";

import * as api from "../api";
import { GET_ERRORS, SET_CURRENT_USER, USER_LOADING } from "./types";

export const registerUser = (newUser, history) => async (dispatch) => {
    try {
        await api.registerUserApi(newUser);
        history.push("/");
    } catch (error) {
        dispatch({ type: GET_ERRORS, payload: error.response.data  });
    }
};

export const loginUser = (loginUser) => async (dispatch) => {
    try {
        const { data } = await api.loginUserApi(loginUser);
        const { token } = data;
        localStorage.setItem("jwt", token);
        setAuthToken(token);
        const decoded = jwt_decode(token);
        dispatch(setCurrentUser(decoded));
    } catch (error) {
        dispatch({ type: GET_ERRORS, payload: error.response.data });
    }
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
