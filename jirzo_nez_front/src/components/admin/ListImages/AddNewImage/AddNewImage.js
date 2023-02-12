import React, { useState, useEffect, useCallback } from "react";
import {
  Form,
  Input,
  Select,
  Button,
  Row,
  Col,
  notification,
  Image
} from "antd";
import { getAccesToken } from "../../../../api/auth";
import { newDataImageApi, uploadImageApi } from "../../../../api/image";
import NoImage from "../../../../assets/img/no-avatar.png";
import {
  AreaChartOutlined,
  FileImageOutlined,
  UserOutlined
} from "@ant-design/icons";
import { useDropzone } from "react-dropzone";

import "./AddNewImage.scss";

const AddNewImage = ({ setIsVisible, setReloadImages }) => {
  const [imageData, setImageData] = useState({});
  const [image, setImage] = useState(null);

  const addImage = (e) => {
    e.preventDefault();

    if (
      !imageData.photograper ||
      !imageData.model ||
      !imageData.type ||
      !imageData.nameSection
    ) {
      notification["error"]({
        message: "Todos los campos son obligatorios"
      });
    } else {
      const accessToken = getAccesToken();
      if (typeof image.file === "object") {
      }
      newDataImageApi(accessToken, imageData)
        .then((response) => {
          const imageId = response.image._id;
          uploadImageApi(accessToken, image.file, imageId).then((result) => {
            notification["success"]({
              message: result
            });
            setIsVisible(false);
            setReloadImages(true);
            setImageData({});
          });
        })
        .catch((err) => {
          notification["error"]({
            message: err
          });
        });
    }
  };

  return (
    <div className="add-image-form">
      <Row gutter={24}>
        <Col sm={{ span: 24 }} md={{ span: 12 }} className="centerImg">
          <NewImage image={image} setImage={setImage} />
        </Col>
        <Col sm={{ span: 24 }} md={{ span: 12 }}>
          <AddForm
            imageData={imageData}
            setImageData={setImageData}
            addImage={addImage}
          />
        </Col>
      </Row>
    </div>
  );
};

const NewImage = ({ image, setImage }) => {
  const [imageURL, setImageUrl] = useState(null);

  useEffect(() => {
    if (image) {
      if (image.preview) {
        setImageUrl(image.preview);
      } else {
        setImageUrl(image);
      }
    } else {
      setImageUrl(null);
    }
  }, [image]);

  const onDrop = useCallback(
    (acceptedFiles) => {
      const file = acceptedFiles[0];
      setImage({ file, preview: URL.createObjectURL(file) });
    },
    [setImage]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: "image/jpg, image/png, image/jpeg",
    noKeyboard: true,
    onDrop
  });

  return (
    <div className="new-image" {...getRootProps()}>
      <input {...getInputProps()} />
      {isDragActive ? (
        <img width={200} src={NoImage} alt="imagen" />
      ) : (
        <img width={200} src={imageURL ? imageURL : NoImage} alt="imagen" />
      )}
    </div>
  );
};

const AddForm = ({ imageData, setImageData, addImage }) => {
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
        <Col md={{ span: 24 }} xs={{ span: 24 }} lg={{ span: 24 }}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Fotografo"
              name="photograper"
              value={imageData.photograper}
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }} lg={{ span: 24 }}>
          <Form.Item>
            <Input
              prefix={<UserOutlined />}
              placeholder="Modelo"
              name="model"
              value={imageData.model}
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }} lg={{ span: 24 }}>
          <Form.Item>
            <Input
              prefix={<FileImageOutlined />}
              placeholder="Tipo de foto"
              name="type"
              value={imageData.type}
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
        <Col md={{ span: 24 }} xs={{ span: 24 }} lg={{ span: 24 }}>
          <Form.Item>
            <Input
              prefix={<AreaChartOutlined />}
              placeholder="Reto"
              name="nameSection"
              value={imageData.nameSection}
              onChange={handleForm}
            />
          </Form.Item>
        </Col>
      </Row>
      <Form.Item>
        <Button type="primary" className="btn-submit" onClick={addImage}>
          Subir
        </Button>
      </Form.Item>
    </Form>
  );
};

export default AddNewImage;
