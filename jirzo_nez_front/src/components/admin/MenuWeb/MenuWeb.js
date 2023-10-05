import React, { useState } from "react";
import { Switch, Button, Tooltip } from "antd";
import "./Menu.scss";
import { FileAddOutlined } from "@ant-design/icons";

const MenuWeb = () => {
  const [viewUsersActive, setViewUsersActive] = useState(true);

  return (
    <>
      <div className="menu-page">
        <div className="menu-page__header">
          <div className="menu-page__switch">
            <Switch
              defaultChecked
              checkedChildren="Menus activos"
              unCheckedChildren="Menus Inactivos"
              onChange={() => setViewUsersActive(!viewUsersActive)}
            />
          </div>
          <Tooltip title="Nuevo menu">
            <Button type="primary" shape="circle">
              <FileAddOutlined />
            </Button>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default MenuWeb;
