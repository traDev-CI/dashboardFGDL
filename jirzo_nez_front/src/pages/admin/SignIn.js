import React from "react";
import { Layout, Tabs } from "antd";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import logoAdmin from "../../assets/img/logoAdmin.jpg";
import RegisterForm from "../../components/admin/RegisterForm";
import LoginForm from "../../components/admin/LogInform/LoginForm";
import { getAccesToken } from "../../api/auth";

import "./scss/SignIn.scss";

const SignIn = () => {
  const { Content } = Layout;
  const { TabPane } = Tabs;
  if (getAccesToken()) {
    return (
      <Routes>
        <Route path="*" element={<Navigate to="/admin" />} />
      </Routes>
    );
  }
  return (
    <>
      <Layout className="sign-in">
        <Content className="sign-in__content">
          <div className="sign-in__content-logo">
            <img src={logoAdmin} alt="Jirzo nez" />
          </div>
          <div className="sign-in__content-tabs">
            <Tabs type="card">
              <TabPane tab={<span>LogIn</span>} key="1">
                <LoginForm />
              </TabPane>
              <TabPane tab={<span>New User</span>} key="2">
                <RegisterForm />
              </TabPane>
            </Tabs>
          </div>
        </Content>
      </Layout>
    </>
  );
};

export default SignIn;
