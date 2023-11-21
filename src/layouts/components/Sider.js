import React from "react";
import { Layout, Menu } from "antd";
import styled from "styled-components";
import { Link, useLocation } from "react-router-dom";

const { Sider } = Layout;

const StyledSider = styled(Sider)`
  height: 100vh;
  position: fixed !important;
  background: none !important;
  left: 0;
  top: 0;
  bottom: 0;
  z-index: 3;
`;
const StyledMenu = styled(Menu)`
  height: 100vh;
`;
const menuItems = [
  { key: "1", label: <Link to="users">Users</Link>, pathname: "/users" },
  { key: "2", label: <Link to="reports">Reports</Link>, pathname: "/reports" },
  {
    key: "3",
    label: <Link to="analytics">Analytics</Link>,
    pathname: "/analytics",
  },
];

const CutsomSider = () => {
  const location = useLocation();

  const currentLocation = () => {
    return (
      menuItems.find((item) => item.pathname === location.pathname)?.key || "1"
    );
  };

  return (
    <StyledSider breakpoint="md" collapsedWidth="0" theme="light">
      <StyledMenu
        theme="light"
        mode="inline"
        defaultSelectedKeys={currentLocation}
        items={menuItems}
      />
    </StyledSider>
  );
};

export default CutsomSider;
