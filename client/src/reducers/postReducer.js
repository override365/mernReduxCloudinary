import { ADD_POST, GET_POST_DETAIL, GET_POSTS, LIKE_POST, COMMENT_POST } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case COMMENT_POST:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case GET_POST_DETAIL:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case LIKE_POST:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case GET_POSTS:
            return action.payload
        case ADD_POST:
            return [action.payload, ...state];
        default:
            return state;
    }
}