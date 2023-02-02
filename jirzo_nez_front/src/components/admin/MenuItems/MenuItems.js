import {
  ContactsOutlined,
  HomeOutlined,
  MenuOutlined,
  PictureOutlined,
  UserOutlined
} from "@ant-design/icons";
import { Menu } from "antd";
import React from "react";
import { Link, useLocation } from "react-router-dom";

const MenuItems = () => {
  const location = useLocation();
  const currentLocation = location.pathname;
  return (
    <Menu theme="dark" mode="inline" defaultSelectedKeys={[currentLocation]}>
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
      <Menu.Item key="/admin/about">
        <Link to={"/admin/about"}>
          <ContactsOutlined />
          <span className="nav-text">About</span>
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
  );
};

export default MenuItems;
