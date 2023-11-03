import React, { useEffect, useState } from "react";
import { decrypt } from "../../hashing";
import { useDispatch, useSelector } from 'react-redux';
import { getChatInfo, getUserChats, getChatMessages, } from "../../actions/chatAction";
import { Avatar, Button, List, message } from 'antd'
import { socket } from "../../helpers/setSocket";
import Title from "antd/lib/typography/Title";


const DashList = () => {



  return (
    <div className="chatlist">
        <Title color="white">Dashboard</Title>
    </div>
  );
};

export default DashList;