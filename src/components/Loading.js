import React from "react";
import { Spin } from "antd";
import styled from "styled-components";

const StyledSpin = styled('div')`
  display: flex;
  height: 100vh;
  max-height: unset;
  align-items: center;
  justify-content: center;
`;
const Loading = () => {
  return (
    <StyledSpin>
      <Spin size="large" />
    </StyledSpin>
  );
};

export default Loading;
