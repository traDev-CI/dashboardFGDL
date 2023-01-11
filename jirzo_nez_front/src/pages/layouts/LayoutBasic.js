import React from "react";
import { Layout } from "antd";

const LayoutBasic = ({ children }) => {
  const { Header, Content, Footer } = Layout;
  return (
    <Layout>
      <h1>Side Bar</h1>
      <Layout>
        <Header>Header...</Header>
        <Content>{children}</Content>
        <Footer>Jirzo</Footer>
      </Layout>
    </Layout>
  );
};

export default LayoutBasic;
