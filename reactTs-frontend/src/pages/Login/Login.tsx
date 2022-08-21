import axios from "axios";
import qs from "qs";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Form, Input, message } from "antd";
import React, { useEffect } from "react";
import "./login.css";
import { useNavigate } from "react-router-dom";

interface formFields {
  password: string;
  username: string;
}

const Login: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const ok = localStorage.getItem("login");
    if (ok === "isOk") {
      message.error("已经登陆过");
      return navigate("/", { replace: true });
    }
  });
  // console.log(localStorage.getItem("login"));
  const onFinish = (values: formFields) => {
    // console.log("Received values of form: ", values);
    axios
      .post(
        "/api/login",
        qs.stringify({
          password: values.password,
          username: values.username,
        })
      )
      .then(function (res) {
        if (res.data.data) {
          localStorage.setItem("login", "isOk");
          navigate("/", { replace: true });
        } else {
          message.error(res.data.errMsg);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  return (
    <div className="login-page">
      <Form
        name="normal_login"
        className="login-form"
        // initialValues={{ remember: false }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Please input your Username!" }]}
        >
          <Input
            prefix={<UserOutlined className="site-form-item-icon" />}
            placeholder="Username"
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          {/* <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item> */}

          <a className="login-form-forgot" href="">
            Forgot password
          </a>
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <a href="">register now!</a>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Login;
