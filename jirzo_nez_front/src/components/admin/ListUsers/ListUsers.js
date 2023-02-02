import React, { useEffect, useState } from "react";
import {
  List,
  Switch,
  Avatar,
  Button,
  Tooltip,
  notification,
  Modal as Confirmation
} from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import NoAvatar from "../../../assets/img/no-avatar.png";
import Modal from "../../Modal";
import EditUserForm from "../Forms/Edituserform/EditUserForm";
import { getAvatarApi, activeUserAPi, deletedUserApi } from "../../../api/user";
import { getAccesToken } from "../../../api/auth";
import AddUserForm from "./AddUserForm/index";

import "./ListUsers.scss";

const { confirm } = Confirmation;

const ListUsers = ({ usersActive, usersInactive, setReloadUsers }) => {
  const [viewUsersActive, setViewUsersActive] = useState(true);
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);

  const addUserModel = () => {
    setIsVisible(true);
    setTitle("New User");
    setModalContent(
      <AddUserForm
        setIsVisible={setIsVisible}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  return (
    <div className="list-users">
      
      <div className="list-users__header">
        <div className="list-users__header-switch">
          <Switch
            defaultChecked
            checkedChildren="Active users"
            unCheckedChildren="Inactive users"
            onChange={() => setViewUsersActive(!viewUsersActive)}
          />
        </div>
        <Tooltip title="New user">
          <Button type="primary" shape="circle" onClick={addUserModel}>
            <UserAddOutlined />
          </Button>
        </Tooltip>
      </div>

      {viewUsersActive ? (
        <UserActive
          usersActive={usersActive}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setTitle={setTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      ) : (
        <UserInactive
          usersInactive={usersInactive}
          setIsVisible={setIsVisible}
          isVisible={isVisible}
          setTitle={setTitle}
          setModalContent={setModalContent}
          setReloadUsers={setReloadUsers}
        />
      )}
      <Modal title={title} isVisible={isVisible} setIsVisible={setIsVisible}>
        {modalContent}
      </Modal>
    </div>
  );
};

const UserActive = ({
  usersActive,
  setTitle,
  setModalContent,
  setIsVisible,
  setReloadUsers,
  isVisible
}) => {
  const editUser = (user) => {
    setIsVisible(true);
    setTitle(
      `Edit ${user.name ? user.name : ""} ${user.lastname ? user.lastname : ""}`
    );
    setModalContent(
      <EditUserForm
        user={user}
        setIsVisible={setIsVisible}
        setReloadUsers={setReloadUsers}
      />
    );
  };

  const blockUser = (user) => {
    setIsVisible(true);
    setTitle(`Blocking ${user.name}, ${user.lastname}`);
    setModalContent("Blocking user");
  };

  const deleteUser = (user) => {
    setIsVisible(true);
    setTitle(`Deleting ${user.name}, ${user.lastname}`);
    setModalContent("Deleting user");
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersActive}
      renderItem={(user) => (
        <UniqueUser
          user={user}
          editUser={editUser}
          deleteUser={deleteUser}
          blockUser={blockUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
};

const UniqueUser = ({ user, editUser, deleteUser, setReloadUsers }) => {
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactiveUser = () => {
    const accessToken = getAccesToken();
    activeUserAPi(accessToken, user._id, false)
      .then((response) => {
        notification["success"]({
          message: response.message
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err
        });
      });
  };

  const showDeleteConfir = () => {
    const accessToken = getAccesToken();
    confirm({
      title: "Deleting user",
      content: `Are you sure that you want to delete ${user.email}`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deletedUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response.message
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err
            });
          });
      }
    });
  };

  return (
    <List.Item
      actions={[
        <Tooltip title="Edit">
          <Button type="primary" shape="circle" onClick={() => editUser(user)}>
            <EditOutlined />
          </Button>
        </Tooltip>,
        <Tooltip title="Block user">
          <Button type="danger" shape="circle" onClick={desactiveUser}>
            <StopOutlined />
          </Button>
        </Tooltip>,
        <Tooltip title="Delete">
          <Button type="danger" shape="circle" onClick={showDeleteConfir}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={avatar ? avatar : NoAvatar} />}
        title={`${user.name ? user.name : ""} ${
          user.lastname ? user.lastname : ""
        }`}
        description={user.email}
      />
    </List.Item>
  );
};

const UserInactive = ({
  usersInactive,
  setTitle,
  setModalContent,
  setIsVisible,
  setReloadUsers
}) => {
  const ativeUser = (user) => {
    setIsVisible(true);
    setTitle(`Blocking ${user.name}, ${user.lastname}`);
    setModalContent("Blocking user");
  };

  const deleteUser = (user) => {
    setIsVisible(true);
    setTitle(`Deleting ${user.name}, ${user.lastname}`);
    setModalContent("Deleting user");
  };

  return (
    <List
      className="users-active"
      itemLayout="horizontal"
      dataSource={usersInactive}
      renderItem={(user) => (
        <UniqueInactiveUser
          user={user}
          deleteUser={deleteUser}
          ativeUser={ativeUser}
          setReloadUsers={setReloadUsers}
        />
      )}
    />
  );
};

const UniqueInactiveUser = ({ user, deleteUser, setReloadUsers }) => {
  const [avatar, setAvatar] = useState(null);
  useEffect(() => {
    if (user.avatar) {
      getAvatarApi(user.avatar).then((response) => {
        setAvatar(response);
      });
    } else {
      setAvatar(null);
    }
  }, [user]);

  const desactiveUser = () => {
    const accessToken = getAccesToken();
    activeUserAPi(accessToken, user._id, true)
      .then((response) => {
        notification["success"]({
          message: response.message
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err
        });
      });
  };

  const showDeleteConfir = () => {
    const accessToken = getAccesToken();
    confirm({
      title: "Deleting user",
      content: `Are you sure that you want to delete ${user.email}`,
      okText: "Delete",
      okType: "danger",
      cancelText: "Cancel",
      onOk() {
        deletedUserApi(accessToken, user._id)
          .then((response) => {
            notification["success"]({
              message: response.message
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err
            });
          });
      }
    });
  };

  return (
    <List.Item
      actions={[
        <Tooltip title="Active">
          <Button type="primary" shape="circle" onClick={desactiveUser}>
            <CheckOutlined />
          </Button>
        </Tooltip>,
        <Tooltip title="Delete">
          <Button type="danger" shape="circle" onClick={showDeleteConfir}>
            <DeleteOutlined />
          </Button>
        </Tooltip>
      ]}
    >
      <List.Item.Meta
        avatar={<Avatar src={user.avatar ? user.avatar : NoAvatar} />}
        title={`${user.name ? user.name : ""} ${
          user.lastname ? user.lastname : ""
        }`}
        description={user.email}
      />
    </List.Item>
  );
};

export default ListUsers;
