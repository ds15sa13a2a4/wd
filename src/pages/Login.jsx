import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { AiOutlineLogin } from "react-icons/ai";
import Logo from '../img/kafkas-light.svg'
import Flag from '../img/flag.svg'
import { Space, Input, ConfigProvider, theme } from 'antd'
import { login } from "../actions/authAction";
import { useDispatch } from 'react-redux';
import { Cookies } from 'react-cookie';


// import { TokenContext } from "../context/TokenContext";
const Login = () => {
  const [err, setErr] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target[0].value;
    const password = e.target[1].value;
    try {
      dispatch(login(email, password));
      // console.log("deneme")
      navigate("/chat")
    } catch (err) {
      setErr(true);
    }
  };
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
            List:{
              borderRadiusLG: 10,
            }
          },

          // 2. Combine dark algorithm and compact algorithm
          // algorithm: [theme.darkAlgorithm, theme.compactAlgorithm],
        }}>
      <div className="formContainer">
        <Space direction="vertical">
          <span className="logo flag"><img src={Flag} alt="Logo" /></span>
          <div className="login-wrapper">
            <span className="logo"><img src={Logo} alt="Logo" /></span>
            <form className="login-form" onSubmit={handleSubmit}>
              <Input type="email" placeholder="email" />
              <Input type="password" placeholder="password" />
              <button className="btn-signIn"><AiOutlineLogin /></button>
              {err && <span>Something went wrong</span>}
            </form>
          </div>
        </Space>
      </div>
      </ConfigProvider>
  );
};

export default Login;