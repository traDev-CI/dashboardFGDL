import React, { useEffect, useState } from "react";
import { Button, Space, Table, Tag } from "antd";
import { EditOutlined } from "@ant-design/icons"
import Modal from "../../../components/Modal";
import ContactMessage from "../../../components/admin/ContactMessage/ContactMessage";
import ContactSendMessage from "../../../components/admin/ContactMessage/ContactSendMessage";
import { getContactMessage } from "../../../api/contact";
import { getAccesToken } from "../../../api/auth";

const Messages = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [reloadMessages, setReloadMessages] = useState(false);
  const [message, setMessage] = useState([]);
    const token = getAccesToken();

  const seeDetailMessage = (user) => {
    setIsVisible(true);
    setTitle("Mensaje");
    setModalContent(<ContactMessage user={user} />);
  };

  const sendMessage = () =>{
    setIsVisible(true);
    setTitle("Enviar mensaje");
    setModalContent(<ContactSendMessage setIsVisible={setIsVisible} setReloadMessages={setReloadMessages} />)
  }
  useEffect(() =>{
    getContactMessage(token).then((response) => {
        setMessage(response.messagesFound);
    })
  }, [token, reloadMessages])

  const columns = [
    {
      title: "Correo electronico",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Mensaje",
      dataIndex: "message",
      key: "message",
    },
    {
      title: "Acciones",
      key: "action",
      render: (_, record) => (
        <Space size="middle" onClick={() => seeDetailMessage(record)}>
          <a>Abrir</a>
        </Space>
      ),
    },
  ];

  return (
    <>
      <Table columns={columns} dataSource={message} />
      {/* <Button type="primary" icon={<EditOutlined />} onClick={sendMessage}>
        Search
      </Button> */}
      <Modal title={title} isVisible={isVisible} setIsVisible={setIsVisible}>
        {modalContent}
      </Modal>
    </>
  );
};

export default Messages;
