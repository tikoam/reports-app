import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchUsersAsync,
  selectUsers,
  selectUsersLoading,
  selectUsersError,
} from "../../redux/users/usersSlice";
import InfiniteScroll from "react-infinite-scroll-component";
import UserDetailsModal from "./components/UserDetailsModal.js";
import isEmpty from "lodash/isEmpty";
import List from "../../components/List.js";
import styled from "styled-components";
import { message } from "antd";

const StyledWrapper = styled('div')`
  height: 100%;
  overflow: auto;
  padding: 0 16px;
`;

const Users = () => {
  const [selectedUser, setSelectedUser] = useState(null);
  const users = useSelector(selectUsers);
  const loading = useSelector(selectUsersLoading);
  const error = useSelector(selectUsersError);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchUsersAsync(users.length | 0));
  };

  useEffect(() => {
    if (isEmpty(users)) {
      fetchData();
    }
  }, [dispatch, users, fetchData]);

  if(error){
    message.error(error)
  }

  return (
    <StyledWrapper
      id="scrollableDiv"
    >
      <InfiniteScroll
        dataLength={users.length}
        next={fetchData}
        hasMore={true}
        scrollableTarget="scrollableDiv"
        scrollThreshold={0.9}
      >
        <List data={users} setSelectedUser={setSelectedUser} loading={loading}/>
        {selectedUser && (
          <UserDetailsModal
            selectedUser={selectedUser}
            setSelectedUser={setSelectedUser}
          />
        )}
      </InfiniteScroll>
    </StyledWrapper>
  );
};

export default memo(Users);
