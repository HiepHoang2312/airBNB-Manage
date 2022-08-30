import { AppDispatch, RootState } from "configStore";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import {
  addRoom,
  deleteRoom,
  editImageRoom,
  editRoom,
  getRoomListbyLocation,
} from "Slices/Room";
import type { ColumnsType, TableProps } from "antd/es/table";
import { LocationID, Room } from "Interface/room";
import Swal from "sweetalert2";

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
import type { UploadProps } from "antd";
import { NavLink } from "react-router-dom";
const LocationInfo = () => {
  const { LocationId } = useParams();

  const [locationIdValue, setLocationIdValue] = useState("");
  const [locationIdValue1, setLocationIdValue1] = useState("");

  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getRoomListbyLocation(LocationId!));
  }, []);
  const { roomsbyLocation, isloading, error } = useSelector(
    (state: RootState) => state.room,
  );

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
  /* Sửa ảnh */
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
          dispatch(getRoomListbyLocation(LocationId!));
        } else {
          Swal.fire({
            title: `Sửa thất bại`,
          });
        }
      });
    setVisibleImage(false);
    SetEditFormImageValue(undefined);
  };
  /*end Sửa ảnh */
  /* xóa Phòng */
  async function handledeleteRoom(id: string) {
    await dispatch(deleteRoom(id))
      .unwrap()
      .then((result) => {
        if (result._id) {
          console.log(result, "12");
          Swal.fire({
            title: `Xóa thành công`,
          });
          dispatch(getRoomListbyLocation(LocationId!));
        } else {
          Swal.fire({
            title: `Xóa thất bại`,
          });
        }
      });
  }
  /*end xóa Phòng */
  /* get formList */
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
            block
            type="primary"
            onClick={() => {
              setVisibleEditRoom(true);
              setRoomvalue(record);
              setLocationIdValue1(LocationId!);
              console.log(record, "haha");
            }}
          >
            Sửa
          </Button>
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
  /* end formList */
  const onChange: TableProps<Room>["onChange"] = (
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

  const [q, setQ] = useState("");
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQ(e.target.value?.toLowerCase());
  };
  const fSearch = (rows: Room[]) => {
    return rows.filter((row) => row?.name?.toLowerCase().indexOf(q) > -1);
  };
  /*end search */
  /* Form thêm */
  interface CollectionCreateFormProps {
    visible: boolean;
    onCreate: (values: Room) => void;
    onCancel: () => void;
  }
  const CollectionCreateForm: React.FC<CollectionCreateFormProps> = ({
    visible,
    onCreate,
    onCancel,
  }) => {
    const [form] = Form.useForm();
    if (locationIdValue) {
      form.setFieldsValue({
        locationId: locationIdValue,
      });
    }
    return (
      <Modal
        visible={visible}
        title="Thêm phòng"
        okText="Thêm"
        cancelText="hủy"
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
          <Row>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="locationId"
                label="Id địa danh"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="name"
                label="Tên phòng"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <Input type="textarea" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="guests"
                label="Số lượng khách"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="bedRoom"
                label="Số lượng phòng ngủ"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="bath"
                label="Số lượng phòng tắm"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="price"
                label="Giá phòng"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={100000} addonAfter="VNĐ" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Thang máy"
                valuePropName="checked"
                name="elevator"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Bồn nước nóng"
                valuePropName="checked"
                name="hotTub"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Hồ bơi" valuePropName="checked" name="pool">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Lò sưởi trong nhà"
                valuePropName="checked"
                name="indoorFireplace"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Máy sấy" valuePropName="checked" name="dryer">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Phòng gym" valuePropName="checked" name="gym">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Bếp" valuePropName="checked" name="kitchen">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Wifi" valuePropName="checked" name="wifi">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Hệ thống sưởi"
                valuePropName="checked"
                name="heating"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Truyền hình cáp"
                valuePropName="checked"
                name="cableTV"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  };
  /*end Form thêm */
  /* Thêm */
  const [visible, setVisible] = useState(false);

  const onCreate = (values: Room) => {
    console.log(values);
    dispatch(addRoom(values))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Thêm Thành công`,
          });
          dispatch(getRoomListbyLocation(LocationId!));
        } else {
          Swal.fire({
            title: `Thêm thất bại`,
          });
        }
      });
    setVisible(false);
    setLocationIdValue("");
  };
  /*end Thêm */
  /* sửa phòng */
  const [visibleEditRoom, setVisibleEditRoom] = useState(false);
  const [roomValue, setRoomvalue] = useState<Room>();
  const onEditRoom = (values: Room) => {
    dispatch(editRoom(values))
      .unwrap()
      .then((result) => {
        if (result._id) {
          Swal.fire({
            title: `Sửa Thành công`,
          });
          dispatch(getRoomListbyLocation(LocationId!));
        } else {
          Swal.fire({
            title: `Sửa thất bại`,
          });
        }
      });
    setVisibleEditRoom(false);
    setRoomvalue(undefined);
    setLocationIdValue1("");
  };
  /*end sửa phòng */

  /*form sửa  phòng*/
  interface PropEdit {
    visibleEditRoom: boolean;
    onCreate: (values: Room) => void;
    onCancelEditRoom: () => void;
  }
  const FormEditRoom: React.FC<PropEdit> = ({
    visibleEditRoom,
    onCreate,
    onCancelEditRoom,
  }) => {
    const [form] = Form.useForm();
    if (locationIdValue1) {
      form.setFieldsValue({
        locationId: locationIdValue1,
      });
    }
    if (roomValue) {
      form.setFieldsValue({
        _id: roomValue?._id,
        name: roomValue?.name,
        description: roomValue?.description,
        guests: roomValue?.guests,
        bedRoom: roomValue?.bedRoom,
        bath: roomValue?.bath,
        price: roomValue?.price,
        elevator: roomValue?.elevator,
        pool: roomValue?.pool,
        dryer: roomValue?.dryer,
        indoorFireplace: roomValue?.indoorFireplace,
        gym: roomValue?.gym,
        kitchen: roomValue?.kitchen,
        wifi: roomValue?.wifi,
        heating: roomValue?.heating,
        cableTV: roomValue?.cableTV,
        hotTub: roomValue?.hotTub,
      });
    }
    return (
      <Modal
        visible={visibleEditRoom}
        title="Sửa phòng"
        okText="Sửa"
        cancelText="hủy"
        onCancel={onCancelEditRoom}
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
          <Row>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="locationId"
                label="Id địa danh"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="_id"
                label="Id phòng"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <Input disabled />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="name"
                label="Tên phòng"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="description"
                label="Mô tả"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <Input type="textarea" />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="guests"
                label="Số lượng khách"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="bedRoom"
                label="Số lượng phòng ngủ"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="bath"
                label="Số lượng phòng tắm"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                name="price"
                label="Giá phòng"
                rules={[
                  {
                    required: true,
                    message: "Không được bỏ trống!",
                  },
                ]}
              >
                <InputNumber min={1} />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Thang máy"
                valuePropName="checked"
                name="elevator"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Bồn nước nóng"
                valuePropName="checked"
                name="hotTub"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Hồ bơi" valuePropName="checked" name="pool">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Lò sưởi trong nhà"
                valuePropName="checked"
                name="indoorFireplace"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Máy sấy" valuePropName="checked" name="dryer">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Phòng gym" valuePropName="checked" name="gym">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Bếp" valuePropName="checked" name="kitchen">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item label="Wifi" valuePropName="checked" name="wifi">
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Hệ thống sưởi"
                valuePropName="checked"
                name="heating"
              >
                <Switch />
              </Form.Item>
            </Col>
            <Col sm={12} xs={24} className="pr-2">
              <Form.Item
                label="Truyền hình cáp"
                valuePropName="checked"
                name="cableTV"
              >
                <Switch />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    );
  };
  /*end form sửa phòng*/
  return (
    <div>
      <h1 className="text-center font-bold text-lg">
        Danh sách phòng của địa danh
        <span> {roomsbyLocation[0]?.locationId?.name}</span>
      </h1>
      <Row>
        <Col lg={{ span: 6 }} md={{ span: 8 }} className="mr-5 ">
          <Search
            className="mb-2 text-red"
            placeholder="Tìm theo tên phòng"
            onSearch={onSearch}
            onChange={handleSearch}
          />
        </Col>
        <Col lg={{ span: 6 }} md={{ span: 8 }} className="mb-2 ">
          <Button
            type="primary"
            danger
            onClick={() => {
              setVisible(true);
              setLocationIdValue(LocationId!);
            }}
          >
            Thêm phòng
          </Button>
        </Col>
      </Row>
      <Table
        rowKey={(record) => record._id}
        columns={columns}
        dataSource={fSearch(roomsbyLocation)}
        onChange={onChange}
        scroll={{ x: 800 }}
        bordered
      />
      <FormEditImage
        visibleImage={visibleImage}
        onCreate={onChangeImage}
        onCancel={() => {
          setVisibleImage(false);
          SetEditFormImageValue(undefined);
        }}
      />
      <CollectionCreateForm
        visible={visible}
        onCreate={onCreate}
        onCancel={() => {
          setVisible(false);
          setLocationIdValue("");
        }}
      />
      <FormEditRoom
        visibleEditRoom={visibleEditRoom}
        onCreate={onEditRoom}
        onCancelEditRoom={() => {
          setVisibleEditRoom(false);
          setRoomvalue(undefined);
          setLocationIdValue1("");
        }}
      />
    </div>
  );
};

export default LocationInfo;
