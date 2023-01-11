import React, { useState } from "react";
import { Form, Input, Select, Button, Row, Col, notification } from "antd";
import { signUpAdminApi } from "../../../../api/user";
import { getAccesToken } from "../../../../api/auth";

import "./AddUserForm.scss";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

const AddUserForm = ({ setIsVisible, setReloadUsers }) => {
  const [userData, setUserData] = useState({});

  const addUser = (e) => {
    e.preventDefault();
    if (
      !userData.name ||
      !userData.lastname ||
      !userData.role ||
      !userData.email ||
      !userData.password ||
      !userData.repeatPassword
    ) {
      notification["error"]({
        message: "All fields are required"
      });
    } else if (userData.password !== userData.repeatPassword) {
      notification["error"]({
        message: "The password must be the same"
      });
    } else {
      const accestoken = getAccesToken();
      signUpAdminApi(accestoken, userData)
        .then((response) => {
          notification["success"]({
            message: response
          });
          setIsVisible(false);
          setReloadUsers(true);
          setUserData({});
        })
        .catch((err) => {
          notification["error"]({
            message: err
          });
        });
    }
  };
  return (
    <div className="add-user-form">
      <AddForm
        userData={userData}
        setUserData={setUserData}
        addUser={addUser}
      />
    </div>
  );
};

const AddForm = ({ userData, setUserData, addUser }) => {
  const { Option } = Select;
  const handelForm = (e) => {
    const { name, value, type } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  return (
    <Form className="form-add">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Name"
              name="name"
              value={userData.name}
              onChange={handelForm}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Last Name"
              name="lastname"
              value={userData.lastname}
              onChange={handelForm}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Email"
              name="email"
              value={userData.email}
              onChange={handelForm}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Select
              placeholder="Select a rol"
              onChange={(e) => setUserData({ ...userData, role: e })}
              value={userData.role}
            >
              <Option value="admin">Admin</Option>
              <Option value="editor">Editor</Option>
              <Option value="redit">Reviewer</Option>
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Password"
              name="password"
              type="password"
              value={userData.password}
              onChange={handelForm}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={<LockOutlined />}
              placeholder="Repeat password"
              name="repeatPassword"
              type="password"
              value={userData.repeatPassword}
              onChange={handelForm}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" className="btn-submit" onClick={addUser}>
          Create user
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddUserForm;
