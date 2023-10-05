import React, { useEffect, useState } from 'react'
import { activeUserAPi, deletedUserApi, getAvatarApi } from '../../../../api/user';
import { getAccesToken } from '../../../../api/auth';
import { Avatar, Button, List, Tooltip, Modal as Confirmation, notification, } from 'antd';
import { CheckOutlined, DeleteOutlined } from '@ant-design/icons';
import NoAvatar from "../../../../assets/img/no-avatar.png";

const { confirm } = Confirmation;

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
}

export default UniqueInactiveUser