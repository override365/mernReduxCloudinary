import { ADD_POST, GET_POSTS, LIKE_POST } from "../actions/types";

export default function(state = [], action) {
    switch (action.type) {
        case LIKE_POST:
            return state.map((post) => post._id === action.payload._id ? action.payload : post);
        case GET_POSTS:
            return action.payload;
        case ADD_POST:
            return [...state, action.payload];
        default:
            return state;
    }
}