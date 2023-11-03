import React, { useEffect, useRef } from "react";
import { decrypt } from "../../hashing";
import moment from 'moment';
import 'moment/locale/tr'
import { useDispatch, useSelector } from "react-redux";
import { Comment } from "@ant-design/compatible";
import { Avatar, Divider, Dropdown, Popover, Space } from "antd";
import { FaGear, FaKey } from "react-icons/fa6";
import { DeleteOutlined } from "@ant-design/icons";
import { GiThorHammer, GiWingfoot } from "react-icons/gi";
import { BsReplyFill } from "react-icons/bs";
import axios from "axios";
import { getUserChats, getChatMessages } from "../../actions/chatAction";
moment.locale('tr');
const Message = ({ message, messageId, chatId }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)
  const ref = useRef();
  const text = decrypt(message.text)
  const username = message.displayName

  const onClick = async ({ key }) => {
    switch (parseInt(key, 10)) {
      case 1: console.log("yanıtla"); break;
      case 2:
        await axios({
          method: 'delete',
          url: `http://${process.env.REACT_APP_API_URL}:3001/message`,
          data: {
            messageId: messageId,
            chatId: chatId,
          },
        })
        dispatch(getUserChats(user.uid))
        dispatch(getChatMessages(chatId));
        break;
      case 3: console.log("chatten cıkar"); break;
      case 4: console.log("ban"); break;
      default:
        break;
    }
  }


  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);
  const items = [
    {
      label: 'yanıtla',
      key: '1',
      icon: <BsReplyFill />
    },
    {
      label: 'mesajı sil',
      key: '2',
      icon: <DeleteOutlined />,
      danger: true,
      // onClick: axios.delete(`http://${process.env.REACT_APP_API_URL}:3001/message/${user.uid}`)
    },
    {
      label: `${username}'i chatten çıkar`,
      key: '3',
      icon: <GiWingfoot style={{ color: "#ff5555" }} />,
      danger: true
    },
    {
      label: `ban ${username}`,
      key: '4',
      icon: <GiThorHammer style={{ color: "#ff5555" }} />,
      danger: true
    },
  ];
  return (

    <Dropdown
      ref={ref}
      className={`message ${message.senderId === user.userId ? "owner" : "side"}`}
      menu={{
        items,
        onClick
      }}
      dropdownRender={(menu) => (
        <div

          className="ant-dropdown-menu">
          {/* <Space
            style={{
              padding: 8,
            }}

          >
            <span>Seçenekler</span>
          </Space> */}
          {React.cloneElement(menu, {

          })}

        </div>
      )}
      trigger={['contextMenu']}

    >
      <div >
        <Comment
          style={{ width: '100%', background: 'transparent' }}
          avatar={<Avatar size={48} src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${username}`} />}
          author={
            <Popover content={message.role}>
              {username}{'   '}
              {message.role === 'admin' ? (
                <FaKey color='#ff5555' />
              ) : message.role === 'moderator' ? (
                <FaGear color='55ff55' />
              ) : (
                ''
              )
              }{' · '}
            </Popover>
          }
          content={text}
          datetime={moment(message.date.seconds, 'X').format('DD MMMM YYYY, HH:mm:ss')}
        // id={message.date.seconds}
        />

        {message.img && <img src={message.img} alt="" />}
        {/*<Divider*/}
        {/*    style={{*/}
        {/*        margin: 0,*/}
        {/*    }}*/}
        {/*/>*/}
      </div>
    </Dropdown>
  );
};

export default Message;