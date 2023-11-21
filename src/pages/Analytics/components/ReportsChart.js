import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const ReportsChart = ({ data, usersData }) => {
  const monthChartColor = "#8884d8";
  const userChartColor = "#82ca9d";
  return (
    <div>
      <h2>Analytics for Reports Created Each Month</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart
          width={600}
          height={400}
          data={data}
          margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend
            payload={[
              {
                value: "Reports per Month",
                type: "line",
                color: monthChartColor,
              },
            ]}
          />
          <Bar dataKey="reports" fill={monthChartColor} />
        </BarChart>
      </ResponsiveContainer>
      <h2>Analytics for Reports per User</h2>
      <ResponsiveContainer width="100%" height={400}>
        <BarChart width={600} height={400} data={usersData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="userName" />
          <YAxis />
          <Tooltip />
          <Legend
            payload={[
              {
                value: "Reports per User",
                type: "line",
                color: userChartColor,
              },
            ]}
          />
          <Bar dataKey="reportsCount" fill={userChartColor} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default ReportsChart;
