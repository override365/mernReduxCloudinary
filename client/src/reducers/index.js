import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducer from "./errorReducer";
import postReducer from "./postReducer";
import styleReducer from "./styleReducer";

export default combineReducers({
    auth: authReducer,
    errors: errorReducer,
    posts: postReducer,
    darkMode: styleReducer
})