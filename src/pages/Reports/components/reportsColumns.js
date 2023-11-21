import React from "react";
import moment from "moment";
import { Space } from "antd";
import styled from "styled-components";

const StyledSpan = styled("span")`
  color: blue;
  &:hover {
    cursor: pointer;
  }
`;
const getUniqueUsernames = (data) => {
  const usernamesSet = new Set();
  data.forEach((item) => {
    if (item.userName) {
      usernamesSet.add(item.userName);
    }
  });
  return Array.from(usernamesSet);
};

const reportColumns = (
  reports = [],
  setSelectedReport = () => {},
  setOpenModal = false,
  onRemoveClick = () => {}
) => [
  {
    title: "Title",
    dataIndex: "title",
    filters: getUniqueUsernames(reports).map((username) => ({
      text: username,
      value: username,
    })),
    filterMode: "tree",
    onFilter: (value, record) => (record.userName || "").includes(value),
    width: "20%",
  },
  {
    title: "Content",
    dataIndex: "content",
    width: "30%",
  },
  {
    title: "User",
    dataIndex: "userName",
    width: "20%",
  },
  {
    title: "Created Date",
    dataIndex: "dateCreated",
    render: (text) => moment(text).format("YYYY-MM-DD"),
    sorter: (a, b) => moment(a.dateCreated) - moment(b.dateCreated),
    width: "15%",
  },
  {
    title: "Action",
    key: "action",
    width: "15%",
    render: (report) => (
      <Space>
        <StyledSpan
          onClick={() => {
            setSelectedReport(report);
            setOpenModal(true);
          }}
        >
          Edit
        </StyledSpan>
        <StyledSpan onClick={() => onRemoveClick(report.id)}>Delete</StyledSpan>
      </Space>
    ),
  },
];

export default reportColumns;
