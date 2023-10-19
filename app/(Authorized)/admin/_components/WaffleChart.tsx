"use client";
import React, { PureComponent, useEffect, useState } from "react";
import {
  PieChart,
  Pie,
  Sector,
  Cell,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

const WaffleChart = ({ data }) => {
  const [realdata, setrealdata] = useState([]);
  const [color, setcolor] = useState([]);
  useEffect(() => {
    setrealdata(
      data.labels &&
        data.labels.map((label, index) => {
          console.log(data.data);
          return {
            name: label,
            value: data.data[index],
          };
        })
    );
    setcolor(data.backgroundColor && data.backgroundColor);
  }, [data]);

  const RADIAN = Math.PI / 180;
  const renderer = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent,
    index,
  }: any) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };
  console.log("jdduj", realdata, color);
  return (
    <div className="w-full mb-6 p-4 m-3">
      {" "}
      {data.data && (
        <>
          <h1 className="font-rock font-extralight uppercase text-secondary px-2 text-center text-lg">
            DISTRIBUTIONS
          </h1>
          <div className="w-full flex justify-center items-start">
            <PieChart width={300} height={300}>
              <Pie
                data={realdata && realdata}
                cx="50%"
                cy="39%"
                labelLine={false}
                label={renderer}
                outerRadius={110}
                dataKey="value"
                stroke="0px"
              >
                {realdata &&
                  realdata.map((entry, index) => {
                    console.log("djhd", entry, index);
                    return (
                      <Cell
                        key={`cell-${index}`}
                        fill={color && color[index % color.length]}
                        color="#000"
                      />
                    );
                  })}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
        </>
      )}
    </div>
  );
};

export default WaffleChart;
