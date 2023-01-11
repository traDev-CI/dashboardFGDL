import React, { useState } from "react";
import { Form, Input, Button, Checkbox, notification } from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import {
  minLengthValidation,
  emailValidation
} from "../../../utils/formValidation";
import { signUpApi } from "../../../api/user";

import "./ResgiterForm.scss";

const RegisterForm = () => {
  const [formValid, setFormValid] = useState({
    email: false,
    password: false,
    repeatPassword: false,
    privacyPolicy: false
  });
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    repeatPassword: "",
    privacyPolicy: false
  });

  const handleForm = (e) => {
    const { value, checked, name } = e.target;
    if (name === "privacyPolicy") {
      setInputs({
        ...inputs,
        [name]: checked
      });
    } else {
      setInputs({
        ...inputs,
        [name]: value
      });
    }
  };

  const inputValidation = (e) => {
    const { name, value, type } = e.target;
    if (type === "email") {
      setFormValid({
        ...formValid,
        [name]: emailValidation(e.target)
      });
    }
    if (type === "password") {
      setFormValid({
        ...formValid,
        [name]: minLengthValidation(e.target, 8)
      });
    }
    if (type === "checkbox") {
      setFormValid({
        ...formValid,
        [name]: e.target.checked
      });
    }
  };
  const register = async (e) => {
    e.preventDefault();
    const emailValid = inputs.email;
    const passwordValid = inputs.password;
    const repeatPasswordValid = inputs.repeatPassword;
    const privacyPolicyValid = inputs.privacyPolicy;

    if (
      !emailValid ||
      !passwordValid ||
      !repeatPasswordValid ||
      !privacyPolicyValid
    ) {
      notification["error"]({
        message: "All inputs are required"
      });
    } else {
      if (passwordValid !== repeatPasswordValid) {
        notification["error"]({
          message: "Passwords must be equals"
        });
      } else {
        const result = await signUpApi(inputs);
        if (!result.ok) {
          notification["error"]({ message: result.message });
        } else {
          notification["success"]({
            message: result.message
          });
          resetForm();
        }
      }
    }
  };

  const resetForm = () => {
    const input = document.getElementsByTagName("input");
    for (let i = 0; i < input.length; i++) {
      input[i].classList.remove("success");
      input[i].classList.remove("error");
    }
    setInputs({
      email: "",
      password: "",
      repeatPassword: "",
      privacyPolicy: false
    });

    setFormValid({
      email: false,
      password: false,
      repeatPassword: false,
      privacyPolicy: false
    });
  };

  return (
    <>
      <Form className="register-form" onChange={handleForm}>
        <Form.Item>
          <Input
            prefix={
              <MailOutlined
                style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
              />
            }
            type="email"
            name="email"
            placeholder="Email"
            className="register-form_input"
            onChange={inputValidation}
            value={inputs.email}
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
            className="register-form_input"
            onChange={inputValidation}
            value={inputs.password}
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
            name="repeatPassword"
            placeholder="Repeat Password"
            className="register-form_input"
            onChange={inputValidation}
            value={inputs.repeatPassword}
          />
        </Form.Item>
        <Form.Item>
          <Checkbox
            name="privacyPolicy"
            onChange={inputValidation}
            checked={inputs.privacyPolicy}
          >
            I have read the privacy policy
          </Checkbox>
        </Form.Item>
        <Form.Item>
          <Button
            htmlType="submit"
            className="register-form__button"
            onClick={register}
          >
            Create Account
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default RegisterForm;
