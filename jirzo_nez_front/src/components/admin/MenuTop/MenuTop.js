import React, { useState } from "react";
import { Button, Drawer, Menu } from "antd";
import {
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PoweroffOutlined,
  MenuOutlined,
  HomeOutlined,
  PictureOutlined,
  ContactsOutlined,
  UserOutlined
} from "@ant-design/icons";
import MenuItems from "../MenuItems/MenuItems";
import { logout } from "../../../api/auth";

import "./MenuTop.scss";
import { Link, useLocation } from "react-router-dom";

const MenuTop = ({ currentLocation }) => {
  const [visible, setVisible] = useState(false);

  const handleCollapseMenu = () => {
    setVisible(true);
  };

  const handledLogOut = () => {
    logout();
    window.location.reload();
  };
  return (
    <>
      <div className="menu-top">
        <div className="menu-top__left">
          <Button type="link" onClick={handleCollapseMenu}>
            <MenuOutlined />
          </Button>
        </div>
        <Drawer
          title="Menu"
          placement="left"
          bodyStyle={{ backgroundColor: "#001529" }}
          onClick={() => setVisible(false)}
          onClose={() => setVisible(false)}
          visible={visible}
        >
          <Menu
            theme="dark"
            mode="inline"
            defaultSelectedKeys={[currentLocation]}
          >
            <Menu.Item key="/admin">
              <Link to={"/admin"}>
                <HomeOutlined />
                <span className="nav-text">Home</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/admin/gallery">
              <Link to={"/admin/gallery"}>
                <PictureOutlined />
                <span className="nav-text">Gallery</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/admin/users">
              <Link to={"/admin/users"}>
                <UserOutlined />
                <span className="nav-text">Users</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/admin/contact">
              <Link to={"/admin/contact"}>
                <ContactsOutlined />
                <span className="nav-text">Contact</span>
              </Link>
            </Menu.Item>
            <Menu.Item key="/admin/menu-web">
              <Link to={"/admin/menu-web"}>
                <MenuOutlined />
                <span className="nav-text">Menu</span>
              </Link>
            </Menu.Item>
          </Menu>
        </Drawer>
        <div className="menu-top__right">
          <Button
            type="link"
            className="menu-top__powerOff"
            onClick={handledLogOut}
          >
            <PoweroffOutlined className="menu-top__right-icon" />
          </Button>
        </div>
      </div>
    </>
  );
};

export default MenuTop;
