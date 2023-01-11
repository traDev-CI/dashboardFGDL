import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  notification
} from "antd";
import { useDropzone } from "react-dropzone";
import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi
} from "../../../../api/user";
import { getAccesToken } from "../../../../api/auth";
import NoAvatar from "../../../../assets/img/no-avatar.png";

import "./EditUserForm.scss";
import { UserOutlined } from "@ant-design/icons";

const UploadAvatar = ({ avatar, setAvatar }) => {
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    if (avatar) {
      if (avatar.preview) {
        setAvatarUrl(avatar.preview);
      } else {
        setAvatarUrl(avatar);
      }
    } else {
      setAvatarUrl(null);
    }
  }, [avatar]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setAvatar({ file, preview: URL.createObjectURL(file) });
    },
    [setAvatar]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpg, image/png, image/jpeg",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="upload-avatar" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <Avatar size={150} src={NoAvatar} />
      ) : (
        <Avatar size={150} src={avatarUrl ? avatarUrl : NoAvatar} />
      )}
    </div>
  );
};

const EditForm = ({ user, userData, setUserData, updateUser }) => {
  const { Option } = Select;

  const handleForm = (e) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value
    });
  };

  const handleFormSelect = (e) => {
    setUserData({
      ...userData,
      role: e
    });
  };

  return (
    <Form className="form-edit">
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={
                <UserOutlined
                  style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
                />
              }
              type="name"
              name="name"
              placeholder="Name"
              className="register-form_input"
              value={userData.name}
              onChange={handleForm}
              // value={inputs.email}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={
                <UserOutlined
                  style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
                />
              }
              type="lastname"
              name="lastname"
              placeholder="Last name"
              className="register-form_input"
              value={userData.lastname}
              onChange={handleForm}
              // value={inputs.email}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
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
              className="register-form_input"
              value={userData.email}
              onChange={handleForm}
              // value={inputs.email}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Select
            placeholder="Select a rol user"
            value={userData.role}
            onChange={handleFormSelect}
          >
            <Option value="admin">Admin</Option>
            <Option value="edit">Edit</Option>
            <Option value="read">Read</Option>
          </Select>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={
                <UserOutlined
                  style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
                />
              }
              type="password"
              name="password"
              placeholder="Password"
              className="register-form_input"
              onChange={handleForm}
              // value={inputs.email}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item>
            <Input
              prefix={
                <UserOutlined
                  style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
                />
              }
              type="password"
              name="repeatPassword"
              placeholder="Repeat password"
              className="register-form_input"
              onChange={handleForm}
              // value={inputs.email}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          className="btn-submit"
          onClick={updateUser}
        >
          Edit user
        </Button>
      </Form.Item>
    </Form>
  );
};

const EditUserForm = ({ user, setIsVisible, setReloadUsers }) => {
  const [avatar, setAvatar] = useState(null);
  const [userData, setUserData] = useState({});

  const updateUser = (e) => {
    e.preventDefault();
    const token = getAccesToken();
    let userUpdate = userData;

    if (userUpdate.password || userUpdate.repeatPassword) {
      if (userUpdate.password !== userUpdate.repeatPassword) {
        notification["error"]({
          message: "The passwords muts be equals"
        });
        return;
      } else {
        delete userData.repeatPassword;
      }
    }

    if (!userUpdate.name || !userUpdate.lastname || !userUpdate.email) {
      notification["error"]({
        message: "Name, password and email are required"
      });
      return;
    }

    if (typeof userUpdate.avatar === "object") {
      uploadAvatarApi(token, userUpdate.avatar, user._id).then((response) => {
        userUpdate.avatar = response.avatarName;
        updateUserApi(token, userUpdate, user._id).then((result) => {
          notification["success"]({
            message: result.message
          });
          setIsVisible(false);
          setReloadUsers(true);
        });
      });
    } else {
      updateUserApi(token, userUpdate, user._id).then((result) => {
        notification["success"]({
          message: result.message
        });
        setIsVisible(false);
        setReloadUsers(true);
      });
    }
  };

  useEffect(() => {
    setUserData({
      name: user.name,
      lastname: user.lastname,
      password: user.password,
      repeatPassword: user.repeatPassword,
      email: user.email,
      role: user.role,
      avatar: user.avatar
    });
  }, [user]);

  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  useEffect(() => {
    if (avatar) {
      setUserData({ ...userData, avatar: avatar.file });
    }
  }, [avatar]);

  console.log("====================================");
  console.log("USERS: ", userData);
  console.log("====================================");

  return (
    <div className="edit-user-form">
      <UploadAvatar avatar={avatar} setAvatar={setAvatar} />
      <EditForm
        user={user}
        userData={userData}
        setUserData={setUserData}
        updateUser={updateUser}
      />
    </div>
  );
};

export default EditUserForm;
