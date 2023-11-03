import React, { useState } from 'react';
import {
    MenuFoldOutlined,
    MenuUnfoldOutlined,
    UploadOutlined,
    UserOutlined,
    VideoCameraOutlined,
} from '@ant-design/icons';
import {Layout, Menu, Button, theme, Divider} from 'antd';
import Logo from "../img/kafkas-light.svg";
import Navbar from '../components/sidebar/Navbar';
import Dashlist from '../components/dashboard/DashList'
import {BsChatRightFill} from "react-icons/bs";

const { Header, Sider, Content } = Layout;
const App = () => {
    const [collapsed, setCollapsed] = useState(false);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <>
            <Sider
                width='25%'
                collapsedWidth="0"
            >
                <Navbar/>
                <Dashlist/>
            </Sider>
            <Content></Content>
        </>
    );
};
export default App;