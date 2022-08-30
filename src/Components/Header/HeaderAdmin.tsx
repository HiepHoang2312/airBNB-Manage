import { Avatar } from "antd";

import styles from "_Playground/Header/Header.module.scss";
import { useEffect, useRef, useState } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "configStore";
import { getUserDetail } from "Slices/User";
const HeaderAdmin = () => {
  const [visiable, SetVisiable] = useState(false);
  const dispatch = useDispatch<AppDispatch>();
  useEffect(() => {
    dispatch(getUserDetail(userId));
  }, []);
  const loginMenu = useRef(null);
  const handClickOutSite = () => {
    SetVisiable(false);
  };
  const { userDetail } = useSelector((state: RootState) => state.user);
  useOnClickOutside(loginMenu, handClickOutSite);

  const userId = localStorage.getItem("user")
    ? JSON.parse(localStorage.getItem("user") as string)._id
    : "";
  const handleChange = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("type");
    localStorage.removeItem("token");
    window.location.reload();
  };
  const handleClick = () => {
    SetVisiable(!visiable);
  };
  return (
    <div className={styles.header}>
      <div className="relative" ref={loginMenu}>
        <button className={styles.ButtonUser} onClick={handleClick}>
          <div className="mr-2">
            <svg
              viewBox="0 0 32 32"
              xmlns="http://www.w3.org/2000/svg"
              aria-hidden="true"
              role="presentation"
              focusable="false"
              style={{
                display: "block",
                fill: "none",
                height: 16,
                width: 16,
                stroke: "currentcolor",
                strokeWidth: 3,
                overflow: "visible",
              }}
            >
              <g fill="none" fillRule="nonzero">
                <path d="m2 16h28" />
                <path d="m2 24h28" />
                <path d="m2 8h28" />
              </g>
            </svg>
          </div>
          <Avatar src={userDetail?.avatar}></Avatar>
        </button>

        <div
          className={
            visiable
              ? "absolute right-0  bg-white z-50 rounded-md shadow-lg  flex flex-col   w-40"
              : "hidden"
          }
        >
          <NavLink
            to={`User/UserInfo/${userId}`}
            className="hover:bg-gray-100 mt-1 transition-all duration-200 leading-none py-2 px-5 "
          >
            Thông tin cá nhân
          </NavLink>
          <button
            onClick={handleChange}
            className="hover:bg-gray-100  transition-all duration-200 leading-none py-2 px-5 "
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default HeaderAdmin;
