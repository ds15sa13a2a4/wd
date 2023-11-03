import React, { useState } from 'react'
import Chat from '../components/chat/Chat'
import Workspace from './Workspace'
import Dashboard from './Dashboard'
import 'bootstrap/dist/css/bootstrap.min.css';
import {ConfigProvider, Layout, theme} from 'antd';
import { useSelector } from 'react-redux';
import CollabMenu from '../components/CollabMenu';

const { Content, Sider } = Layout;
const Home = () => {
  const [activeComponent, setActiveComponent] = useState('chat');

  const changeComponent = (component) => {
    setActiveComponent(component);
  };
  const user = useSelector(state => state.auth.user)
  if (!user) {
    // token'den çek 
  }

  return (
    <ConfigProvider
        theme={{
            // 1. Use dark algorithm
            algorithm: theme.darkAlgorithm,
            token: {
                colorPrimary: "#faad14",
                colorInfo: "#faad14",
                colorSuccess: "#5dbe2e",
                colorWarning: "#fadb14",
                colorError: "#e63946",
                colorBgContainer: "transparent",
            },
            components:{
                Popover:{
                    titleMinWidth: 0,
                },
                Layout:{
                  siderBg: "transparent",
                },
                Menu:{
                  darkItemBg: "transparent",
                }
            },

            // 2. Combine dark algorithm and compact algorithm
            // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}>
      <Layout>
          <CollabMenu changeComponent={changeComponent} />
          {activeComponent === 'chat' && <Chat />}
          {activeComponent === 'workspace' && <Workspace />}
          {activeComponent === 'dashboard' && <Dashboard />}
      </Layout></ConfigProvider>
  )

}

export default Home