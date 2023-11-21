import { takeEvery, call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
  fetchReportsStart,
  fetchReportsSuccess,
  fetchReportsFailure,
  fetchReportsByUserIdSuccess,
  createReportSuccess,
  editReportsByIdSuccess,
  deleteReportByIdSuccess
} from './reportsSlice';
import find from 'lodash/find';
import moment from 'moment';

function* fetchReportsAsync() {
  try {
    yield put(fetchReportsStart());
    const reports = yield call(axios.get, `http://localhost:3001/reports`);
    const users = yield call(axios.get, `http://localhost:3001/users`);
    const mergedData = reports.data.map(report => ({
      ...report,
      userName: find(users.data, { id: report.userId })?.name || "Anonymous User"
    })).sort((a,b)=>moment(b.dateCreated) - moment(a.dateCreated));
    yield put(fetchReportsSuccess(mergedData));
  } catch (error) {
    yield put(fetchReportsFailure(error.message));
  }
}

function* fetchReportsByUserIdAsync(action) {
  try {
    yield put(fetchReportsStart());
    const response = yield call(axios.get, `http://localhost:3001/reports?userId=${action.payload}`);
    yield put(fetchReportsByUserIdSuccess(response.data));
  } catch (error) {
    yield put(fetchReportsFailure(error.message));
  }
}

function* createReportAsync(action) {
  try {
    yield put(fetchReportsStart());
    const response = yield call(axios.post, `http://localhost:3001/reports`, action.payload);
    response.data.userName = "Anonymous User"
    yield put(createReportSuccess(response.data));
  } catch (error) {
    yield put(fetchReportsFailure(error.message));
  }
}

function* editReportByIdAsync(action) {
  try {
    yield put(fetchReportsStart());
    const reports = yield call(axios.patch, `http://localhost:3001/reports/${action.payload.id}`, action.payload);
    const users = yield call(axios.get, `http://localhost:3001/users`);
    const mergedData = {
      ...reports.data,
      userName: find(users.data, { id: reports.userId })?.name || "Anonymous User"
    }
    yield put(editReportsByIdSuccess(mergedData));
  } catch (error) {
    yield put(fetchReportsFailure(error.message));
  }
}

function* deleteReportByIdAsync(action) {
  try {
    yield put(fetchReportsStart());
    yield call(axios.delete, `http://localhost:3001/reports/${action.payload}`);
    yield put(deleteReportByIdSuccess(action.payload));
  } catch (error) {
    yield put(fetchReportsFailure(error.message));
  }
}

export function* reportsSaga() {
  yield takeEvery('reports/fetchReportsAsync', fetchReportsAsync);
}

export function* reportsByUserIdSaga() {
  yield takeEvery('reports/fetchReportsByUserIdAsync', fetchReportsByUserIdAsync);
}

export function* createReportSaga() {
  yield takeEvery('reports/createReportAsync', createReportAsync);
}

export function* editReportByIdSaga() {
  yield takeEvery('reports/editReportByIdAsync', editReportByIdAsync);
}

export function* deleteReportByIdSaga() {
  yield takeEvery('reports/deleteReportByIdAsync', deleteReportByIdAsync);
}