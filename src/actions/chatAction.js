import chatService from '../services/chatService';

export const GET_USERCHATS_SUCCESS = "GET_USERCHATS_SUCCESS";
export const GET_USERCHATS_FALSE = "GET_USERCHATS_FALSE";
export const GET_CHAT_MESSAGES_SUCCESS = "GET_CHAT_MESSAGES_SUCCESS";
export const GET_CHAT_MESSAGES_FALSE = "GET_CHAT_MESSAGES_FALSE";
export const GET_CHAT_LAST_MESSAGE_SUCCESS = "GET_CHAT_LAST_MESSAGE_SUCCESS";
export const GET_CHAT_LAST_MESSAGE_FALSE = "GET_CHAT_LAST_MESSAGE_FALSE";
export const GET_CHAT_INFO_SUCCESS = "GET_CHAT_INFO_SUCCESS";
export const GET_CHAT_INFO_FALSE = "GET_CHAT_INFOFALSE";

const getUserChatsSuccess = userChats => {
    return {
        type: GET_USERCHATS_SUCCESS,
        userChats
    };
};

const getUserChatsFalse = error => {
    return {
        type: GET_USERCHATS_FALSE,
        error
    };
};
const getChatMessagesSuccess = chatMessages => {
    return {
        type: GET_CHAT_MESSAGES_SUCCESS,
        chatMessages
    };
};

const getChatMessagesFalse = error => {
    return {
        type: GET_CHAT_MESSAGES_FALSE,
        error
    };
};
const getLastChatMessageSuccess = lastChatMessage => {
    return {
        type: GET_CHAT_LAST_MESSAGE_SUCCESS,
        lastChatMessage
    };
};

const getLastChatMessageFalse = error => {
    return {
        type: GET_CHAT_LAST_MESSAGE_FALSE,
        error
    };
};
const getChatInfoSuccess = chatInfo => {
    return {
        type: GET_CHAT_INFO_SUCCESS,
        chatInfo
    };
};

const getChatInfoFalse = error => {
    return {
        type: GET_CHAT_INFO_FALSE,
        error
    };
};

export const getUserChats = (currentUserId) => {
    return dispatch => {
        chatService.getUserChats(currentUserId).then(data => {
            data ? dispatch(getUserChatsSuccess(data)) : dispatch(getUserChatsFalse(data))
        })
    }
}
export const getChatMessages = (chatid) => {
    return dispatch => {
        chatService.getChatMessages(chatid).then(data => {
            data ? dispatch(getChatMessagesSuccess(data)) : dispatch(getChatMessagesFalse(data))
        })
    }
}
export const getLastChatMessage = (chatid) => {
    return dispatch => {
        chatService.getLastChatMessage(chatid).then(data => {
            data ? dispatch(getLastChatMessageSuccess(data)) : dispatch(getLastChatMessageFalse(data))
        })
    }
}
export const getChatInfo = (chatInfo) => {
    return dispatch => {
        chatService.getChatInfo(chatInfo).then(data => {
            data ? dispatch(getChatInfoSuccess(data)) : dispatch(getChatInfoFalse(data))
        })
    }
}
