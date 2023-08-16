import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {name: 'January', uv: 4000, pv: 2400, amt: 2400},
  {name: 'February', uv: 3000, pv: 1398, amt: 2210},
  {name: 'March', uv: 2000, pv: 9800, amt: 2290},
  // Add more months data here...
];

export default function BarChartComponent() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart width={600} height={300} data={data}
        margin={{top: 5, right: 30, left: 20, bottom: 5}}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
    </ResponsiveContainer>
  );
}
