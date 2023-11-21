import { combineReducers } from "redux";
import usersReducer from "../redux/users/usersSlice";
import reportsReducer from "../redux/reports/reportsSlice";

const rootReducer = combineReducers({
  users: usersReducer,
  reports: reportsReducer,
});

export default rootReducer;
