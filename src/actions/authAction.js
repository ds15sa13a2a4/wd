import authService from '../services/authService';

export const LOGIN_SUCCESS = "LOGIN_SUCCESS";
export const LOGIN_ERROR = "LOGIN_ERROR";
export const LOGOUT = "LOGOUT";
export const TOKEN_EXISTS_SUCCESS = "TOKEN_EXISTS_SUCCESS";
export const TOKEN_EXISTS_FALSE = "TOKEN_EXISTS_FALSE";

const loginSuccess = user => {
    return {
        type: LOGIN_SUCCESS,
        user,

    };
};

const loginError = error => {
    return {
        type: LOGIN_ERROR,
        error
    };
};
const userAuthSuccess = user => {
    return {
        type: TOKEN_EXISTS_SUCCESS,
        user,

    };
};

const userAuthFalse = error => {
    return {
        type: TOKEN_EXISTS_FALSE,
        error
    };
};

export const login = (username, password) => {
    return dispatch => {
        authService.login(username, password)
            .then(data => {
                data.message
                    ? dispatch(loginError(data.message))
                    : (dispatch(loginSuccess(data)))
            })
            .catch(err => dispatch(loginError(err)));
    }
}

export const logout = () => {
    authService.logout();
    return {
        type: LOGOUT
    };
}

export const tokenExists = (token) => {
    return dispatch => {
        authService.tokenExists(token).then(data =>
            data ? dispatch(userAuthSuccess(data)) : dispatch(userAuthFalse()))
    }
}