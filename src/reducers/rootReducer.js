import { combineReducers } from 'redux';

import authReducer from './authReducer';
import chatReducer from './chatReducer';

let rootReducer = combineReducers({
    auth: authReducer,
    chat: chatReducer
});

export default rootReducer;