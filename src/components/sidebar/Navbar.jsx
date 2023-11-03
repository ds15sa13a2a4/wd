import React from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { logout } from '../../actions/authAction';
import Logo from '../../img/kafkas-light.svg'
import {Button} from "antd";
import {LogoutOutlined} from "@ant-design/icons";

const Navbar = () => {
  const dispatch = useDispatch()
  return (
    <div className='navbar_d'>
      <span className="navbar-logo"><img alt="logo" src={Logo} style={{height: 15,}}/>KAFKAS INDUSTRIES</span>
    </div >
  )
}

export default Navbar