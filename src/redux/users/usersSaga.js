import { takeEvery, call, put } from "redux-saga/effects";
import axios from "axios";
import {
  fetchUsersStart,
  fetchUsersSuccess,
  fetchUsersFailure,
} from "./usersSlice";

function* fetchUsersAsync(action) {
  try {
    yield put(fetchUsersStart());
    const response = yield call(
      axios.get,
      `http://localhost:3001/users?_start=${action.payload}&_limit=20`
    );
    yield put(fetchUsersSuccess(response.data));
  } catch (error) {
    yield put(fetchUsersFailure(error.message));
  }
}

export default function* usersSaga() {
  yield takeEvery("users/fetchUsersAsync", fetchUsersAsync);
}
