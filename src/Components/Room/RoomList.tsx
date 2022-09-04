import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteRoom, editImageRoom, getRoomList } from "Slices/Room";
import type { UploadProps } from "antd";

import { UploadOutlined, EditOutlined } from "@ant-design/icons";
import {
  Table,
  Input,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Upload,
  InputNumber,
  Switch,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { LocationID, Room } from "Interface/room";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
const RoomList = () => {
  async function handledeleteRoom(id: string) {
    await dispatch(deleteRoom(id))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Xóa thành công`,
          });
          dispatch(getRoomList(""));
        } else {
          Swal.fire({
            title: `Xóa thất bại`,
          });
        }
      });
  }
  const columns: ColumnsType<Room> = [
    {
      title: "Mã Phòng",
      dataIndex: "_id",
      width: 200,
    },
    {
      title: "Tên Phòng",
      dataIndex: "name",
      width: 150,
    },
    {
      title: "Hình ảnh",
      dataIndex: "image",
      width: 150,
      render: (text, record, index) => (
        <Row justify="space-around" align="middle">
          <Col>
            <img
              className="mb-2"
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "10px",
              }}
              src={text}
            />
          </Col>
          <Col>
            <Button
              onClick={() => {
                setVisibleImage(true);
                SetEditFormImageValue(record);
              }}
            >
              <EditOutlined />
            </Button>
          </Col>
        </Row>
      ),
    },
    {
      title: "Địa danh",
      dataIndex: "locationId",
      width: 150,
      render: (record: LocationID) => record?.name,
    },
    {
      title: "guests Max",
      dataIndex: "guests",
      width: 150,
      render: (text) => (
        <span>
          {text} <i className="fa fa-male"></i>
        </span>
      ),
    },
    {
      title: "Action",
      width: 150,
      render: (text, record, index) => (
        <>
          <Button
            onClick={() => {
              Swal.fire({
                icon: "question",
                title: `Bạn muốn xóa phòng`,
                text: record.name,
                showCancelButton: true,
                confirmButtonColor: "#fb4226",
                cancelButtonColor: "rgb(167 167 167)",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  handledeleteRoom(record._id);
                }
              });
            }}
            key={index + 10000}
            danger
            block
            type="primary"
          >
            Xóa
          </Button>
          <NavLink to={`RoomInfo/${record._id}`}>
            <Button block>Chi tiết</Button>
          </NavLink>
        </>
      ),
    },
  ];
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getRoomList(""));
  }, []);
  const { rooms, isloading, error } = useSelector(
    (state: RootState) => state.room,
  );
  /* search */
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);

  const [q, setQ] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value?.toLowerCase());
  };
  const fSearch = (rows: Room[]) => {
    return rows.filter((row) => row?.name?.toLowerCase().indexOf(q) > -1);
  };
  /*end search */
  const onChange: TableProps<Room>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    /* console.log("params", pagination, filters, sorter, extra); */
  };
  /* Form Sửa ảnh */
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
    onCreate: (values: Room) => void;
    onCancel: () => void;
  }
  const FormEditImage: React.FC<CollectionCreateFormPropsImage> = ({
    visibleImage,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();

    if (editFormImageValue) {
      form.setFieldsValue({
        _id: editFormImageValue?._id,
      });
    }
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
            name="_id"
            label="Id"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item
            name="image"
            label="Hình ảnh"
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
  /*end Form Sửa ảnh */

  /* sửa ảnh */
  const [visibleImage, setVisibleImage] = useState(false);
  const [editFormImageValue, SetEditFormImageValue] = useState<Room>();
  const onChangeImage = (values: Room) => {
    dispatch(editImageRoom(values))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Sửa Thành công`,
          });
          dispatch(getRoomList(""));
        } else {
          Swal.fire({
            title: `Sửa thất bại`,
          });
        }
      });
    setVisibleImage(false);
    SetEditFormImageValue(undefined);
  };
  /*end sửa ảnh */
  if (isloading) {
    return (
      <div className="loading h-screen">
        <svg viewBox="0 0 50 50">
          <circle className="ring" cx={25} cy={25} r={20} />
          <circle className="ball" cx={25} cy={5} r="3.5" />
        </svg>
      </div>
    );
  }
  if (error) {
    <div className="loading h-screen">
      <svg viewBox="0 0 50 50">
        <circle className="ring" cx={25} cy={25} r={20} />
        <circle className="ball" cx={25} cy={5} r="3.5" />
      </svg>
    </div>;
  }
  return (
    <div>
      <h1 className="text-center font-bold text-lg">Quản lý Thông tin Phòng</h1>
      <Row>
        <Col lg={{ span: 6 }} md={{ span: 8 }}>
          <Search
            className="mb-2 text-red"
            placeholder="Search"
            onSearch={onSearch}
            onChange={handleSearch}
          />
        </Col>
      </Row>
      <FormEditImage
        visibleImage={visibleImage}
        onCreate={onChangeImage}
        onCancel={() => {
          setVisibleImage(false);
          SetEditFormImageValue(undefined);
        }}
      />

      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={fSearch(rooms)}
        onChange={onChange}
        scroll={{ x: 800 }}
        bordered
      />
    </div>
  );
};

export default RoomList;
