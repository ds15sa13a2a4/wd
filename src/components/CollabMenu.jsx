import React from 'react'
import Sider from 'antd/lib/layout/Sider';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../actions/authAction';
import { Menu, Button } from 'antd';
import  {MessageOutlined, ProjectOutlined, HomeOutlined, FundOutlined, SettingOutlined, LogoutOutlined, UserAddOutlined } from '@ant-design/icons';

const CollabMenu = ({ changeComponent }) => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.auth.user)

  const handleMenuClick = (component) => {
    changeComponent(component);
  };

  return (
    <Sider collapsed className="collabmenu" style={{ display: "flex", flexDirection: "column", justifyContent: "center"}}>
      <Menu 
        inlineCollapsed 
        theme="dark" 
        mode="vertical" 
        style={{ flex: 1, height:"fit-content"}}
        defaultSelectedKeys={['chat']}>
        <Menu.Item key="chat" onClick={() => handleMenuClick('chat')} icon={<MessageOutlined />} />
        <Menu.Item key="workspace" onClick={() => handleMenuClick('workspace')} icon={<ProjectOutlined />} />
      {user.role === 'admin' && (<>
        <Menu.Item key="dashboard" onClick={() => handleMenuClick('dashboard')} icon={<FundOutlined />}/>
        <Button type="text" key="register" className="temporal" block href="/register" icon={<UserAddOutlined />}/>
      </>)}
        <Menu.Item key="settings" icon={<SettingOutlined />} />
        <Menu.Item key="logout" onClick={() => dispatch(logout())} icon={<LogoutOutlined />} />
      </Menu>
    </Sider>
  );
};

export default CollabMenu;
