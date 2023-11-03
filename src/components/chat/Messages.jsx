import React, { useRef, useState, useEffect } from "react";
import Message from "./Message";
import moment from 'moment';
import { useSelector } from "react-redux";
import { motion } from "framer-motion"
import { AudioOutlined } from "@ant-design/icons";
import { AntDesignOutlined, UserOutlined, SettingOutlined, EditOutlined, EllipsisOutlined } from '@ant-design/icons';
import { Avatar, Divider, Tooltip, Button, Space, Modal, Card, Skeleton } from "antd";
import { socket } from "../../helpers/setSocket";
import { useDispatch } from "react-redux";
import { getUserChats, getChatMessages } from "../../actions/chatAction";
const { Meta } = Card;

const Messages = () => {
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const info = () => {
    Modal.info({
      title: 'Profile',
      content: (
        <Card
          style={{
            width: 300,
            marginTop: 16,
          }}
          actions={[
            <SettingOutlined key="setting" />,
            <EditOutlined key="edit" />,
            <EllipsisOutlined key="ellipsis" />,
          ]}
        >
          <Skeleton avatar active>
            <Meta
              avatar={<Avatar src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />}
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      ),
      onOk() { },
    });
  };
  const constraintsRef = useRef(null);
  const userId = useSelector(state => state.auth.user.uid);
  const messages = useSelector(state => state.chat.chatMessages);
  const chatId = useSelector(state => state.chat.chatInfo.uid);

  useEffect(() => {
    const handleDeneme = (data) => {
      console.log("user chat'e girdi", data.userId);
    };

    const messageResponse = (data) => {
      // Handle other socket event
      dispatch(getUserChats(userId))
      dispatch(getChatMessages(data.chatId));
    };

    socket.on('enteredTheChatResponse', handleDeneme);
    socket.on('messageResponse', messageResponse);

    return () => {
      // Clean up event listeners when the component unmounts
      socket.off('enteredTheChatResponse', handleDeneme);
      socket.off('messageResponse', messageResponse);
    };
  }, [socket]); // Dependency array contains only 'socket'

  // Calculate the initial Y position based on the screen height
  // const initialY = window.innerHeight - 160;

  return (
    <div>
      <motion.div className="voicecon messages" ref={constraintsRef}>
        <motion.div
          className="voiceitems"
          drag whileDrag={{ scale: 1.1 }}
          dragConstraints={constraintsRef}
          dragTransition={{ bounceStiffness: 600, bounceDamping: 20 }}
          // initial={{ y: initialY }}
        >
          <Space className="voiceitem" align="center" direction="horizontal">
            <Avatar.Group>
              <Avatar onClick={info} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=1" />
              <Avatar style={{ backgroundColor: '#f56a00' }} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=2" />,
              <Tooltip title="Ant User" placement="top">
                <Avatar style={{ backgroundColor: '#87d068' }} icon={<UserOutlined />} />
              </Tooltip>
              <Avatar style={{ backgroundColor: '#1677ff' }} src="https://xsgames.co/randomusers/avatar.php?g=pixel&key=3" />
            </Avatar.Group>
            <Divider />
            <span style={{ whiteSpace: 'nowrap' }}>chat adı</span>
            <Button danger type="text" shape="circle" icon={<AudioOutlined />} />
          </Space>
        </motion.div>
        {messages.map((message, index) => (
          <React.Fragment key={message.id}>
            {index > 0 && messages[index].date.seconds - messages[index - 1].date.seconds > 900 && <Divider plain>{moment(message.date.seconds, 'X').format('DD MMMM YYYY, HH:mm:ss')}</Divider>}
            <Message message={message} messageId={message.id} chatId={chatId} />
              {console.log(messages[index].date.seconds)}
          </React.Fragment>
        ))}
        <Modal title="Profile" icon={<UserOutlined />} visible={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
          <p>nick</p>
          <p>job</p>
          <p>role</p>
        </Modal>
      </motion.div>
    </div>
  );
};

export default Messages;
