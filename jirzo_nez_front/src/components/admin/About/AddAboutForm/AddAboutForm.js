import React, {useState} from 'react'
import { Form, Input, Button, Row, Col, notification } from "antd";
import { LockOutlined, MailOutlined, UserOutlined } from "@ant-design/icons";

import { getAccesToken } from "../../../../api/auth";
import { addAboutInfo } from '../../../../api/about';

import "./AddAboutForm.scss"

const AddAboutForm = ({setVisible, setReloadInfo}) => {
    const [dataAbout, setDataAbout] = useState({});

    const addAbout = (e) =>{
        e.preventDefault();
    if (!dataAbout.title || !dataAbout.description) {
        notification["error"]({
            message: "Los campos deben estan llenados"
        });
    } else {
        const accessToken = getAccesToken();
        addAboutInfo(accessToken, dataAbout)
        .then((response) => {
            notification["success"]({
                message: response
            });
            setVisible(false);
            setReloadInfo(true);
            setDataAbout({});
        }).catch((err) => {
            notification["error"]({
                message: err
              });
        });
    }

    }

  return (
    <div className="add-info-form">
        <AddForm
            addAbout={addAbout}
            setDataAbout={setDataAbout}
            dataAbout={dataAbout}
        />
    </div>
  )
};

const AddForm = ({addAbout, setDataAbout, dataAbout}) => {
    const handleForm = (e) =>{
        const {name, value} = e.target;
        setDataAbout({
            ...dataAbout,
            [name]: value
        });
    }

    return(
        <Form className='form-add'>
            <Row gutter={24}>
                <Col span={24}>
                    <Form.Item>
                        <Input
                            prefix={<UserOutlined />}
                            placeholder="Title"
                            name="title"
                            value={dataAbout.title}
                            onChange={handleForm}
                        />
                    </Form.Item>
                </Col>
                <Col span={24}>
                    <Form.Item>
                        <Input.TextArea
                            prefix={<UserOutlined />}
                            rows={4}
                            placeholder="Description"
                            name="description"
                            value={dataAbout.description}
                            onChange={handleForm}
                        />
                    </Form.Item>
                </Col>
            </Row>
            <Form.Item>
                <Button type="primary" className="btn-submit" onClick={addAbout}>
                    Create info
                </Button>
            </Form.Item>
        </Form>
    )
}

export default AddAboutForm