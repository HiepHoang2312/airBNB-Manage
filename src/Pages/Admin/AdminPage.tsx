import { Breadcrumb, Layout } from "antd";

import { NavLink, Outlet, useLocation } from "react-router-dom";

const AdminPage = () => {
  const { Content } = Layout;
  const pathLocation = useLocation();
  const getPath = pathLocation.pathname;
  const path = getPath.split("/").filter((item) => item);
  return (
    <Content
      className="site-layout-background"
      style={{
        margin: "24px 16px",
        padding: 24,
        minHeight: 360,
      }}
    >
      <Breadcrumb style={{ margin: "16px 0" }}>
        {path.map((paths, index) => {
          const route = `/${path.slice(0, index + 1).join("/")}`;
          const chan = index % 2 === 0 && index > 1;

          const isLast = index === path.length - 1;

          return chan ? (
            <Breadcrumb.Item key={index}>{paths}</Breadcrumb.Item>
          ) : (
            <Breadcrumb.Item key={index}>
              <NavLink key={index} to={`${route}`}>
                {paths}
              </NavLink>
            </Breadcrumb.Item>
          );
        })}
      </Breadcrumb>
      <Outlet></Outlet>
    </Content>
  );
};

export default AdminPage;
