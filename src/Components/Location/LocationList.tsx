import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteLocation,
  editImageLocation,
  getLocationList,
  updateLocation,
} from "Slices/Location";
import { EditOutlined } from "@ant-design/icons";
import type { ColumnsType, TableProps } from "antd/es/table";
import { Location } from "Interface/location";
import {
  Table,
  Input,
  Row,
  Col,
  Button,
  Form,
  Modal,
  InputNumber,
  Upload,
} from "antd";

import { UploadOutlined } from "@ant-design/icons";
import type { UploadProps } from "antd";
import Swal from "sweetalert2";
import { NavLink } from "react-router-dom";
const LocationList = () => {
  const dispatch = useDispatch<AppDispatch>();
  /* Form sửa image */

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
    onCreate: (values: Location) => void;
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
  /*end Form sửa image */
  /* Form sửa */

  interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Location) => void;
    onCancel: () => void;
  }
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    if (editFormValue) {
      form.setFieldsValue({
        name: editFormValue?.name,
        province: editFormValue?.province,
        _id: editFormValue?._id,
        country: editFormValue?.country,
        valueate: editFormValue?.valueate,
      });
    }

    return (
      <Modal
        visible={visible}
        title="Sửa Thông Tin Người Dùng"
        okText="Sửa"
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
            name="name"
            label="Tên địa danh"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="province"
            label="Địa bàn tỉnh"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="valueate"
            label="Đánh giá"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <InputNumber
              min={1}
              max={10}
              addonAfter={<i className="fa fa-star text-amber-500"></i>}
            />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  /* end form sửa */
  /* Xóa */
  async function handledeleteLocation(id: string) {
    await dispatch(deleteLocation(id))
      .unwrap()
      .then((result) => {
        if (result) {
          console.log(result, "12");
          Swal.fire({
            title: `Xóa Thành công`,
          });
          dispatch(getLocationList());
        }
      });
  }
  /*end Xóa */
  /* Form get list */
  const columns: ColumnsType<Location> = [
    {
      title: "Địa danh",
      dataIndex: "name",
      width: 200,
    },
    {
      title: "Địa bàn tỉnh",
      dataIndex: "province",
      width: 150,
    },
    {
      title: "Địa điểm",
      dataIndex: "country",
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
      title: "Đánh giá",
      dataIndex: "valueate",
      width: 100,
      render: (text) => (
        <span>
          {text} <i className="fa fa-star text-amber-500"></i>
        </span>
      ),
    },
    {
      title: "ACTION",
      width: 150,
      render: (text, record, index) => (
        <>
          <Button
            block
            type="primary"
            onClick={() => {
              setVisible(true);
              SetEditFormValue(record);
            }}
          >
            Sửa
          </Button>
          <Button
            onClick={() => {
              Swal.fire({
                icon: "question",
                title: `Bạn muốn xóa vị trí`,
                text: record.name,
                showCancelButton: true,
                confirmButtonColor: "#fb4226",
                cancelButtonColor: "rgb(167 167 167)",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  handledeleteLocation(record._id);
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
          <NavLink to={`LocationInfo/${record._id}`}>
            <Button block>Chi tiết</Button>
          </NavLink>
        </>
      ),
    },
  ];
  /*end Form get list */

  useEffect(() => {
    dispatch(getLocationList());
  }, []);
  const { locations, isloading, error } = useSelector(
    (state: RootState) => state.locations,
  );

  const onChange: TableProps<Location>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    /* console.log("params", pagination, filters, sorter, extra); */
  };
  /* search */
  const onSearch = (value: string) => console.log(value);
  const { Search } = Input;
  const [q, setQ] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value?.toLowerCase());
  };
  const fSearch = (rows: Location[]) => {
    return rows.filter((row) => row?.name?.toLowerCase().indexOf(q) > -1);
  };
  /*end search */
  /* Sửa */
  const [visible, setVisible] = useState(false);
  const [editFormValue, SetEditFormValue] = useState<Location>();

  const onCreate = (values: Location) => {
    const data = {
      ...values,
    };
    dispatch(updateLocation(data))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Sửa Thành công`,
          });
          dispatch(getLocationList());
        } else {
          Swal.fire({
            title: `Sửa thất bại`,
          });
        }
      });
    setVisible(false);
    SetEditFormValue(undefined);
  };
  /*end Sửa */
  /* Sửa ảnh*/
  const [visibleImage, setVisibleImage] = useState(false);
  const [editFormImageValue, SetEditFormImageValue] = useState<Location>();
  const onChangeImage = (values: Location) => {
    dispatch(editImageLocation(values))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Sửa Thành công`,
          });
          dispatch(getLocationList());
        } else {
          Swal.fire({
            title: `Sửa thất bại`,
          });
        }
      });
    setVisibleImage(false);
    SetEditFormImageValue(undefined);
  };
  /*end Sửa ảnh*/
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
      <h1 className="text-center font-bold text-lg">Quản lý vị trí</h1>
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
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={fSearch(locations)}
        onChange={onChange}
        scroll={{ x: 800 }}
        bordered
      />
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
          SetEditFormValue(undefined);
        }}
      />
      <FormEditImage
        visibleImage={visibleImage}
        onCreate={onChangeImage}
        onCancel={() => {
          setVisibleImage(false);
          SetEditFormImageValue(undefined);
        }}
      />
    </div>
  );
};

export default LocationList;
