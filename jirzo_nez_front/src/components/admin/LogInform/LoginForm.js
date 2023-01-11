import React, { useState } from "react";
import { Button, Form, Input, notification } from "antd";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { singInApi } from "../../../api/user";
import { ACCESS_TOKEN, REFRESH_TOKEN } from "../../../utils/constants";

import "./LoginForm.scss";

const LoginForm = () => {
  const [inputs, setInputs] = useState({
    email: "",
    password: ""
  });

  const changeForm = (e) => {
    const { value, name } = e.target;
    setInputs({
      ...inputs,
      [name]: value
    });
  };

  const login = async (e) => {
    e.preventDefault();
    const result = await singInApi(inputs);
    if (result.message) {
      notification["error"]({
        message: result.message
      });
    } else {
      const { accessToken, refreshToken } = result;
      localStorage.setItem(ACCESS_TOKEN, accessToken);
      localStorage.setItem(REFRESH_TOKEN, refreshToken);
      notification["success"]({
        message: "Login successfully"
      });
      window.location.href = "/admin";
    }
  };

  return (
    <>
      <Form className="login-form" onChange={changeForm}>
        <Form.Item>
          <Input
            prefix={
              <UserOutlined
                style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
              />
            }
            type="email"
            name="email"
            placeholder="Email"
            className="login-form__input"
          />
        </Form.Item>
        <Form.Item>
          <Input
            prefix={
              <LockOutlined
                style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
              />
            }
            type="password"
            name="password"
            placeholder="Password"
            className="login-form__input"
          />
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            className="login-form__button"
            onClick={login}
          >
            Log In
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default LoginForm;
