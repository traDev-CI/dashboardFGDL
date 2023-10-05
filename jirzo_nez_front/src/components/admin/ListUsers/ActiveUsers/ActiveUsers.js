import React from "react";
import EditUserForm from "../../Forms/Edituserform/EditUserForm";
import { List } from "antd";
import UniqueUser from "../UniqueUser/UniqueUser";

const ActiveUsers = ({
  usersActive,
  setTitle,
  setModalContent,
  setIsVisible,
  setReloadUsers,
}) => {
  console.log("DATA: ", usersActive);
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

export default ActiveUsers;
