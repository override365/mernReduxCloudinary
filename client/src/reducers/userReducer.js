import { GET_USER_PROFILE } from "../actions/types";

const initialState = {
    profile: {
        username: "",
        firstName: "",
        lastName: "",
        joined: ""
    }
}

export default function(state = initialState, action) {
    switch (action.type) {
        case GET_USER_PROFILE:
            return {
                ...state,
                profile: {
                    username: action.payload.username,
                    firstName: action.payload.firstName,
                    lastName: action.payload.lastName,
                    joined: action.payload.createdAt
                } 
            }
        default:
            return state;
    }
}