import React, { useState, useEffect } from "react";
import { Form, Input, Button, Row, Col, notification } from "antd";
import {
  AreaChartOutlined,
  FileImageOutlined,
  UserOutlined
} from "@ant-design/icons";
import { uploadImageDataApi } from "../../../../api/image";
import { getAccesToken } from "../../../../api/auth";
import "./EditImageForm.scss";

const EditImageForm = ({ item, setIsVisible, setReloadImages }) => {
  const [image, setImage] = useState(null);
  const [imageData, setImageData] = useState({});

  useEffect(() => {
    setImageData({
      model: item.model,
      nameSection: item.nameSection,
      photograper: item.photograper,
      type: item.type
    });
  }, [item]);

  const updateImage = (e) => {
    e.preventDefault();
    const token = getAccesToken();
    uploadImageDataApi(token, imageData, item._id).then((result) => {
      notification["success"]({
        message: result.message
      });
      setIsVisible(false);
      setReloadImages(true);
    });
  };

  return (
    <div className="edit-image-form">
      <EditForm
        item={item}
        imageData={imageData}
        setImageData={setImageData}
        updateImage={updateImage}
      />
    </div>
  );
};

const EditForm = ({ imageData, setImageData, updateImage, item }) => {
  const handleForm = (e) => {
    const { name, value } = e.target;
    setImageData({
      ...imageData,
      [name]: value
    });
  };
  return (
    <Form className="form-edit">
      <Row gutter={24}>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Fotografo"
              type="photograper"
              name="photograper"
              value={imageData.photograper}
              className="register-form_input"
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Modelo"
              name="model"
              value={imageData.model}
              className="register-form_input"
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item>
            <Input
              prefix={<FileImageOutlined />}
              placeholder="Tipo de foto"
              type="type"
              name="type"
              value={imageData.type}
              className="register-form_input"
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
        <Col xs={{ span: 24 }} sm={{ span: 24 }} md={{ span: 12 }}>
          <Form.Item>
            <Input
              prefix={<AreaChartOutlined />}
              placeholder="Seccion"
              type="nameSection"
              name="nameSection"
              value={imageData.nameSection}
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
          onClick={updateImage}
        >
          Editar
        </Button>
      </Form.Item>
    </Form>
  );
};

export default EditImageForm;
