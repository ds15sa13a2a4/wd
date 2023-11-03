import React, { useEffect, useState } from "react";
import { decrypt } from "../../hashing";
import { useDispatch, useSelector } from 'react-redux';
import { getChatInfo, getUserChats, getChatMessages, } from "../../actions/chatAction";
import { getLastChatMessage } from "../../services/chatService";
import { socket } from "../../helpers/setSocket";
import Title from "antd/lib/typography/Title";


const WorkList = () => {



  return (
    <div className="chatlist">
      <Title color="white">Workspace</Title>
    </div>

  );
};

export default WorkList;