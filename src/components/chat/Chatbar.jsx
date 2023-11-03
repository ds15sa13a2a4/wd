import React, { useState } from "react";
import { Container, Nav, Navbar, Offcanvas } from "react-bootstrap";
import { FaCamera, FaEllipsis, FaVideo } from "react-icons/fa6";
import SidebarOff from "../sidebar/SidebarOff";
import NavbarOff from "../sidebar/NavbarOff";
import AddPersonModal from "./modals/AddPersonModal";
import { useSelector } from "react-redux";
import {MenuOutlined} from "@ant-design/icons";
import {Button} from "antd";

const Chatbar = () => {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const chat = useSelector(state => state.chat.chatInfo)

    return (
        <Navbar className="chatbar" expand="lg">
            <Container fluid>
                <Button type="text" icon={<MenuOutlined/>} className="d-lg-none" onClick={handleShow}></Button>
                <Offcanvas className="sidebaroff d-lg-none" show={show} onHide={handleClose}>
                    <Offcanvas.Header closeButton><NavbarOff /></Offcanvas.Header>
                    <Offcanvas.Body>
                        <SidebarOff />
                    </Offcanvas.Body>
                </Offcanvas>

                {/* {data.user?.displayName ? <span>{data.user.displayName}</span> : <span>{data.user}</span>} */}

                <span>{chat?.displayName}</span>
                <Nav className="d-none d-lg-flex" style={{ alignItems: 'center' }}>
                    <AddPersonModal />
                    <Nav.Link><FaVideo className="chatbar-btn" /></Nav.Link>
                    <Nav.Link><FaCamera className="chatbar-btn" /></Nav.Link>
                    <Nav.Link><FaEllipsis className="chatbar-btn" /> </Nav.Link>
                    {/* <Nav.Link><VoiceCall /> </Nav.Link> */}
                </Nav>
            </Container>
        </Navbar>
    );

};

export default Chatbar;