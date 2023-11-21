import React from "react";
import { Layout } from "antd";
import { BrowserRouter } from "react-router-dom";
import Routes from "../Routes";
import Sider from "./components/Sider";
import styled from "styled-components";
const { Content } = Layout;

const StyledContent = styled(Content)`
  height: 100vh;
  background: white;
`;
const StyledLayout = styled(Layout)`
  margin-left: 200px;
  @media (max-width: 767px) {
    margin-left: 30px;
  }
`;

const AppLayout = () => {
  return (
      <BrowserRouter>
        <Layout hasSider>
          <Sider />
        </Layout>
        <StyledLayout>
          <StyledContent>
            <Routes />
          </StyledContent>
        </StyledLayout>
      </BrowserRouter>
  );
};

export default AppLayout;
