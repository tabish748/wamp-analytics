import React, {useState} from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";
import Image from "next/image";
const COLORS = [
  "#0088FE",
  "#00C49F",
  "#FFBB28",
  "#FF8042",
  "#8884d8",
  "#8dd1e1",
  "#a44e6c",
  "#a40e6c",
  "#000e6c",
  "#124e6c",
  "#a3496c",
  "#23346c",
  "#a8906c",
];

const renderCustomizedLabel = ({
  cx,
  cy,
  midAngle,
  innerRadius,
  outerRadius,
  percent,
  index,
  payload,
}) => {
  const RADIAN = Math.PI / 180;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text
      x={x}
      y={y}
      fill="black"
      textAnchor={x > cx ? "start" : "end"}
      dominantBaseline="central"
      fontSize="12px" // You can adjust the size here
    >
      {`${payload.country}: ${(percent * 100).toFixed(0)}%`}
    </text>
  );
};


const PieChartComponent = ({ data }) => {
  const [isModalOpen, setModalOpen] = useState(false);

  const firstFiveItems = data?.slice(0, 5).map(item => ({
    ...item,
    name: item.country, // This line assigns the country name to the "name" property
    value: Number(item.users),
  }));
  const handleModalToggle = () => {
  setModalOpen(!isModalOpen);
};

  return (
    <>
    <h2 className="font-semibold text-bg-primary">Top 5 Country Locations</h2>
    <ResponsiveContainer width="100%" height={400}>
      <PieChart>
        <Pie
          data={firstFiveItems}
          cx="50%"
          cy="50%"
          labelLine={false}
          outerRadius={150}
          fill="#406290"
          dataKey="value"
          label={renderCustomizedLabel}
        >
        
          {
            
            firstFiveItems?.map((entry, index) => (
            <Cell
              key={`cell-${index}`}
              fill={COLORS[index % COLORS.length]}
            />
          ))}
        </Pie>
        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
          <button
            onClick={handleModalToggle}
            className={`border border-gray-300 block m-auto mt-4 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 }`} 
          >
            View more Countries
          </button>
          {isModalOpen && (
      <div className="fixed top-0 left-0 w-full h-full bg-black bg-opacity-50 flex justify-center items-center z-50">
        <div className="bg-white p-8 rounded shadow-lg relative w-2/3">
          <button onClick={handleModalToggle} className="absolute top-2 right-2">
            &times;
          </button>
          <h2 className="text-lg font-semibold mb-4">More Countries</h2>
          
          <div className="w-full overflow-x-auto max-h-[400px] custom-scrollbar ">
  <table className="min-w-full bg-white border border-gray-300">
    <thead>
      <tr>
        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-700">Country</th>
        <th className="py-2 px-4 border-b border-gray-300 text-left text-gray-700">Users</th>
      </tr>
    </thead>
    <tbody>
    {
      data?.map(item => {
        return <tr>
        <td className="py-2 px-4 border-b border-gray-300 flex gap-2 items-center">
        <Image
          src={item.image}
          width={50}
          height={50}
          className="w-[30px]"
          alt="flag"
        />        
        {item.country}</td>
        <td className="py-2 px-4 border-b border-gray-300">{item.users}</td>
      </tr>
      })
    }
      
      
    </tbody>
  </table>
</div>

        </div>
      </div>
    )}
    </>
  );
};

export default PieChartComponent;
