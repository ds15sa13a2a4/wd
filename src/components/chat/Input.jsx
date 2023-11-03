import React, { useState } from "react";
import { encrypt } from "../../hashing";
import { FaPaperPlane } from "react-icons/fa";
import axios from "axios";
import { useSelector } from "react-redux/es/hooks/useSelector";
import { socket } from "../../helpers/setSocket";
import {Space, Button, Input as Entry} from 'antd';
import {FaImage} from "react-icons/fa6";

const { TextArea } = Entry;

const Input = () => {
  const [text, setText] = useState("");
  const [img, setImg] = useState(null);

  const user = useSelector(state => state.auth.user)
  const chat = useSelector(state => state.chat.chatInfo)
  const handleSend = async () => {
    const encryptedText = encrypt(text);
    const input = document.querySelector('input');
    input.disabled = true
    if (img) {
      const res = await axios({
        method: 'post',
        url: `http://${process.env.REACT_APP_API_URL}:3001/uploadMessageWithImage`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        data: {
          chatId: chat.uid,
          currentUserId: user.uid,
          encryptedText: encryptedText,
          displayName: user.displayName,
          img: img,
          role:user.role,
        },
      })

      try {
        if (res.status === 200) {
          console.log("mesaj gönderildi")
        }
      } catch (error) {
        console.log(error)
      }

    } else {
      const res = await axios({
        method: 'post',
        url: `http://${process.env.REACT_APP_API_URL}:3001/uploadMessage`,
        data: {
          chatId: chat.uid,
          currentUserId: user.uid,
          encryptedText: encryptedText,
          displayName: user.displayName,
          role:user.role,
        },
      })

      try {
        if (res.status === 200) {
          console.log("mesaj gönderildi")
        }
      } catch (error) {
        console.log(error)
      }

    }
    try {
      const res = await axios({
        method: 'post',
        url: `http://${process.env.REACT_APP_API_URL}:3001/uploadMessageFunction`,

        data: {
          chatId: chat.uid,
          currentUserId: user.uid,
          encryptedText: encryptedText,
          userIdList: chat.userIdList,
        },
      })
      if (res.status === 200) {
        setText("");
        setImg(null);

      }
      else {
        console.log("olmadı")
      }
    } catch (error) {
    }

    socket.emit('message', {
      chatId: chat.uid,
      socketID: socket.id,
    });


    input.disabled = false
    input.focus()
  };
  return (
      <div className="input">
        <Space.Compact style={{border: '1px solid transparent'}} block>
          <TextArea
              style={{border: 'none'}}
              autoSize
              type="text"
              placeholder="Type something..."
              onChange={(e) => setText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault(); // Prevent the default behavior of Enter key
                  handleSend();
                }
              }}
              value={text}/>
          <Button type="text" onClick={() => document.getElementById('file').click()}>
            <input
                type="file"
                style={{ display: "none" }}
                id="file"
                onChange={(e) => setImg(e.target.files[0])}
            />
            <FaImage/>
          </Button>
        </Space.Compact>
          {/* <Button shape="circle" onClick={handleSend}><FaPaperPlane/></Button> */}
      </div>
  );
};

export default Input;