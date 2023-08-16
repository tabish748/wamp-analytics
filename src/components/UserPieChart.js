import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Tooltip, Legend, Cell, ResponsiveContainer } from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#00136F'];

export default function UserPieChart(props) {
  const [isClient, setIsClient] = useState(false);
  const data = props.data;
  
  let array = [
    {name: 'Mobile Users', value: data?.mobileUsers},
    {name: 'Desktop Users', value: data?.desktopUsers},
    {name: 'Tablet Users', value: data?.tabletUsers}
  ];

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {
        isClient &&
        <>
          <h2 className='text-center text-4xl'>Desktop Vs Mobile Users</h2>
          
          <ResponsiveContainer width='100%' aspect={1}>
            <PieChart>
              <Pie
                dataKey="value"
                isAnimationActive={false}
                data={array}
                cx='50%'
                cy='50%'
                outerRadius='40%'
                fill="#406290"
                label
              >
                {
                  array?.map((entry, index) => <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />)
                }
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </>
      }
    </>
  );
}
