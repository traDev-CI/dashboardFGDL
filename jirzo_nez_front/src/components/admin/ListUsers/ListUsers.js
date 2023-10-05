import React, { useState } from "react";
import { Switch, Button, Tooltip } from "antd";
import { UserAddOutlined } from "@ant-design/icons";
import Modal from "../../Modal";
import AddUserForm from "./AddUserForm/index";

import "./ListUsers.scss";
import ActiveUsers from "./ActiveUsers/ActiveUsers";
import UserInactive from "./InactiveUser/UserInactive";

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
        <ActiveUsers
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

export default ListUsers;
