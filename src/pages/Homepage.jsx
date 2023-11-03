import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {Button, ConfigProvider, Layout, Space, theme} from 'antd';
import { useSelector } from 'react-redux';
import Logo from '../img/kafkas-light.svg'
import Title from "antd/lib/typography/Title";
import Content0 from "../components/homepage/Content0";
import {MdSpaceDashboard} from "react-icons/md";

const { Header, Footer, Content } = Layout;
const Home = () => {
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
                        siderBg: "#2E3038",
                    },
                },

                // 2. Combine dark algorithm and compact algorithm
                // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
            }}>
            <Layout>
                <Header>
                    <Space align="center">
                        <img alt="logo" src={Logo} style={{height: 15,}}/> KAFKAS INDUSTRIES
                        <Button className="temporal" href="/chat" icon={<MdSpaceDashboard/>}>
                            Chat
                        </Button>

                    </Space>
                </Header>
                <Content style={{height: '100vh'}}>
                    <Content0/>
                    <Title style={{color:'white'}}>The homepage is under construction. </Title>
                </Content>
                <Footer style={{alignItems: 'center'}}>
                    <div>
                        <img alt="logo" src={Logo} style={{height: 15,}}/> KAFKAS INDUSTRIES.<br/>All rights are reserved.
                    </div>
                </Footer>
            </Layout>
        </ConfigProvider>
    )

}

export default Home