import React, { useEffect, useState } from "react";
import { DeleteOutlined, EditOutlined, StopOutlined } from "@ant-design/icons";
import {
  Button,
  List,
  Tooltip,
  notification,
  Modal as Confirmation,
  Avatar,
} from "antd";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import {
  activeUserAPi,
  deletedUserApi,
  getAvatarApi,
} from "../../../../api/user";
import { getAccesToken } from "../../../../api/auth";

const { confirm } = Confirmation;

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
          message: response.message,
        });
        setReloadUsers(true);
      })
      .catch((err) => {
        notification["error"]({
          message: err,
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
              message: response.message,
            });
            setReloadUsers(true);
          })
          .catch((err) => {
            notification["error"]({
              message: err,
            });
          });
      },
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
        </Tooltip>,
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

export default UniqueUser;
