import { createSlice } from "@reduxjs/toolkit";

const reportsSlice = createSlice({
  name: "reports",
  initialState: {
    data: [],
    loading: false,
    error: null,
  },
  reducers: {
    fetchReportsStart: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchReportsSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    fetchReportsFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchReportsByUserIdSuccess: (state, action) => {
      state.loading = false;
      state.data = action.payload;
    },
    createReportSuccess: (state, action) => {
      state.loading = false;
      state.data = [action.payload, ...state.data];
    },
    editReportsByIdSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.map((report) =>
        report.id === action.payload.id ? action.payload : report
      );
    },
    deleteReportByIdSuccess: (state, action) => {
      state.loading = false;
      state.data = state.data.filter((report) => {
        return report.id !== action.payload;
      });
    },
  },
});

export const {
  fetchReportsStart,
  fetchReportsSuccess,
  fetchReportsFailure,
  fetchReportsByUserIdSuccess,
  createReportSuccess,
  editReportsByIdSuccess,
  deleteReportByIdSuccess,
} = reportsSlice.actions;

export const fetchReportsAsync = () => {
  return { type: "reports/fetchReportsAsync" };
};

export const fetchReportsByUserIdAsync = (userId) => {
  return { type: "reports/fetchReportsByUserIdAsync", payload: userId };
};

export const createReportAsync = (report) => {
  return { type: "reports/createReportAsync", payload: report };
};

export const editReportByIdAsync = (report) => {
  return { type: "reports/editReportByIdAsync", payload: report };
};

export const deleteReportByIdAsync = (id) => {
  return { type: "reports/deleteReportByIdAsync", payload: id };
};
export const selectReports = (state) => state.reports.data;
export const selectReportsLoading = (state) => state.reports.loading;
export const selectReportsError = (state) => state.reports.error;

export default reportsSlice.reducer;
