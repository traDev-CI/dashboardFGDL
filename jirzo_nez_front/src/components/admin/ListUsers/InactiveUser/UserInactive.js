import { List } from "antd";
import React from "react";
import UniqueInactiveUser from "../UniqueInactiveUser/UniqueInactiveUser";

const UserInactive = ({
  usersInactive,
  setTitle,
  setModalContent,
  setIsVisible,
  setReloadUsers,
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

export default UserInactive;
