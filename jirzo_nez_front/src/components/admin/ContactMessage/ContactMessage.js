import { Descriptions, Item } from "antd";
import React from "react";

const ContactMessage = ({ user }) => {
  return (
    <>
      <Descriptions layout="horizontal">
        <Descriptions.Item label="Correo Electronico">
          {user.email}
        </Descriptions.Item>
      </Descriptions>
      <Descriptions>
        <Descriptions.Item label="Mensaje">{user.message}</Descriptions.Item>
      </Descriptions>
    </>
  );
};

export default ContactMessage;
