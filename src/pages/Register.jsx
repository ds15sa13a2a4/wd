import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style.scss";
import logo from "../img/flag.svg";
import { AiOutlineLogin } from "react-icons/ai";
import axios from "axios";
import { Select, Space, Input, ConfigProvider, theme, Button } from 'antd';

const Register = () => {
  const [err, setErr] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [role, setRole] = useState("user");

  const handleChange = (value) => {
    setRole(value);
  };

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const displayName = e.target[0].value;
    const email = e.target[1].value;
    const password = e.target[2].value;

    try {
      // Create user
      const res = await axios.post(`http://${process.env.REACT_APP_API_URL}:3001/users`, { email, password, displayName, role });

      // Handle the response
      if (res.status === 200) {
        // The form was submitted successfully
        navigate("/login");
      } else {
        // There was an error submitting the form
        console.log("Error submitting form: " + res.statusText);
      }
    } catch (err) {
      setErr(true);
    } finally {
      // Use setTimeout to reset the loading state after 1 second
      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  };

  return (
    <ConfigProvider
      theme={{
        algorithm: theme.darkAlgorithm,
        token: {
          colorPrimary: "#faad14",
          colorInfo: "#faad14",
          colorSuccess: "#5dbe2e",
          colorWarning: "#fadb14",
          colorError: "#e63946",
          colorBgContainer: "transparent",
        },
        components: {
          Popover: {
            titleMinWidth: 0,
          },
          Layout: {
            siderBg: "transparent",
          },
        },
      }}
    >
      <div className="formContainer">
        <div className="login-wrapper">
          <span className="logo"><img src={logo} alt="Logo" /></span>
          <form className="login-form" onSubmit={handleSubmit}>
            <Input required type="text" placeholder="display name" />
            <Input required type="email" placeholder="email" />
            <Input required type="password" placeholder="password" />
            <Space direction="vertical" style={{ width: '100%' }}>
              <Select
                defaultValue="user"
                style={{ width: "100%" }}
                onChange={handleChange}
                options={[
                  { value: 'user', label: 'user' },
                  { value: 'moderator', label: 'moderator' },
                  { value: 'admin', label: 'admin' },
                ]}
              />
            </Space>
            <Button htmlType="submit" loading={loading}>
              Register
            </Button>
            {err && <span>Something went wrong</span>}
          </form>
        </div>
      </div>
    </ConfigProvider>
  );
};

export default Register;
