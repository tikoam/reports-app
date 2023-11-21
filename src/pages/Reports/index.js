import React, { useEffect, memo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchReportsAsync,
  selectReports,
  selectReportsLoading,
  selectReportsError,
  deleteReportByIdAsync,
} from "../../redux/reports/reportsSlice";
import isEmpty from "lodash/isEmpty";
import styled from "styled-components";
import { Modal, Table, Button, message } from "antd";
import ReportModal from "./components/ReportModal";
import reportColumns from "./components/reportsColumns";

const { confirm } = Modal;

const StyledWrapper = styled("div")`
  padding: 20px;
  height: 100vh;
  overflow: auto;
  text-align: right;
`;
const StyledButton = styled(Button)`
  display: flex;
  align-items: center;
  padding: 20px 60px;
  font-size: 14px;
  font-weight: 600;
  margin-left: auto;
`;


const Reports = () => {
  const [selectedReport, setSelectedReport] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const reports = useSelector(selectReports);
  const loading = useSelector(selectReportsLoading);
  const error = useSelector(selectReportsError);
  const dispatch = useDispatch();

  const fetchData = () => {
    dispatch(fetchReportsAsync(reports.length | 0));
  };
  useEffect(() => {
    if (isEmpty(reports)) {
      fetchData();
    }
  }, [dispatch, reports, fetchData]);

  function onRemoveClick(reportId) {
    confirm({
      title: "Delete report",
      content: "Do you want to delete the report?",
      cancelText: "Cancel",
      onOk() {
        dispatch(deleteReportByIdAsync(reportId));
      },
    });
  }

  const handleCreateReport = () => {
    setOpenModal(true);
    setSelectedReport(null);
  };

  if(error){
    message.error(error)
  }

  return (
    <StyledWrapper id="scrollableDiv">
      <StyledButton onClick={handleCreateReport} type="primary">
        Create
      </StyledButton>
      <Table
        columns={reportColumns(reports, setSelectedReport, setOpenModal, onRemoveClick)}
        dataSource={reports}
        rowKey={(record) => record.id}
        loading={loading}
      />
      <ReportModal
        selectedReport={selectedReport}
        setSelectedReport={setSelectedReport}
        openModal={openModal}
        setOpenModal={setOpenModal}
      />
    </StyledWrapper>
  );
};

export default memo(Reports);
