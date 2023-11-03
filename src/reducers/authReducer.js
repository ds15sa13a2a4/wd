import { LOGIN_SUCCESS, LOGIN_ERROR, LOGOUT, TOKEN_EXISTS_SUCCESS, TOKEN_EXISTS_FALSE } from "../actions/authAction";

const initState = {
    user: '',
    isAuthenticated: false,
    error: false,
    errorMessage: '',
}

const authReducer = (state = initState, action) => {
    switch (action.type) {
        case LOGIN_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                error: false,
                errorMessage: '',
            };
        case LOGIN_ERROR:
            return {
                ...state,
                user: '',
                error: true,
                isAuthenticated: false,
                errorMessage: action.error,
            };
        case LOGOUT:
            return {
                user: '',
            };
        case TOKEN_EXISTS_SUCCESS:
            return {
                ...state,
                user: action.user,
                isAuthenticated: true,
                error: false,
                errorMessage: '',
            };

        case TOKEN_EXISTS_FALSE:
            return {
                ...state,
                user: '',
                error: true,
                isAuthenticated: false,
                errorMessage: action.error,
            };

        default:
            return state;
    }
}

export default authReducer;