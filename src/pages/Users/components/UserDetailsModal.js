import React, { memo, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchReportsByUserIdAsync } from "../../../redux/reports/reportsSlice";
import { Modal } from "antd";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";

const StyledTitle = styled("p")`
  color: rgba(0, 0, 0, 0.88);
  font-weight: 600;
  font-size: 16px;
`;

const UserDetailsModal = ({ selectedUser = {}, setSelectedUser }) => {
  let reports = useSelector((state) => state.reports.data);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchReportsByUserIdAsync(selectedUser.id));
  }, [selectedUser, dispatch]);

  const handleClose = () => {
    setSelectedUser(null);
  };

  return (
    <Modal
      title="User Details"
      open={selectedUser}
      onCancel={handleClose}
      footer={null}
    >
      <div>
        <p>
          <strong>Name:</strong> {selectedUser.name}
        </p>
        <p>
          <strong>Email:</strong> {selectedUser.email}
        </p>
      </div>
      {!isEmpty(reports) && (
        <>
          <StyledTitle>Reports</StyledTitle>
          {reports.map((report, index) => (
            <span key={report.id}>
              {report.title}
              {index < reports.length - 1 && ", "}
            </span>
          ))}
        </>
      )}
    </Modal>
  );
};

export default memo(UserDetailsModal);
