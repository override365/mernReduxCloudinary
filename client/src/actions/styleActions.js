import { GET_THEME, SET_THEME } from "./types";

export const getTheme = () => (dispatch) => {
    try {
        const currentTheme = localStorage.getItem("darkMode");
        dispatch({ type: GET_THEME, payload: currentTheme })
    } catch (error) {
        console.log(error);
    }
}

export const setTheme = (theme) => (dispatch) => {
    try {
        const newTheme = (theme === false ? "enabled" : "disabled")
        dispatch({ type: SET_THEME, payload: newTheme });
    } catch (error) {
        console.log(error);
    }
}