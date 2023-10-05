/* eslint-disable array-callback-return */
import React, { useEffect, useState } from "react";
import {
  Button,
  Tooltip,
  Image,
  Col,
  Row,
} from "antd";
import {
  EditOutlined,
} from "@ant-design/icons";
import Modal from "../../Modal";

import "./About.scss"
import EditAboutInfo from "../Forms/EditAboutInfo";
import { getMiniatureApi } from "../../../api/about";

const AboutSection = ({about, setReloadAbout}) => {
  const [title, setTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const [titleS, setTitleS] = useState("");
  const [descriptionS, setDescriptionS] = useState("");
  const [miniature, setMiniature] = useState(null);

  useEffect(() =>{
    about.map(info => {
      setTitleS(info.title);
      setDescriptionS(info.description);
    })
  })

  useEffect(() =>{
    about.map(info => {
      getMiniatureApi(info.miniature).then((response) =>{
        setMiniature(response)
      })
    })
  })

  const editInfoAbout = (info) =>{
    setIsVisible(true);
    setTitle("Edit informacion")
    setModalContent(
      <EditAboutInfo 
        info={info}
        setIsVisible={setIsVisible}
        setReloadAbout={setReloadAbout}
      />
    )
  }

  return (
    <>
        <div className="about-content">
          <div className="about-content__header">
            <Tooltip title="New about">
              <Button type="primary" shape="circle" onClick={() => editInfoAbout(about)}>
              <EditOutlined />
              </Button>
            </Tooltip>
          </div>
          <div className="about-content__about-section">
          <Row>
            <Col sm={24} md={12}>
            <div className="about-content__about-section__image">
                  <Image
                    src={miniature}
                  />
                </div>
            </Col>
            <Col sm={24} md={12}>
            <div className="about-content__about-section__info">
                  <h1>{titleS}</h1>
                  <span>{descriptionS}</span>
                </div>
            </Col>
          </Row>

            </div>
          <Modal title={title} isVisible={isVisible} setIsVisible={setIsVisible}>
            {modalContent}
          </Modal>
        </div>
    </>
    
  )
}

export default AboutSection