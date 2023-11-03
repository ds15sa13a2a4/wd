
import "../style.scss";
import Logo from '../img/kafkas-light.svg'
import {ConfigProvider, Layout, Skeleton, theme} from "antd";
import React from "react";
import Sider from "antd/es/layout/Sider";
import {Content} from "antd/es/layout/layout";
function Loading() {

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
              }
            },

            // 2. Combine dark algorithm and compact algorithm
            // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
          }}>
        <Layout>
          <Layout>
            <Sider
                style={{height:'100vh'}}
                height='100%'
                width='20%'
                breakpoint="lg"
                collapsedWidth="0"
                trigger={null}
            >
              <img alt="logo" src={Logo} style={{height: 15,marginTop: 20, marginLeft: 10}}/>
              <Skeleton active/>
              <Skeleton avatar paragraph={{rows:1}} active/>
              <Skeleton avatar paragraph={{rows:1}} active/>
              <Skeleton avatar paragraph={{rows:1}} active/>
              <Skeleton avatar paragraph={{rows:1}} active/>
              <Skeleton avatar paragraph={{rows:1}} active/>
            </Sider>
            <Content style={{height: '100vh', background: 'rgb(51, 53, 62)'}}>
              <Skeleton paragraph={{rows:1}} active/>
              <Skeleton avatar paragraph={{rows:1}} active/>
              <Skeleton avatar paragraph={{rows:8}} active/>
              <Skeleton avatar paragraph={{rows:8}} active/>
              <Skeleton avatar paragraph={{rows:1}} active/>
            </Content>
          </Layout>
        </Layout></ConfigProvider>
  )


}
export default Loading;