import * as api from "../api/index";
import { GET_USER_PROFILE } from "./types";

export const getUserProfile = (username) => async (dispatch) => {
    try {
        const { data } = await api.getUserApi(username);
        dispatch({ type: GET_USER_PROFILE, payload: data })
    } catch (error) {
        console.log(error);
    }
}