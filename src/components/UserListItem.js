import React, { memo } from "react";
import { List } from "antd";
import UserAvatar from "./Avatar";
import styled from "styled-components";

const StyledListItem = styled(List.Item.Meta)`
  align-items: center !important;
  cursor: pointer;
`;

const UserListItem = ({ user, setSelectedUser }) => {
  return (
    <List.Item key={user.id} onClick={() => setSelectedUser(user)}>
      <StyledListItem
        title={user.name}
        avatar={<UserAvatar name={user.name} />}
        description={user.email}
      />
    </List.Item>
  );
};

export default memo(UserListItem);
