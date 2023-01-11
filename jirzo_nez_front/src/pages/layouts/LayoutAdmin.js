import React, { useState } from "react";
import { Layout } from "antd";
import "./scss/LayoutAdmin.scss";
import MenuTop from "../../components/admin/MenuTop";
import MenuSider from "../../components/admin/Menusider/MenuSider";
import SignIn from "../admin/SignIn";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

const LayoutAdmin = ({ children }) => {
  const [menuCollpase, setMenuCollapse] = useState(false);
  const { Header, Content } = Layout;
  const { user, isLoading } = useAuth();
  const location = useLocation();
  const currentLocation = location.pathname;

  if (!user && !isLoading) {
    return (
      <Routes>
        <Route path="/login/main" element={<SignIn />} />
        <Route path="*" element={<Navigate to="/admin/login/main" />} />
      </Routes>
    );
  }
  if (user && !isLoading) {
    return (
      <Layout>
        <MenuSider
          menuCollpase={menuCollpase}
          setMenuCollapse={setMenuCollapse}
          currentLocation={currentLocation}
        />
        <Layout
          className="layout-admin"
          // style={{ marginLeft: menuCollpase ? "0" : "200px" }}
        >
          <Header className="layout-admin__header">
            <MenuTop
              menuCollpase={menuCollpase}
              setMenuCollapse={setMenuCollapse}
              currentLocation={currentLocation}
            />
          </Header>
          <Content className="layout-admin__content">{children}</Content>
          {/* <Footer className="layout-admin__footer">Jirzo</Footer> */}
        </Layout>
      </Layout>
    );
  }

  return null;
};

export default LayoutAdmin;
