import React, { useEffect, useState } from "react";
import { decrypt } from "../../hashing";
import { useDispatch, useSelector } from 'react-redux';
import { getChatInfo, getUserChats, getChatMessages, } from "../../actions/chatAction";
import { Avatar, Button, List, message } from 'antd'
import { MdSpaceDashboard } from "react-icons/md";
import { getLastChatMessage } from "../../services/chatService";
import { socket } from "../../helpers/setSocket";


const ChatList = () => {
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.user)
  const userChats = useSelector(state => state.chat.userChats)
  const [userChatsList, setUserChatsList] = useState([])
  const getChats = async () => {
    try {
      dispatch(getUserChats(user.uid)) // token'dan bilgi çekildiğinde
      // reduxtan gelince uid olarak geliyor userId yerine ileride backend'de düzeltilebilir.
    } catch (error) {
      console.log("odaya bağlanılamadı")
    }

  }
  useEffect(() => {
    getChats();
  }, []);
  const handleSelect = (chat) => {
    const userInfo = chat.userInfo
    socket.emit('enteredTheChat', {
      userId: user.uid,
      socketID: socket.id,
    })
    dispatch(getChatMessages(userInfo.uid))
    dispatch(getChatInfo(userInfo))


  };


  useEffect(() => {
    const fetchData = async () => {
      let dataArray = Object.entries(userChats);

      const updatedChatsList = await Promise.all(dataArray.map(async ([chatId, chat]) => {
        const lastMessage = await getLastChatMessage(chatId);
        const decryptedMessage = decrypt(lastMessage);
        chat.lastMessage = decryptedMessage;
        return chat;
      }));

      // Separate chats with or without 'date' property
      const chatsWithDate = [];
      const chatsWithoutDate = [];

      updatedChatsList.forEach(chat => {
        if (chat.date && chat.date.seconds && chat.date.nanoseconds) {
          chatsWithDate.push(chat);
        } else {
          chatsWithoutDate.push(chat);
        }
      });

      // Sort chats with 'date' property
      chatsWithDate.sort((chatA, chatB) => {
        const dateA = chatA.date.seconds + chatA.date.nanoseconds / 1e9;
        const dateB = chatB.date.seconds + chatB.date.nanoseconds / 1e9;
        return dateB - dateA;
      });

      // Set the sorted userChatsList, considering chatsWithoutDate
      setUserChatsList([...chatsWithoutDate, ...chatsWithDate]);
    };

    fetchData();
  }, [userChats]);


  return (
    <div className="chatlist">
      <List
        header={<span style={{ fontSize: '1.5em', fontFamily: 'Roboto' }}>Hoşgeldin, {user?.displayName}</span>}>
        {userChatsList.map((chat, index) => {
          const displayName = chat.userInfo?.displayName ? chat.userInfo.displayName : ""
          const lastMessage = chat.lastMessage
          // console.log(lastMessage)
          return (
            <List.Item key={index} className="chatlist-item">
              <List.Item.Meta
                avatar={<Avatar src={`https://api.dicebear.com/7.x/icons/svg?seed=${displayName}`} />}
                onClick={() => handleSelect(chat)}
                title={<span>{displayName}</span>}
                description={<>{lastMessage}</>}
              />
            </List.Item>
          )
        }
        )}
      </List>
    </div>

  );
};

export default ChatList;