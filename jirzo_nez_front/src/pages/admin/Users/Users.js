import React, { useState, useEffect } from "react";
import { getAccesToken } from "../../../api/auth";
import { getuserActiveApi } from "../../../api/user";
import ListUsers from "../../../components/admin/ListUsers";

import "./Users.scss";

const Users = () => {
  const [usersActive, setUsersActive] = useState([]);
  const [usersInactive, setUsersInactive] = useState([]);
  const [reloadUsers, setReloadUsers] = useState(false);
  const token = getAccesToken();

  useEffect(() => {
    getuserActiveApi(token, true).then((response) => {
      setUsersActive(response.users);
    });

    getuserActiveApi(token, false).then((response) => {
      setUsersInactive(response.users);
    });
    setReloadUsers(false);
  }, [token, reloadUsers]);

  return (
    <div className="users">
      <ListUsers
        usersActive={usersActive}
        usersInactive={usersInactive}
        setReloadUsers={setReloadUsers}
      />
    </div>
  );
};

export default Users;
