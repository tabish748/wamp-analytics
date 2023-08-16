import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'March', Users: 1000 },
  { name: 'April', Users: 3000 },
  { name: 'May', Users: 500 },
  { name: 'June', Users: 4600 },
];

export default function LineChartComponent(props) {
  let data = props?.data
  const array = data?.map(item => {
    return {
      yearMonth: item.yearMonth,
      Users: item.users,
    }
  });
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart width={500} height={300} data={array}
        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="yearMonth" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="Users" stroke="#406290" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
}
