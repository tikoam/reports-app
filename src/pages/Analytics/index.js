import React, { useEffect } from "react";
import ReportsChart from "./components/ReportsChart";
import { useSelector, useDispatch } from "react-redux";
import {
  fetchReportsAsync,
  selectReports,
  selectReportsError,
  selectReportsLoading,
} from "../../redux/reports/reportsSlice";
import {
  selectUsersError,
  selectUsersLoading,
} from "../../redux/users/usersSlice";
import Loading from "../../components/Loading";
import { message } from "antd";

const Analytics = () => {
  const reportsData = useSelector(selectReports);
  const reportsLoading = useSelector(selectReportsLoading);
  const usersLoading = useSelector(selectUsersLoading);
  const reportsError = useSelector(selectReportsError);
  const usersError = useSelector(selectUsersError);

  const loading = reportsLoading || usersLoading;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchReportsAsync(reportsData.length | 0));
  }, [dispatch, reportsData.length]);

  const monthlyReports = reportsData.reduce((acc, report) => {
    const month = report.dateCreated.substring(0, 7);
    acc[month] = (acc[month] || 0) + 1;
    return acc;
  }, {});

  const reportsPerUser = reportsData.reduce((acc, report) => {
    const userName = report.userName;
    acc[userName] = (acc[userName] || 0) + 1;
    return acc;
  }, {});

  const monthlyReportsChartData = Object.keys(monthlyReports).map((month) => ({
    month,
    reports: monthlyReports[month],
  }));

  const usersChartData = Object.keys(reportsPerUser).map((userName) => ({
    userName,
    reportsCount: reportsPerUser[userName],
  }));

  if (loading) {
    return <Loading />;
  }
  if (reportsError || usersError) {
    if (reportsError) {
      message.error(reportsError);
      return;
    }
    message.error(usersError);
  }

  return (
    <ReportsChart data={monthlyReportsChartData} usersData={usersChartData} />
  );
};

export default Analytics;
