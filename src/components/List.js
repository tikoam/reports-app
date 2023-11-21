import React, { memo } from "react";
import { List } from "antd";
import UserListItem from "./UserListItem";
import styled from "styled-components";

const StyledList = styled(List)`
  text-align: start;
  padding: 60px 10px;
`;

const DataList = ({ data, loading, setSelectedUser }) => {
  return (
    <StyledList
      loading={loading}
      dataSource={data}
      renderItem={(user) => (
        <UserListItem user={user} setSelectedUser={setSelectedUser} />
      )}
    />
  );
};

export default memo(DataList);
