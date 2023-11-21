import React, { useState } from "react";
import { Modal, Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";
import {
  editReportByIdAsync,
  createReportAsync,
} from "../../../redux/reports/reportsSlice";
import isEmpty from "lodash/isEmpty";
import moment from "moment";
import styled from "styled-components";
const { TextArea } = Input;

const layout = {
  labelCol: {
    span: 8,
  },
  wrapperCol: {
    span: 16,
  },
};

const StyledButton = styled(Button)`
  display: block;
  margin-left: auto;
`;

const ReportModal = ({
  selectedReport = {},
  setSelectedReport,
  openModal,
  setOpenModal = () => {},
}) => {
  const [key, setkey] = useState(new Date());
  const dispatch = useDispatch();
  const isEditing = !isEmpty(selectedReport);

  const handleClose = () => {
    setOpenModal(false);
    setSelectedReport(null);
    setkey(new Date());
  };

  const onSave = (values) => {
    const action = isEditing ? editReportByIdAsync : createReportAsync;
    const newValues = isEditing
      ? { id: selectedReport.id, ...values }
      : { ...values, dateCreated: moment().format() };
    dispatch(action(newValues));
    handleClose();
  };

  const initialValues = isEditing
    ? {
        title: selectedReport.title,
        content: selectedReport.content,
      }
    : {};

  return (
    <Modal
      title={isEditing ? "Edit report" : "Create new report"}
      open={openModal}
      onCancel={handleClose}
      footer={null}
    >
      <Form
        key={key}
        initialValues={initialValues}
        name="reports-form"
        onFinish={onSave}
        {...layout}
      >
        <Form.Item name="title" label="Title">
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content">
          <TextArea />
        </Form.Item>
        <Form.Item
          wrapperCol={{
            ...layout.wrapperCol,
            offset: 8,
          }}
        >
          <StyledButton type="primary" htmlType="submit">
            {isEditing ? "Save" : "Create"}
          </StyledButton>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReportModal;
