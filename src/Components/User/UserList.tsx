import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteUser, getUserList, updateUser } from "Slices/User";
import { EditOutlined } from "@ant-design/icons";
import { NavLink } from "react-router-dom";
import moment from "moment";
import {
  Table,
  Input,
  Row,
  Col,
  Button,
  Form,
  Modal,
  Select,
  DatePicker,
  Space,
} from "antd";
import type { ColumnsType, TableProps } from "antd/es/table";
import { User } from "Interface/user";
import Swal from "sweetalert2";

interface CollectionCreateFormProps {
  visible: boolean;
  onCreate: (values: User) => void;
  onCancel: () => void;
}
const UserList = () => {
  /* Form sửa */
  const { Option } = Select;
  const dateFormat = "YYYY/MM/DD";
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    if (editFormValue) {
      form.setFieldsValue({
        name: editFormValue?.name,
        gender: editFormValue?.gender,
        address: editFormValue?.address,
        email: editFormValue?.email,
        birthday: moment(`${editFormValue?.birthday}`, dateFormat),
        phone: editFormValue?.phone,
        type: editFormValue?.type,
        _id: editFormValue?._id,
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
            label="Tên người dùng"
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
            name="phone"
            label="Số điện thoại"
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
            name="email"
            label="Email"
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
            name="address"
            label="Địa chỉ"
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
            name="type"
            label="Loại người dùng"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select>
              <Option value="ADMIN">ADMIN</Option>
              <Option value="CLIENT">Người dùng</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="gender"
            label="Giới tính"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <Select>
              <Option value={true}>Nam</Option>
              <Option value={false}>Nữ</Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="birthday"
            label="Ngày sinh"
            rules={[
              {
                required: true,
                message: "Please input the title of collection!",
              },
            ]}
          >
            <DatePicker format={dateFormat} />
          </Form.Item>
        </Form>
      </Modal>
    );
  };
  /* end form sửa */
  /* Xóa */
  async function handledeleteUser(id: string) {
    await dispatch(deleteUser(id))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Xóa Thành công`,
          });
          dispatch(getUserList());
        } else {
          Swal.fire({
            title: `Xóa thất bại`,
          });
        }
      });
  }
  /* end Xóa */
  /* form get list */
  const columns: ColumnsType<User> = [
    {
      title: "Tên người dùng",
      dataIndex: "name",
      width: 100,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: 100,
    },
    {
      title: "Ảnh đại diện",
      dataIndex: "avatar",
      width: 150,
      render: (text) => (
        <>
          <Row justify="space-around" align="middle">
            <Col>
              <img
                style={{
                  width: "100px",
                  height: "100px",
                  borderRadius: "10px",
                }}
                src={text}
              />
            </Col>
          </Row>
        </>
      ),
    },

    {
      title: "Số điện thoại",
      dataIndex: "phone",
      width: 100,
    },
    {
      title: "Loại tài khoản",
      dataIndex: "type",
      width: 100,
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
                title: `Bạn muốn xóa người dùng`,
                text: record.name,
                showCancelButton: true,
                confirmButtonColor: "#fb4226",
                cancelButtonColor: "rgb(167 167 167)",
                confirmButtonText: "OK",
              }).then((result) => {
                if (result.isConfirmed) {
                  handledeleteUser(record._id);
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
        </>
      ),
    },
  ];
  /*end form get list */
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserList());
  }, []);
  const { users, isloading, error } = useSelector(
    (state: RootState) => state.user,
  );

  const onChange: TableProps<User>["onChange"] = (
    pagination,
    filters,
    sorter,
    extra,
  ) => {
    /* console.log("params", pagination, filters, sorter, extra); */
  };
  /* search */
  const { Search } = Input;
  const onSearch = (value: string) => console.log(value);
  const data: User[] = users;
  const [q, setQ] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value?.toLowerCase());
  };
  const fSearch = (rows: User[]) => {
    return rows.filter((row) => row?.name?.toLowerCase().indexOf(q) > -1);
  };
  /*end search */
  /* Sửa */
  const [visible, setVisible] = useState(false);
  const [editFormValue, SetEditFormValue] = useState<User>();

  const onCreate = (values: User) => {
    const data = {
      ...values,
    };
    console.log(data, "hehe");
    dispatch(updateUser(data))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Sửa Thành công`,
          });
          dispatch(getUserList());
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
      <h1 className="text-center font-bold text-lg">
        Quản lý Thông tin người dùng
      </h1>
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
        dataSource={fSearch(data)}
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
    </div>
  );
};

export default UserList;
