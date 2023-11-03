import React, { Component } from 'react'
import { Layout } from 'antd'
import Navbar from '../components/sidebar/Navbar';
import WorkList from '../components/workspace/WorkList';

const { Content, Sider } = Layout;

export class Workspace extends Component {
  render() {
    return (
      <><Sider
          width='25%'
          collapsedWidth="0"
      >
        <div >
          <Navbar />
          <WorkList/>
        </div>
      </Sider>
      <Content></Content>
</>);

  }
}

export default Workspace