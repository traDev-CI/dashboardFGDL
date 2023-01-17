import React, { useState, useEffect } from "react";
import {
  List,
  Button,
  Tooltip,
  notification,
  Modal as Confirmation,
  Space,
  Card,
  Input
} from "antd";
import {
  DeleteOutlined,
  EditOutlined,
  FileImageOutlined,
  SearchOutlined,
  UserAddOutlined
} from "@ant-design/icons";
import Modal from "../../Modal";
import { getImagesApi, deleteImageApi } from "../../../api/image";
import EditImageForm from "../Forms/EditImage/EditImageForm";
import NoImage from "../../../assets/img/no-avatar.png";

import "./ListImages.scss";
import AddNewImage from "./AddNewImage";
import { getAccesToken } from "../../../api/auth";

const { confirm } = Confirmation;

const ListImages = ({ images, setReloadImages }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [title, setTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [query, setQuery] = useState('');

  const addNewImage = () => {
    setIsVisible(true);
    setTitle("Aniadendo una nueva imagen");
    setModalContent(
      <AddNewImage
        setIsVisible={setIsVisible}
        setReloadImages={setReloadImages}
      />
    );
  };

  console.log(query);

  return (
    <div className="list-image">
      <div className="list-image__header">
      <Input className="list-image__filter" placeholder="Basic usage" prefix={<SearchOutlined />} onChange={(e) => setQuery(e.target.value)} />
        <Tooltip title="Nueva imagen">
          <Button type="primary" shape="circle" onClick={addNewImage}>
            <FileImageOutlined />
          </Button>
        </Tooltip>
      </div>
      <List
        grid={{
          gutter: 16,
          xs: 1,
          sm: 2,
          md: 4,
          lg: 4,
          xl: 3,
          xxl: 4
        }}
        pagination={{
          onChange: (page) => {
            console.log(page);
          },
          pageSize: 6
        }}
        dataSource={images.filter(image => image.type.toLowerCase().includes(query))}
        footer={
          <div>
            Fotografos <b>Duadalajara</b>
          </div>
        }
        renderItem={(item) => (
          <ListItems
            item={item}
            setIsVisible={setIsVisible}
            setReloadImages={setReloadImages}
            setModalContent={setModalContent}
            isVisible={isVisible}
            setTitle={setTitle}
          />
        )}
      />
      <Modal title={title} isVisible={isVisible} setIsVisible={setIsVisible}>
        {modalContent}
      </Modal>
    </div>
  );
};

const ListItems = ({
  item,
  setIsVisible,
  setTitle,
  setModalContent,
  isVisible,
  setReloadImages
}) => {
  const [image, setImage] = useState(null);

  const handleEdit = (item) => {
    setIsVisible(true);
    setTitle(`Editando fotografia de ${item.photograper}`);
    setModalContent(
      <EditImageForm
        item={item}
        setIsVisible={setIsVisible}
        setReloadImages={setReloadImages}
      />
    );
  };

  const handleDelete = (item) => {
    const accessToken = getAccesToken();
    confirm({
      title: "Borrar imagen",
      content: "Estas seguro de que quieres borrar esta imagen?",
      okText: "Borrar",
      okType: "danger",
      cancelText: "Cancelar",
      onOk() {
        deleteImageApi(accessToken, item._id)
          .then((response) => {
            notification["success"]({
              message: response.message
            });
            setReloadImages(true);
          })
          .catch((error) => {
            notification["error"]({
              message: error
            });
          });
      }
    });
  };

  useEffect(() => {
    if (item.image) {
      getImagesApi(item.image).then((response) => {
        setImage(response);
      });
    } else {
      setImage(null);
    }
  }, [item]);

  return (
    <List.Item>
      <Card
        title={item.photograper}
        cover={<img alt="example" src={image ? image : NoImage} />}
        actions={[
          <Space>
            <Tooltip title="Edit">
              <EditOutlined key="edit" onClick={() => handleEdit(item)} />
            </Tooltip>
          </Space>,
          <Space>
            <Tooltip title="Delete">
              <DeleteOutlined key="delete" onClick={() => handleDelete(item)} />
            </Tooltip>
          </Space>
        ]}
      >
        <Card.Meta title={item.model} description={item.type} />
      </Card>
      {item.content}
    </List.Item>
  );
};

export default ListImages;
