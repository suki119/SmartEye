import React, { useState,useEffect } from 'react';
import axios from 'axios';
import {
    Breadcrumb,
    Layout,
    Divider,
    Form,
    Input,
    Button,
    Upload,
    message,
} from 'antd';
import { appURLs, webAPI } from '../../utils/api';

import { EyeFilled, EditFilled, UploadOutlined, PlusOutlined , UserOutlined ,IdcardOutlined} from '@ant-design/icons';
import { Link, useHistory } from "react-router-dom";
const { Item } = Form;
const { Content } = Layout;

function AddPeople(props) {
    const history = useHistory();
    const [form] = Form.useForm();
    const [user, setUser] = useState({});

    useEffect(() => {
        const lUser = JSON.parse(localStorage.getItem("user"));
        if (lUser) {
          setUser(lUser);
        }
      
      }, []);

    const onFinish = (values) => {
        console.log(values)
        const formData = new FormData();
        formData.append('image_name', values.personName);
        formData.append('product_id', user.productId);
        formData.append('image_data', values.personImage.file); // Use originFileObj to access the actual file object

        axios
            .post(appURLs.web + webAPI.addImage, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            })
            .then((response) => {
                if(response.data.status === '2100'){
                    history.push(`/view-image`);
                }
                console.log('Response:', response.data);
                message.success('Person added successfully');
            })
            .catch((error) => {
                console.error('Error:', error);
                message.error('Failed to add person');
            });
    };

    return (
        <div>
            <Breadcrumb style={{ margin: '10px 0' }}>
                <Breadcrumb.Item>People</Breadcrumb.Item>
                <Breadcrumb.Item>List</Breadcrumb.Item>
            </Breadcrumb>

            <Content
                className="common-cotent-container"
                style={{
                    background: props.isDarkMode ? 'var(--content-container-bg-dark)' : 'var(--content-container-bg-light)',
                }}
            >
                <Divider orientation="left">Add People Details</Divider>

                <Form form={form} onFinish={onFinish}    labelCol={{ span: 24 }}
                            wrapperCol={{ span: 24 }}
                            layout="vertical" style={{ maxWidth: '400px', margin: '0 auto' }} >
                    <Item
                        name="personName"
                        label="Person's Name"
                        rules={[{ required: true, message: "Please enter the person's name" }]}
                    >
                        <Input prefix={<UserOutlined />} />
                    </Item>

                    <Item
                        name="personId"
                        label="Product ID"
                        rules={[{ required: true, message: "Please enter the person's ID" }]}
                    >
                        <Input style={{float:'right'}} prefix={<IdcardOutlined />} />
                    </Item>

                    <Item
                        name="personImage"
                        label="Person's Image"
                        rules={[{ required: true, message: 'Please upload an image' }]}
                    >
                        <Upload
                            action="/your-image-upload-api"
                            name="image_data"
                            listType="picture-card"
                            accept="image/*"
                            beforeUpload={(file) => {
                                console.log('Uploading image:', file);
                                return false;
                            }}
                        >
                            <Button icon={<UploadOutlined />}></Button>
                        </Upload>
                    </Item>

                    <Item>
                        <Button type="primary" htmlType="submit">
                            Add Person
                        </Button>
                    </Item>
                </Form>
            </Content>
        </div>
    );
}

export default AddPeople;
