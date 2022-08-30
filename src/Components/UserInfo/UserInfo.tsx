import { Button, Col, Row, Modal, Upload, Form, Input } from "antd";
import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { editImageUser, getUserDetail } from "Slices/User";
import { Avatar } from "antd";
import Swal from "sweetalert2";
import { User } from "Interface/user";
import type { UploadProps } from "antd";
import { UploadOutlined } from "@ant-design/icons";
const UserInfo = () => {
  const { UserId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserDetail(UserId!));
  }, []);
  const { userDetail } = useSelector((state: RootState) => state.user);
  /* form sửa ảnh */
  const props: UploadProps = {
    beforeUpload: (file) => {
      return false;
    },
  };
  const normFile = (e: UploadProps) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };
  interface CollectionCreateFormPropsImage {
    visibleImage: boolean;
    onCreate: (values: User) => void;
    onCancel: () => void;
  }
  const FormEditImage: React.FC<CollectionCreateFormPropsImage> = ({
    visibleImage,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();

    return (
      <Modal
        visible={visibleImage}
        title="Form sửa ảnh"
        okText="Sửa ảnh"
        cancelText="Hủy"
        onCancel={onCancel}
        onOk={() => {
          form
            .validateFields()
            .then((values) => {
              form.resetFields();
              onCreate(values);
            })
            .catch((info) => {
              console.log("Validate Failed:", info);
            });
        }}
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={{ modifier: "public" }}
        >
          <Form.Item
            name="avatar"
            label="Ảnh đại diện"
            valuePropName="fileList"
            getValueFromEvent={normFile}
          >
            <Upload {...props} listType="picture">
              <Button icon={<UploadOutlined />}>Upload ảnh</Button>
            </Upload>
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  /*end form sửa ảnh */

  /* sửa anh */

  const [visibleImage, setVisibleImage] = useState(false);

  const onChangeImage = (values: User) => {
    dispatch(editImageUser(values))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Sửa Thành công`,
          });
          dispatch(getUserDetail(UserId!));
        } else {
          Swal.fire({
            title: `Sửa thất bại`,
          });
        }
      });
    setVisibleImage(false);
  };
  /* end sửa ảnh */
  return (
    <div>
      <Row className="m-10">
        <Col lg={8} xs={24} className="border-2 rounded-3xl p-5 text-xl mb-2">
          <div className="w-32  m-auto text-center">
            <Avatar src={userDetail?.avatar} size={124} />
            <button className="underline" onClick={() => setVisibleImage(true)}>
              Cập nhật ảnh
            </button>
          </div>
          <div className="mt-2 border-b-2 ">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                height: 24,
                width: 24,
                fill: "currentcolor",
              }}
            >
              <path d="M16 .798l.555.37C20.398 3.73 24.208 5 28 5h1v12.5C29 25.574 23.21 31 16 31S3 25.574 3 17.5V5h1c3.792 0 7.602-1.27 11.445-3.832L16 .798zm0 2.394l-.337.213C12.245 5.52 8.805 6.706 5.352 6.952L5 6.972V17.5c0 6.831 4.716 11.357 10.713 11.497L16 29c6.133 0 11-4.56 11-11.5V6.972l-.352-.02c-3.453-.246-6.893-1.432-10.311-3.547L16 3.192zm7 7.394L24.414 12 13.5 22.914 7.586 17 9 15.586l4.5 4.499 9.5-9.5z" />
            </svg>
            <h1>Xác minh danh tính</h1>
            <div className="text-xs">
              Xác thực danh tính của bạn với huy hiệu xác minh danh tính.
            </div>
            <button className="mt-2 mb-2 rounded-xl border border-gray-500 py-2 px-8">
              <h1>Huy hiệu</h1>
            </button>
          </div>
          <h1> {userDetail?.name} đã xác nhận</h1>
          <div className="flex">
            <span>
              <svg
                viewBox="0 0 16 16"
                xmlns="http://www.w3.org/2000/svg"
                aria-hidden="true"
                role="presentation"
                focusable="false"
                style={{
                  display: "block",
                  height: 16,
                  width: 16,

                  fill: "currentcolor",
                }}
              >
                <path d="M13.102 2.537L15.365 4.8l-9.443 9.443L.057 8.378 2.32 6.115l3.602 3.602z" />
              </svg>
            </span>
            <span className="ml-1 text-xs">Địa chỉ email</span>
          </div>
        </Col>
        <Col lg={16} xs={24} className="pl-5 text-xl">
          <h1 className="text-3xl"> Tài Khoản {userDetail?.name}</h1>
          <div className="text-gray-500 underline  ">
            Địa chỉ: {userDetail?.address}
          </div>
          <div className="text-gray-500 underline ">
            Email: {userDetail?.email}
          </div>
          <div className="text-gray-500 underline ">
            Giới tính: {userDetail?.gender ? "nam" : "nữ"}
          </div>
          <div className="text-gray-500 underline ">
            Số điện thoại: {userDetail?.phone}
          </div>
        </Col>
      </Row>
      <FormEditImage
        visibleImage={visibleImage}
        onCreate={onChangeImage}
        onCancel={() => {
          setVisibleImage(false);
        }}
      />
    </div>
  );
};

export default UserInfo;
