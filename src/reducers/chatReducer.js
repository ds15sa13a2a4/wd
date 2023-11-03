import { GET_USERCHATS_SUCCESS, GET_USERCHATS_FALSE, GET_CHAT_MESSAGES_SUCCESS, GET_CHAT_MESSAGES_FALSE, GET_CHAT_INFO_SUCCESS, GET_CHAT_INFO_FALSE, GET_CHAT_LAST_MESSAGE_FALSE, GET_CHAT_LAST_MESSAGE_SUCCESS } from "../actions/chatAction";

const initState = {
    userChats: {},
    chatMessages: [],
    chatInfo: {},
    lastChatMessage: "",
}

const chatReducer = (state = initState, action) => {
    switch (action.type) {
        case GET_USERCHATS_SUCCESS:
            return {
                ...state,
                userChats: action.userChats,
                error: false,
                errorMessage: ''
            };
        case GET_USERCHATS_FALSE:
            return {
                ...state,
                userChats: {},
                error: true,
                errorMessage: action.error
            };
        case GET_CHAT_MESSAGES_SUCCESS:
            return {
                ...state,
                chatMessages: action.chatMessages ? action.chatMessages : action.messageExists,
                error: false,
                errorMessage: ''
            };
        case GET_CHAT_MESSAGES_FALSE:
            return {
                ...state,
                chatMessages: {},
                error: true,
                errorMessage: action.error
            };
        case GET_CHAT_LAST_MESSAGE_SUCCESS:
            return {
                ...state,
                lastChatMessage: action.lastChatMessage,
                error: false,
                errorMessage: ''
            };
        case GET_CHAT_LAST_MESSAGE_FALSE:
            return {
                ...state,
                lastChatMessage: "",
                error: true,
                errorMessage: action.error
            };
        case GET_CHAT_INFO_SUCCESS:
            return {
                ...state,
                chatInfo: action.chatInfo,
                error: false,
                errorMessage: ''
            };
        case GET_CHAT_INFO_FALSE:
            return {
                ...state,
                chatInfo: {},
                error: true,
                errorMessage: action.error
            };
        default:
            return state;
    }
}

export default chatReducer;