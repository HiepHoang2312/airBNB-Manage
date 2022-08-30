import { Row, Col } from "antd";
import { AppDispatch, RootState } from "configStore";
import { RoomDetail } from "Interface/room";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getRoomDetail } from "Slices/Room";

const RoomInfo = () => {
  const { RoomId } = useParams();
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getRoomDetail(RoomId!));
  }, []);
  const { roomDetail, isloading, error } = useSelector(
    (state: RootState) => state.room,
  );
  console.log(roomDetail);
  return (
    <div>
      <Row>
        <Col lg={10} xs={24} className="pl-5 mt-5 mb-5">
          <h1 className="text-3xl">{roomDetail?.name}</h1>

          <h2 className="underline">
            {roomDetail?.locationId?.province},{roomDetail?.locationId?.country}
          </h2>
          <div className="text-gray-500">Mô tả: {roomDetail?.description}</div>
          <div className="grid grid-cols-2 gap-2">
            <div className="col-span-2 ">
              <h1 className="text-3xl">Tiện nghi</h1>
            </div>
            <div className={roomDetail?.wifi === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="m15.9999 20.33323c2.0250459 0 3.66667 1.6416241 3.66667 3.66667s-1.6416241 3.66667-3.66667 3.66667-3.66667-1.6416241-3.66667-3.66667 1.6416241-3.66667 3.66667-3.66667zm0 2c-.9204764 0-1.66667.7461936-1.66667 1.66667s.7461936 1.66667 1.66667 1.66667 1.66667-.7461936 1.66667-1.66667-.7461936-1.66667-1.66667-1.66667zm.0001-7.33323c3.5168171 0 6.5625093 2.0171251 8.0432368 4.9575354l-1.5143264 1.5127043c-1.0142061-2.615688-3.5549814-4.4702397-6.5289104-4.4702397s-5.5147043 1.8545517-6.52891042 4.4702397l-1.51382132-1.5137072c1.48091492-2.939866 4.52631444-4.9565325 8.04273174-4.9565325zm.0001-5.3332c4.9804693 0 9.3676401 2.540213 11.9365919 6.3957185l-1.4470949 1.4473863c-2.1746764-3.5072732-6.0593053-5.8431048-10.489497-5.8431048s-8.31482064 2.3358316-10.48949703 5.8431048l-1.44709488-1.4473863c2.56895177-3.8555055 6.95612261-6.3957185 11.93659191-6.3957185zm-.0002-5.3336c6.4510616 0 12.1766693 3.10603731 15.7629187 7.9042075l-1.4304978 1.4309874c-3.2086497-4.44342277-8.4328305-7.3351949-14.3324209-7.3351949-5.8991465 0-11.12298511 2.89133703-14.33169668 7.334192l-1.43047422-1.4309849c3.58629751-4.79760153 9.31155768-7.9032071 15.7621709-7.9032071z" />
                </svg>{" "}
              </div>
              <div>Wifi</div>
            </div>
            <div className={roomDetail?.kitchen === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="M26 1a5 5 0 0 1 5 5c0 6.389-1.592 13.187-4 14.693V31h-2V20.694c-2.364-1.478-3.942-8.062-3.998-14.349L21 6l.005-.217A5 5 0 0 1 26 1zm-9 0v18.118c2.317.557 4 3.01 4 5.882 0 3.27-2.183 6-5 6s-5-2.73-5-6c0-2.872 1.683-5.326 4-5.882V1zM2 1h1c4.47 0 6.934 6.365 6.999 18.505L10 21H3.999L4 31H2zm14 20c-1.602 0-3 1.748-3 4s1.398 4 3 4 3-1.748 3-4-1.398-4-3-4zM4 3.239V19h3.995l-.017-.964-.027-.949C7.673 9.157 6.235 4.623 4.224 3.364l-.12-.07zm19.005 2.585L23 6l.002.31c.045 4.321 1.031 9.133 1.999 11.39V3.17a3.002 3.002 0 0 0-1.996 2.654zm3.996-2.653v14.526C27.99 15.387 29 10.4 29 6a3.001 3.001 0 0 0-2-2.829z" />
                </svg>
              </div>
              <div>Bếp</div>
            </div>
            <div className={roomDetail?.gym === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="M10 5a2 2 0 0 1 1.995 1.85L12 7v8h8V7a2 2 0 0 1 1.85-1.995L22 5h2a2 2 0 0 1 1.995 1.85L26 7v2h2a2 2 0 0 1 1.995 1.85L30 11v4h2v2h-2v4a2 2 0 0 1-1.85 1.995L28 23h-2v2a2 2 0 0 1-1.85 1.995L24 27h-2a2 2 0 0 1-1.995-1.85L20 25v-8h-8v8a2 2 0 0 1-1.85 1.995L10 27H8a2 2 0 0 1-1.995-1.85L6 25v-2H4a2 2 0 0 1-1.995-1.85L2 21v-4H0v-2h2v-4a2 2 0 0 1 1.85-1.995L4 9h2V7a2 2 0 0 1 1.85-1.995L8 5zm14 2h-2v18h2zM10 7H8v18h2zm18 4h-2v10h2zM6 11H4v10h2z" />
                </svg>
              </div>
              <div>Phòng tập gym</div>
            </div>
            <div className={roomDetail?.heating === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="M16 0a5 5 0 0 1 4.995 4.783L21 5l.001 12.756.26.217a7.984 7.984 0 0 1 2.717 5.43l.017.304L24 24a8 8 0 1 1-13.251-6.036l.25-.209L11 5A5 5 0 0 1 15.563.019l.22-.014zm0 2a3 3 0 0 0-2.995 2.824L13 5v13.777l-.428.298a6 6 0 1 0 7.062.15l-.205-.15-.428-.298L19 11h-4V9h4V7h-4V5h4a3 3 0 0 0-3-3zm1 11v7.126A4.002 4.002 0 0 1 16 28a4 4 0 0 1-1-7.874V13zm-1 9a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </div>
              <div>Hệ thống sưởi</div>
            </div>
            <div className={roomDetail?.hotTub === true ? "flex" : "hidden"}>
              <div className="mr-2">
                <i className="fa fa-hot-tub" />
              </div>
              <div>Bồn nước nóng</div>
            </div>
            <div className={roomDetail?.pool === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="M24 26c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 27.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 28c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 28c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 28c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 29.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 26c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 26c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 26zm0-5c.988 0 1.945.351 2.671 1.009.306.276.71.445 1.142.483L28 22.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 23c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 23c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 23c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 24.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 21c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492A3.974 3.974 0 0 1 16 21c.988 0 1.945.351 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.491A3.975 3.975 0 0 1 23.999 21zM20 3a4 4 0 0 1 3.995 3.8L24 7v2h4v2h-4v5c.912 0 1.798.3 2.5.862l.171.147c.306.276.71.445 1.142.483L28 17.5v2l-.228-.006a3.96 3.96 0 0 1-2.443-1.003A1.978 1.978 0 0 0 24 18c-.502 0-.978.175-1.328.491a3.977 3.977 0 0 1-2.67 1.009 3.977 3.977 0 0 1-2.672-1.009A1.978 1.978 0 0 0 16 18c-.503 0-.98.175-1.329.491a3.978 3.978 0 0 1-2.67 1.009 3.978 3.978 0 0 1-2.672-1.008A1.978 1.978 0 0 0 8 18c-.503 0-.98.175-1.33.491a3.96 3.96 0 0 1-2.442 1.003L4 19.5v-2l.187-.008a1.953 1.953 0 0 0 1.142-.483A3.975 3.975 0 0 1 8 16c.988 0 1.945.352 2.671 1.009.35.316.826.49 1.33.491.502 0 .979-.175 1.328-.492a3.956 3.956 0 0 1 2.444-1.002L16 16v-5H4V9h12V7a2 2 0 0 0-3.995-.15L12 7h-2a4 4 0 0 1 7-2.645A3.985 3.985 0 0 1 20 3zm-2 13.523c.16.091.313.194.459.307l.212.179c.35.316.826.49 1.33.491.439 0 .86-.134 1.191-.38l.137-.111c.206-.187.431-.35.67-.486V11h-4zM20 5a2 2 0 0 0-1.995 1.85L18 7v2h4V7a2 2 0 0 0-2-2z" />
                </svg>
              </div>
              <div>Hồ bơi</div>
            </div>
            <div
              className={
                roomDetail?.indoorFireplace === true ? "flex" : "hidden"
              }
            >
              <div className="mr-2">
                <i className="fa fa-dumpster-fire" />
              </div>
              <div>Lò sưởi trong nhà</div>
            </div>
            <div className={roomDetail?.dryer === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="M14 27l-.005.2a4 4 0 0 1-3.789 3.795L10 31H4v-2h6l.15-.005a2 2 0 0 0 1.844-1.838L12 27zM10 1c.536 0 1.067.047 1.58.138l.38.077 17.448 3.64a2 2 0 0 1 1.585 1.792l.007.166v6.374a2 2 0 0 1-1.431 1.917l-.16.04-13.554 2.826 1.767 6.506a2 2 0 0 1-1.753 2.516l-.177.008H11.76a2 2 0 0 1-1.879-1.315l-.048-.15-1.88-6.769A9 9 0 0 1 10 1zm5.692 24l-1.799-6.621-1.806.378a8.998 8.998 0 0 1-1.663.233l-.331.008L11.76 25zM10 3a7 7 0 1 0 1.32 13.875l.331-.07L29 13.187V6.813L11.538 3.169A7.027 7.027 0 0 0 10 3zm0 2a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
                </svg>
              </div>
              <div>Máy sấy</div>
            </div>
            <div className={roomDetail?.cableTV === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="M9 29v-2h2v-2H6a5 5 0 0 1-4.995-4.783L1 20V8a5 5 0 0 1 4.783-4.995L6 3h20a5 5 0 0 1 4.995 4.783L31 8v12a5 5 0 0 1-4.783 4.995L26 25h-5v2h2v2zm10-4h-6v2h6zm7-20H6a3 3 0 0 0-2.995 2.824L3 8v12a3 3 0 0 0 2.824 2.995L6 23h20a3 3 0 0 0 2.995-2.824L29 20V8a3 3 0 0 0-2.824-2.995z" />
                </svg>
              </div>
              <div>TV truyền hình cáp</div>
            </div>
            <div className={roomDetail?.elevator === true ? "flex" : "hidden"}>
              <div className="mr-2">
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
                  <path d="M27 0a2 2 0 0 1 1.995 1.85L29 2v26a2 2 0 0 1-1.85 1.995L27 30H5a2 2 0 0 1-1.995-1.85L3 28V2A2 2 0 0 1 4.85.005L5 0zm0 2H5v26h22zm-3 22a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5.333 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm-5.334 0a1 1 0 1 1 0 2 1 1 0 0 1 0-2zM8 24a1 1 0 1 1 0 2 1 1 0 0 1 0-2zm13-10a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm-10 0a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zm-10 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM21 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zM11 4a4 4 0 1 1 0 8 4 4 0 0 1 0-8zm10 2a2 2 0 1 0 0 4 2 2 0 0 0 0-4zM11 6a2 2 0 1 0 0 4 2 2 0 0 0 0-4z" />
                </svg>
              </div>
              <div>Thang máy</div>
            </div>
            <div className="col-span-2 ">
              <h1 className="text-3xl">Các phòng</h1>
            </div>
            <div className="flex">
              <div className="mr-2">
                <i className="fa fa-bed" />
              </div>
              <div>Phòng ngủ: {roomDetail?.bedRoom} phòng</div>
            </div>
            <div className="flex">
              <div className="mr-2">
                <i className="fa fa-bath" />
              </div>
              <div>Phòng tắm: {roomDetail?.bath} phòng</div>
            </div>
          </div>
        </Col>
        <Col lg={8} xs={24}>
          <div className="mx-auto">
            <img src={roomDetail?.image} className="w-full rounded-xl " />
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default RoomInfo;
