import * as api from "../api";
import { ADD_POST, GET_POST_DETAIL, GET_POSTS, LIKE_POST, COMMENT_POST } from "./types";

export const getPosts = () => async (dispatch) => {
    try {
        const { data } = await api.getPostsApi();
        dispatch({ type: GET_POSTS, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const getPostDetail = (id) => async (dispatch) => {
    try {
        const { data } = await api.getPostDetailApi(id);
        dispatch({ type: GET_POST_DETAIL, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const addPost = (post) => async (dispatch) => {
    try {
        const { data } = await api.addPostApi(post);
        dispatch({ type: ADD_POST, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const likePost = (id) => async (dispatch) => {
    try {
        const { data } = await api.likePostApi(id);
        dispatch({ type: LIKE_POST, payload: data });
    } catch (error) {
        console.log(error);
    }
}

export const commentPost = (id, comment) => async (dispatch) => {
    try {
        const { data } = await api.commentPostApi(id, comment);
        dispatch({ type: COMMENT_POST, payload: data });
    } catch (error) {
        console.log(error);
    }
}