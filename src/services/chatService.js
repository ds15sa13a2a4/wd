import axios from 'axios';

const getUserChats = async (currentUserId) => {
    try {
        const res = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/userChats/${currentUserId}`)
        // Handle the response
        if (res.status === 200) {
            try {
                return res.data.userChats;
            } catch (error) {
                console.log(error)
            }
        } else {
            // There was an error submitting the form
            console.log("Error submitting form: " + res.statusText);
        }
        // console.log(object)

    } catch (err) {
        return console.log(err);
    }
}

const getChatMessages = async (chatId) => {
    try {
        const res = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/chats/${chatId}`)

        // Handle the response
        if (res.status === 200) {
            try {
                return res.data.messages ? res.data.messages : res.data.messageExists;
            } catch (error) {
                console.log(error)
            }
        } else {
            // There was an error submitting the form
            console.log("Error submitting form: " + res.statusText);
        }
        // console.log(object)

    } catch (err) {
        return console.log(err);
    }
}
export const getLastChatMessage = async (chatId) => {
    try {
        const res = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/getLastChatMessage/${chatId}`)
        // Handle the response
        if (res.status === 200) {
            try {
                return res.data.lastChatMessage
            } catch (error) {
                console.log(error)
            }
        } else {
            // There was an error submitting the form
            console.log("Error submitting form: " + res.statusText);
        }
        // console.log(object)

    } catch (err) {
        return console.log(err);
    }
}
const getChatInfo = async (chatInfo) => {
    return chatInfo
}

export default { getUserChats, getChatMessages, getChatInfo, getLastChatMessage };