import React from "react";
import classes from "./Chart.module.css";
import {
  LineChart,
  Line,
  XAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function Chart({title, data, dataKey, grid}) {
  return (
    <div className={classes.chart}>
      <h3 className={classes.chartTitle}>{title}</h3>
      <ResponsiveContainer width="99%" aspect={3}>
        <LineChart data={data}>
          {grid && <CartesianGrid strokeDasharray="3 3" />}
          <XAxis dataKey="name" stroke="#5550bd" />
          <Line
            type="monotone"
            dataKey={dataKey}
            stroke="#8884d8"
            activeDot={{ r: 8 }}
          />
          <Tooltip />
          <Legend />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;
