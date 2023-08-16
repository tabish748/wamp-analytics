import React from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#FF6347', '#20B2AA'];
const visitorData = [
  { name: "New Visitors", value: 400 },
  { name: "Returning Visitors", value: 300 },
];

const VisitorPieChart = ({ data }) => {
  let d = data;
  let array = [
      {name: "New visitors", value: d?.unique},
      {name: "Unique visitors", value: d?.returning},
  ];
  
  return (
    <>
      <h2 className='text-center text-4xl mb-4'>Unique Vs Returning visitors</h2>
      <div className="w-full h-full">
        <ResponsiveContainer width="100%" height={400}>
          <PieChart>
            <Pie
              dataKey="value"
              isAnimationActive={false}
              data={array}
              cx="50%"
              cy="50%"
              outerRadius="80%"
              fill="#8884d8"
              label
            >
              {
                array.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))
              }
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </>
  );
};

export default VisitorPieChart;
