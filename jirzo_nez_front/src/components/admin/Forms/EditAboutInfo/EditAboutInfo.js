import React, { useCallback, useEffect, useState } from "react";
import {
  Avatar,
  Form,
  Input,
  Select,
  Row,
  Col,
  Button,
  notification,
  Image
} from "antd";
import { useDropzone } from "react-dropzone";
import {
  getAvatarApi,
  uploadAvatarApi,
  updateUserApi
} from "../../../../api/user";
import { getAccesToken } from "../../../../api/auth";
import NoAvatar from "../../../../assets/img/no-avatar.png";
import { UserOutlined } from "@ant-design/icons";

import './EditAboutInfo.scss'
import { getMiniatureApi, updateInfo, uploadMiniatureApi } from "../../../../api/about";

const UploadMiniature = ({miniature, setMiniature}) =>{
    const [miniatureUrl, setMiniatureUrl] = useState(null);
    useEffect(() =>{
        if(miniature){
            if (miniature.preview) {
                setMiniatureUrl(miniature.preview)
            } else {
                setMiniatureUrl(miniature)
            }
        } else {
            setMiniatureUrl(null);
        }
    }, [miniature]);

    const onDrop = useCallback((acceptedFiles) =>{
        const file = acceptedFiles[0];
        setMiniature({ file, preview: URL.createObjectURL(file) })
    },[setMiniature]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        accept: "image/jpg, image/png, image/jpeg",
        noKeyboard: true,
        onDrop
      });

    return (
        <div className="upload-avatar" {...getRootProps()}>
            <input {...getInputProps()} />
            {isDragActive ? (
                <img  shape="square" width={200} src={NoAvatar} alt="Sin imagen" />
            ) : (
                <img shape="square" width={200}src={miniatureUrl ? miniatureUrl : NoAvatar} alt="Con imagen" />
            )}
        </div>
    )
}

const EditForm = ({info, infoData, setInfoData, updateCurrentInfo }) => {

    const handleForm = (e) => {
        const {name, value} = e.target;
        setInfoData({
            ...infoData,
            [name]: value
        })
    };

    return (
        <Form className="form-edit">
            <Row>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            prefix={
                                <UserOutlined
                                style={{ color: "rgba(0,0,0, .25)", marginRight: "5px" }}
                              />
                            }
                            type="name"
                            name="title"
                            placeholder="Title"
                            className="register-form_input"
                            value={infoData.title}
                            onChange={handleForm}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Input.TextArea
                            prefix={<UserOutlined />}
                            rows={6}
                            placeholder="Description"
                            name="description"
                            value={infoData.description}
                            onChange={handleForm}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button
                type="primary"
                htmlType="submit"
                className="btn-submit"
                onClick={updateCurrentInfo}
                >
                Edit user
                </Button>
            </Form.Item>
        </Form>
    )

}

const EditAboutInfo = ({info, setIsVisible, setReloadAbout}) => {
    const [miniature, setMiniature] = useState(null);
    const [infoData, setInfoData] = useState({});

    const updateCurrentInfo = (e) => {
        e.preventDefault();
        const token = getAccesToken();
        let infoUpdate = infoData;

        if (!infoUpdate.title || !infoUpdate.description) {
            notification["error"]({
                message: "Ambos campos son necesarios"
            });
            return;
        }
        if (typeof infoData.miniature === 'object') {
            info.map(element => {

                uploadMiniatureApi(token, infoUpdate.miniature, element._id )
                .then((response) =>{
                    infoData.miniature = response.miniatureName;
                    updateInfo(token, infoUpdate, element._id).then((result) =>{
                        notification["success"]({
                            message: result.message
                        });
                        setIsVisible(false);
                        setReloadAbout(true);
                   })
                })
               })
        } else {
            info.map(element => {
                updateInfo(token, infoUpdate, element._id).then((result) =>{
                    notification["success"]({
                        message: result.message
                      });
                      setIsVisible(false);
                      setReloadAbout(true);
                   })
            })

        }
    }

    useEffect(() =>{
        info.map(element =>{
            if (element.miniature) {
                getMiniatureApi(element.miniature).then((response) => {
                    setMiniature(response)
                });
            } else {
                setMiniature(null)
            }
        })

    }, [info])

    useEffect(() =>{
        info.map(info => {
            setInfoData({
                id: info._id,
                title: info.title,
                description: info.description
            })
        })
      }, [info])



    useEffect(() => {
        if (miniature) {
            setInfoData({ ...infoData, miniature: miniature.file })
        }
    }, [miniature]);

  return (
    <div className="edit-info-form">
        <UploadMiniature miniature={miniature} setMiniature={setMiniature} />
        <EditForm
            info={info}
            infoData={infoData}
            setInfoData={setInfoData}
            updateCurrentInfo={updateCurrentInfo}
        />
    </div>
  )
}

export default EditAboutInfo