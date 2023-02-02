import React, { useEffect, useState } from "react";
import {
  List,
  Switch,
  Avatar,
  Button,
  Tooltip,
  notification,
  Modal as Confirmation
} from "antd";
import {
  CheckOutlined,
  DeleteOutlined,
  EditOutlined,
  StopOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import Modal from "../../Modal";

import "./About.scss"
import AddAboutForm from "./AddAboutForm/AddAboutForm";

const AboutSection = ({about, setReloadAbout}) => {
  const [title, setTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  console.log(about);
  const addAbout = () =>{
    setIsVisible(true);
    setTitle("Agregar nueva informacion a la seccion 'Acerca de nosotros'")
    setModalContent(
      <AddAboutForm
        setVisible={setIsVisible}
      />
    )
  }

  return (
    <>
        <div className="about-content">
          <div className="about-content__header">
            <Tooltip title="New about">
              <Button type="primary" shape="circle" onClick={addAbout}>
                <UserAddOutlined/>
              </Button>
            </Tooltip>
          </div>
          <Modal title={title} isVisible={isVisible} setIsVisible={setIsVisible}>
            {modalContent}
          </Modal>
        </div>
    </>
    
  )
}

export default AboutSection