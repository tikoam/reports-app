import React from "react";
import { Avatar } from "antd";
import styled from "styled-components";

const StyledWrapper = styled(Avatar)`
  display: block;
  text-align: center;
  color: gray;
  background-color: #e7e7e7;
  border-radius: 50%;
`;
const UserAvatar = ({ name }) => {
  const initials = name ? name.charAt(0).toUpperCase() : "";
  return <StyledWrapper size={32}>{initials}</StyledWrapper>;
};

export default UserAvatar;
