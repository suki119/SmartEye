import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Breadcrumb,
    Layout,
    Divider,
    Table,
    message,
    Button,
    Modal,
    Form,
    Input,
    Image
} from 'antd';
import Swal from 'sweetalert2'; // Import SweetAlert

const { Content } = Layout;

function ViewAllImages(props) {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editedRecord, setEditedRecord] = useState({});
    const [form] = Form.useForm();
    const [user, setUser] = useState({});

    function getProductId(){

        const User = JSON.parse(localStorage.getItem("user"));
        setUser(User)
    }

    useEffect(() => {

        getProductId();
        const User = JSON.parse(localStorage.getItem("user"));
        // Fetch data from your server
        axios.get(`http://localhost:8000/api/image/getallImageByID/${User.productId}`)
            .then((response) => {
                console.log('API Response:', response.data);
                setData(response.data.data); // Assuming the response is an array of image data
            })
            .catch((error) => {
                console.error('Error:', error);
                message.error('Failed to fetch image data');
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    const handleUpdate = (record) => {
        setEditedRecord(record);
        form.setFieldsValue({
            image_name: record.image_name,
        });
        setIsModalVisible(true);
    };

    const handleDelete = (record) => {
        Swal.fire({
            title: 'Are you sure?',
            text: 'You will not be able to recover this image!',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
            if (result.isConfirmed) {
                // Delete the image using the _id
                axios.delete(`http://localhost:8000/api/image/deleteImageDetails/${record._id}`)
                    .then((response) => {
                        Swal.fire('Deleted!', 'Your image has been deleted.', 'success');
                        // Remove the deleted image from the state (data)
                        setData(data.filter((item) => item._id !== record._id));
                    })
                    .catch((error) => {
                        console.error('Error deleting image:', error);
                        Swal.fire('Error!', 'Failed to delete the image.', 'error');
                    });
            }
        });
    };

    const columns = [
        {
            title: 'Image Name',
            dataIndex: 'image_name',
            key: 'image_name',
        },
        {
            title: 'Product ID',
            dataIndex: 'product_id',
            key: 'product_id',
        },
        {
            title: 'Image',
            dataIndex: 'image_data',
            key: 'image_data',
            render: (image_data) => (
                <Image
                    src={`data:image/jpeg;base64,${image_data}`}
                    alt="Image"
                    style={{ width: '150px', height: '150px', objectFit: 'scale-down' }} // Adjust width and height here
                />
            ),
        },
        {
            title: 'Actions',
            key: 'actions',
            render: (text, record) => (
                <span>
                    <Button type="primary" htmlType="submit" className="common-save-btn common-btn-color" style={{ marginTop: '16px' }} onClick={() => handleUpdate(record)}>Update</Button>
                    <Button type="default" style={{
                                        marginLeft: '8px',
                                        backgroundcolor: props.isDarkMode ? 'var(--cancel-btn-bg-dark)' : 'var(--cancel-btn-bg-light)',
                                        color: props.isDarkMode ? 'var( --cancel-btn-color-dark)' : 'var(--cancel-btn-color-light)'

                                    }} onClick={() => handleDelete(record)}>Delete</Button>
                </span>
            ),
        },
    ];

    const updateImageName = (values) => {
        // Update the image_name using the _id of the record
        const updatedData = data.map((item) =>
            item._id === editedRecord._id
                ? { ...item, image_name: values.image_name }
                : item
        );

        // Update the data in the state
        setData(updatedData);

        // Send a request to your server to update the image_name
        axios.put(`http://localhost:8000/api/image/updateImageDetails/${editedRecord._id}`, {
            image_name: values.image_name,
          
        })
            .then((response) => {
                console.log('Image name updated:', response.data);
            })
            .catch((error) => {
                console.error('Error updating image name:', error);
                message.error('Failed to update image name');
            });

        setIsModalVisible(false);
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
                    background: props.isDarkMode
                        ? 'var(--content-container-bg-dark)'
                        : 'var(--content-container-bg-light',
                }}
            >
                <Divider orientation="left">All Images</Divider>

                {data.length > 0 ? (
                    <Table
                        columns={columns}
                        dataSource={data}
                        loading={loading}
                        rowKey={(record) => record._id}
                    />
                ) : (
                    <div>No data available.</div>
                )}

                <Modal
                    title="Update Image Name"
                    visible={isModalVisible}
                    onCancel={() => setIsModalVisible(false)}
                    footer={null}
                >
                    <Form
                        form={form}
                        onFinish={updateImageName}
                    >
                        <Form.Item
                            name="image_name"
                            label="Image Name"
                            rules={[{ required: true, message: 'Please input the image name!' }]}
                        >
                            <Input />
                        </Form.Item>
                        <Button type="primary" htmlType="submit">
                            Update
                        </Button>
                    </Form>
                </Modal>
            </Content>
        </div>
    );
}

export default ViewAllImages;
