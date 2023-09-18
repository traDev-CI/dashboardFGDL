import { FileImageOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row, notification } from "antd";
import React, { useState } from "react";
import "./ContactMessageForm.scss";
import { getAccesToken } from "../../../api/auth";
import { postContactMessageAdmin } from "../../../api/contact";

const ContactSendMessage = ({ setIsVisible, setReloadMessages }) => {
  const [message, setMessage] = useState({});

  const sendMessage = (e) => {
    e.preventDefault();
    const token = getAccesToken();
    postContactMessageAdmin(token, message).then((result) => {
      notification["success"]({
        message: result.message
      });
      setIsVisible(false);
      setReloadMessages(true)
    })
    console.log("Message sent: ", message);
  };

  return (
    <div className="contact-message-form">
      <MessageForm
        messageData={message}
        setMessage={setMessage}
        sendMessage={sendMessage}
      />
    </div>
  );
};

const MessageForm = ({ messageData, setMessage, sendMessage }) => {
  const handleForm = (e) => {
    const { name, value } = e.target;
    setMessage({
      ...messageData,
      [name]: value,
      read: false
    });
  };
  return (
    <Form className="form-edit">
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item>
            <Input
              prefix={<MailOutlined />}
              placeholder="Correo Electronico"
              name="email"
              value={messageData.email}
              className="register-form_input"
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
      </Row>
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 24 }}>
          <Form.Item>
            <Input.TextArea
              rows={4}
              maxLength={150}
              prefix={<FileImageOutlined />}
              placeholder="Mensaje"
              type="message"
              name="message"
              value={messageData.message}
              className="register-form_input"
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button
          type="primary"
          className="btn-submit"
          htmlType="submit"
          onClick={sendMessage}
        >
          Enviar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ContactSendMessage;
