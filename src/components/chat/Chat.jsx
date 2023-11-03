import Messages from "./Messages";
import Input from "./Input";
import { Col } from "react-bootstrap";
import Chatbar from "./Chatbar";
import SidebarOff from "../sidebar/SidebarOff";
import Navbar from "../sidebar/Navbar";
import ChatList from "../sidebar/ChatList";
import { useSelector } from "react-redux";
import {Empty, FloatButton, Space, Layout} from "antd";
import AddPersonModal from '../chat/modals/AddPersonModal';
import VoiceModal from '../chat/modals/VoiceModal';
import Logo from '../../img/kafkas-light.svg';

const { Content, Sider } = Layout;

const Chat = () => {
  const chat = useSelector(state => state.chat.chatInfo.uid)
  console.log(chat)
  return (
        <><Sider
            width='25%'
            breakpoint="lg"
            collapsedWidth="0"
            trigger={null}
        >
          <div className="sidebar">
            <Navbar />
            <ChatList/>
          </div>
        </Sider>
    {chat
      ? (
        <Content>
        <div
        className="chat">
          <Chatbar />
          <Messages />
          <Input />
            <FloatButton.Group>
                <Space direction="vertical">
                    <VoiceModal />
                    <AddPersonModal />
                </Space>
            </FloatButton.Group>
        </div> </Content>
      )
      : (<><Empty className="d-none d-lg-block"
            image={Logo}
            />
        <Col className={"d-lg-none d-sm-block d-md-block"}><Navbar></Navbar><SidebarOff/></Col></>)}
  </>);

};

export default Chat;