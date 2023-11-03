import React from "react";
import ChatList from "./ChatList"
import {Col} from "react-bootstrap";

const Sidebar = () => {
  return (
    <Col className="sidebar sidebaroff d-lg-none">
      <ChatList/>
    </Col>
  );
};

export default Sidebar;