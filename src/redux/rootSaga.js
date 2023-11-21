import { all } from "redux-saga/effects";
import usersSaga from "../redux/users/usersSaga";
import {
  reportsSaga,
  reportsByUserIdSaga,
  createReportSaga,
  editReportByIdSaga,
  deleteReportByIdSaga,
} from "../redux/reports/reportsSaga";

export default function* rootSaga() {
  yield all([
    usersSaga(),
    reportsSaga(),
    reportsByUserIdSaga(),
    createReportSaga(),
    editReportByIdSaga(),
    deleteReportByIdSaga(),
  ]);
}
