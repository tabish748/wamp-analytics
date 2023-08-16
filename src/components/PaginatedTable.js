import React, { useState } from 'react';
import Pagination from './Pagination';
import Image from 'next/image';
import Utils from '@/libs/utils';
const PaginatedTable = ({ data, headings, tableTitle }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [sortColumn, setSortColumn] = useState(data[0] && Object?.keys(data[0])[1]);
 
const [sortOrder, setSortOrder] = useState('asc');

  const [itemsPerPage, setItemsPerPage] = useState(15); // New state for items per page

  const totalPages = Math.ceil(data?.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;

  let sortedData = [...data];
if (sortColumn !== null && sortOrder !== null) {
  sortedData.sort((a, b) => {
  let valueA = a[sortColumn];
  let valueB = b[sortColumn];

  // Convert values to numbers, if possible
  valueA = isNaN(valueA) ? valueA : parseFloat(valueA);
  valueB = isNaN(valueB) ? valueB : parseFloat(valueB);

  // Determine if values are numbers
  const isValueANumber = typeof valueA === "number";
  const isValueBNumber = typeof valueB === "number";

  // If both values are numbers, sort numerically
  if (isValueANumber && isValueBNumber) {
    return sortOrder === 'asc' ? valueA - valueB : valueB - valueA;
  } else {
    // Else, sort as strings
    return sortOrder === 'asc' 
      ? String(valueA).localeCompare(String(valueB), undefined, {numeric: true})
      : String(valueB).localeCompare(String(valueA), undefined, {numeric: true});
  }
});

}




  const handleItemsPerPageChange = (e) => {
    setItemsPerPage(e.target.value);
    setCurrentPage(1); // Reset to first page to avoid empty page if currently selected page exceeds total pages after changing items per page
  };

  const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

  const handleSort = (column) => {
  if (sortColumn === column) {
    setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
  } else {
    setSortColumn(column);
    setSortOrder('asc');
  }
};


  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };


  const convertMillisecondsToSeconds = (milliseconds) => {
    return (milliseconds / 1000).toFixed(3);
};


const EformatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

function convertToNumber(input) 
{
  const numberValue = parseInt(input);
  if (!isNaN(numberValue)) 
  {
    return numberValue;
  }
  return input;
}

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="flex justify-between mb-4">
        <div>
        <label htmlFor="itemsPerPage" className="text-sm text-gray-600 mr-3">Items per page</label>
        <select
          id="itemsPerPage"
          onChange={handleItemsPerPageChange}
          value={itemsPerPage}
          className="border border-gray-300 rounded-md p-2 text-sm focus:ring focus:ring-opacity-50 focus:border-blue-300 transition"
        >
            <option value={5}>5</option>
            <option value={10}>10</option>
            <option value={15}>15</option>
            <option value={20}>20</option>
            <option value={25}>25</option>
            <option value={50}>50</option>
          </select>
          
        </div>
      </div>
      <table className="min-w-full leading-normal ">
      <thead>
  <tr>
    {headings?.map((heading, index) => (
      <th
        key={index}
        className="px-5 py-3 border border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
        onClick={() => handleSort(Object?.keys(data[0])[index + 1] )} // Removing "+1" to correctly target the column
      >
        {heading} 
        {sortColumn == Object?.keys(data[0])[index + 1] && (sortOrder == 'asc' ? '↑' : '↓')}
      </th>
    ))}
  </tr>
</thead>

        <tbody>
          {tableTitle === 'userDetail' &&
            currentItems?.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm flex gap-2">
                {
                  item?.flag && <Image src={item?.flag} className="w-[30]px" width={30} height={30} alt="flag" />
                }
                  
                   &nbsp; {item.country}
                </td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{item?.city}</td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{item?.deviceCategory}</td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{item?.operatingSystem}</td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{convertMillisecondsToSeconds(item?.averageSessionDuration)} s</td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{convertToNumber(item?.newUsers)}</td>
              </tr>
            ))}
          {tableTitle === 'ipList' &&
            currentItems?.map((item, index) => (
              <tr key={index}>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{EformatDate(item?.date)}</td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm flex gap-2">{item?.IpAddress}</td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{item?.ServiceProvider}</td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm flex gap-1">
                  <Image src={item?.flag} className="w-[20]px" width={20} height={20} alt="flag" /> &nbsp;{item?.country?.name}
                </td>
                <td className="px-5 py-5 border border-gray-200 bg-white text-sm">{item?.city}</td>
              </tr>
            ))}
        </tbody>
      </table>
      <Pagination totalPages={totalPages} currentPage={currentPage} paginate={paginate} nextPage={nextPage} prevPage={prevPage} />
    </div>
  );
};

export default PaginatedTable;
