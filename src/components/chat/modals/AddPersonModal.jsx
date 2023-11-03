import React, { useState } from 'react'
import { InputGroup, ListGroup, Modal } from "react-bootstrap";
import { AiOutlineUserAdd } from "react-icons/ai";
import Form from "react-bootstrap/Form";
import { hash } from '../../../hashing';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { getUserChats } from '../../../actions/chatAction';
import { Button, FloatButton, message } from "antd";
import { style } from "redux-logger/src/diff";
import { UsergroupAddOutlined } from "@ant-design/icons";
const AddPersonModal = () => {
  const [show, setShow] = useState(false);
  const handleClose = () => {
    setSelectedUsers([]);
    setShow(false);
  };
  const handleShow = () => setShow(true);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [err, setErr] = useState(false);
  const [chatName, setChatName] = useState("");

  const currentUser = useSelector(state => state.auth.user)
  const dispatch = useDispatch()
  const handleSearch = async () => {
    try {
      const res = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/getUserWithDisplayName/${username}`)
      setUser(res.data.data);
    } catch (err) {
      setErr(true);
    }
  };

  const handleKey = (e) => {
    e.code === "Enter" && handleSearch();
  };
  const [selectedUsers, setSelectedUsers] = useState([]);

  const handleSelect = async () => {
    const newUserListItem = (
      <ListGroup.Item variant="danger" key={user.uid}>
        {user.displayName}
      </ListGroup.Item>
    );


    const isUserSelected = selectedUsers.some((selectedUser) => selectedUser.key === newUserListItem.key);
    if (user.displayName === currentUser.displayName) {
      console.log("Kendini seçemezsin.")
      message.warning('Kendini seçemezsin.')
    } else if (!isUserSelected) {
      setSelectedUsers([...selectedUsers, newUserListItem]);
    } else {
      console.log("Bu kullanıcı zaten seçildi.");
      message.warning('Bu kullanıcı zaten seçildi.')
    }
  };
  const handleRemoveUser = (indexToRemove) => {
    const updatedSelectedUsers = selectedUsers.filter((userItem, index) => index !== indexToRemove);
    setSelectedUsers(updatedSelectedUsers);
  };



  const createGroupChat = async () => {
    // console.log(selectedUsers)
    let idList = [currentUser.uid]
    selectedUsers.map((user) =>
      idList.push(user.key)
    )

    const combinedId = hash(chatName)
    try {
      const res = await axios.get(`http://${process.env.REACT_APP_API_URL}:3001/chats/${combinedId}`)
      if (!res.data.messageExists) {
        try {
          const response = axios.post(`http://${process.env.REACT_APP_API_URL}:3001/createChat`, { combinedId })
          if (response.status === 200) {
            console.log("chat created")
          }
        } catch (error) {
          console.log(error)
        }
        //create user chats
        try {
          // const res = axios.post(`http://${process.env.REACT_APP_API_URL}:3001/setUserChat`, { currentUserId: currentUser.uid, selectedUsers: selectedUsers })
          // if (res.status === 200) {
          const res = axios.post(`http://${process.env.REACT_APP_API_URL}:3001/createUserChat`, { combinedId: combinedId, currentUserId: currentUser.uid, selectedUsers: selectedUsers, chatName: chatName, userIdList: idList })
          if (res.status === 200) { console.log("userChat created") }
          // }
        } catch (error) {
          console.log(error)
        }

      }



    } catch (err) { }
    handleClose()
    dispatch(getUserChats(currentUser.uid))
  }
  // console.log(selectedUsers)
  return (
    <div >
      <FloatButton icon={<UsergroupAddOutlined />} onClick={handleShow}><AiOutlineUserAdd /></FloatButton>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton className="groupmodal">
          <Modal.Title>Create Group Chat</Modal.Title>
        </Modal.Header>
        <Modal.Body className="groupmodal">
          <InputGroup className="mb-3 group-input">
            <Form.Control
              placeholder="Group Name"
              aria-label="Group Name"
              aria-describedby="basic-addon1"
              onChange={(e) => setChatName(e.target.value)}
              value={chatName}
            />
          </InputGroup>
          <InputGroup className="mb-3 group-input">
            <InputGroup.Text id="basic-addon1" >@</InputGroup.Text>
            <Form.Control
              onKeyDown={handleKey}
              onChange={(e) => setUsername(e.target.value)}
              value={username}
              placeholder="Username"
              aria-label="Username"
              aria-describedby="basic-addon1"
            />
          </InputGroup>
          {err && <span>User not found!</span>}
          {user && (
            <ListGroup className="group-userlist" >
              <ListGroup.Item onClick={handleSelect}>{user.displayName}</ListGroup.Item>
            </ListGroup>
          )}
          Selected:
          <ListGroup className="group-userlist selected">
            {selectedUsers.map((userItem, index) => (
              <div key={userItem.key} onClick={() => handleRemoveUser(index)}>
                {userItem}
              </div>
            ))}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer className="groupmodal">
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={createGroupChat}>
            Create
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default AddPersonModal;