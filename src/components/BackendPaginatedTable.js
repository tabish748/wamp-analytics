import React, { useState, useEffect } from "react";
import Pagination from "./Pagination";
import Image from "next/image";
import { API_URL } from "@/libs/constants";
import Loading from "./Loading";
const BackendPaginatedTable = ({
  data,
  headings,
  tableTitle,
  initialStartDate,
  initialEndDate,
}) => {

  data = data.map(item => {
    const {
        date,
        IpAddress,
        ServiceProvider,
        country,
        city,
        ...rest
    } = item;

    return {
        date,
        IpAddress,
        ServiceProvider,
        country : country?.name,
        city,
        ...rest
    };
});


  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortColumn, setSortColumn] = useState(data[0] && Object?.keys(data[0])[3]);
  const [sortOrder, setSortOrder] = useState("asc");
  const [currentData, setCurrentData] = useState(data);
  const [totalRecords, setTotalRecords] = useState(0); // Assuming you'd get this from the backend
  const [startDate, setStartDate] = useState(initialStartDate);
  const [endDate, setEndDate] = useState(initialEndDate); // Assuming you'd get this from the backend
  const [loading, setLoading] = useState(false); // Introducing loading state
  



  const EformatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();
    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;
    return [year, month, day].join("-");
  };

  async function getDataT(url, body = null, method = "POST") {
    try {
      const response = await fetch(url, {
        method,
        headers: body ? { "Content-Type": "application/json" } : {},
        body: body ? JSON.stringify(body) : null,
      });
      if (!response.ok) {
        throw new Error("Error fetching data");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error(error);
      return null; // or handle error as needed
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      const apiData = await getDataT(`${API_URL}/list/ip`, {
        startDate,
        endDate,
        pageNumber: currentPage,
        pageSize: itemsPerPage,
      });

      let res = apiData?.data;
      res = res.map(item => {
        const {
          date,
          IpAddress,
          ServiceProvider,
          country,
          city,
          ...rest
        } = item;

        return {
          date,
          IpAddress,
          ServiceProvider,
          country: country?.name || country,
          city,
          ...rest
        };
      });
      if (sortColumn) {
        res = sortData(res, sortColumn, sortOrder);
      }

      setCurrentData(res);
      setLoading(false);

      setTotalRecords(apiData?.totalRecords || 0);
    };
    fetchData();
  }, [currentPage, itemsPerPage, startDate, endDate]);

  useEffect(() => {
    setStartDate(initialStartDate);
    setEndDate(initialEndDate);
  }, [initialStartDate, initialEndDate]);

  const nextPage = () => {
    setCurrentPage((prev) => prev + 1);
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage((prev) => prev - 1);
    }
  };

  const totalPages = Math.ceil(totalRecords / itemsPerPage);

  const handleItemsPerPageChange = (event) => {
    setItemsPerPage(Number(event.target.value));
    setCurrentPage(1);
  };

  const handleSort = (column) => {
    let newOrder = sortOrder;
    if (sortColumn === column) {
      newOrder = sortOrder === "asc" ? "desc" : "asc";
      setSortOrder(newOrder);
    } else {
      setSortColumn(column);
      setSortOrder("asc");
    }

    setCurrentData(sortData(currentData, column, newOrder));
  };
  const sortData = (dataToSort, column, order) => {
  let sortedData = [...dataToSort];

  sortedData.sort((a, b) => {
    let valueA = a[column];
    let valueB = b[column];

    // Check for empty, null or undefined values for valueA and valueB
    const isValueAEmpty = valueA === null || valueA === undefined || valueA === "";
    const isValueBEmpty = valueB === null || valueB === undefined || valueB === "";

    if (isValueAEmpty && isValueBEmpty) {
      return 0;  // Both are empty, so they are equal
    } else if (isValueAEmpty) {
      return 1;  // A is empty, so it goes to the end
    } else if (isValueBEmpty) {
      return -1; // B is empty, so it goes to the end
    }

    // Convert values to numbers, if possible
    valueA = isNaN(valueA) ? valueA : parseFloat(valueA);
    valueB = isNaN(valueB) ? valueB : parseFloat(valueB);

    // Determine if values are numbers
    const isValueANumber = typeof valueA === "number";
    const isValueBNumber = typeof valueB === "number";

    // If both values are numbers, sort numerically
    if (isValueANumber && isValueBNumber) {
      return order === 'asc' ? valueA - valueB : valueB - valueA;
    } else {
      // Else, sort as strings
      return order === 'asc' 
        ? String(valueA).localeCompare(String(valueB), undefined, {numeric: true})
        : String(valueB).localeCompare(String(valueA), undefined, {numeric: true});
    }
  });

  return sortedData;
};


  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
  };
  

  return (
    <div className="container mx-auto py-6 px-4">
      <div className="mb-5">
        <label htmlFor="itemsPerPage" className="text-sm text-gray-600 mr-3">
          Items per page
        </label>
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
      <table className="min-w-full leading-normal ">
        <thead>
          <tr>
            {headings?.map((heading, index) => (
              <th
                key={index}
                className="px-5 py-3 border border-gray-200 text-left text-sm font-semibold text-gray-600 uppercase tracking-wider cursor-pointer"
                onClick={() => handleSort(Object?.keys(data[0])[index])}
              >
                {heading}
                {sortColumn === Object?.keys(data[0])[index] &&
                  (sortOrder === "asc" ? "↑" : "↓")}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {loading ? (
          <Loading/>
          ) : (
            <>
              {tableTitle === "ipList" &&
                currentData?.map((item, index) => (
                  <tr key={index}>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-sm">
                      {EformatDate(item?.date)}
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-sm flex gap-2">
                      {item?.IpAddress}
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-sm">
                      {item?.ServiceProvider}
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-sm flex gap-1">
                    <Image src={item?.flag} className="w-[20]px" width={20} height={20} alt="flag"/> 
                    &nbsp;{item?.country}
                    </td>
                    <td className="px-5 py-5 border border-gray-200 bg-white text-sm">
                      {item?.city}
                    </td>
                  </tr>
                ))}
            </>
          )}
        </tbody>
      </table>

      {/* ********************* */}

      <div className="py-3 flex justify-center items-center flex-wrap gap-1">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`text-sm font-semibold py-2 px-4 rounded-lg mr-3 ${
            currentPage === 1
              ? "cursor-not-allowed bg-gray-200"
              : "hover:bg-gray-400 bg-gray-300 text-gray-800"
          }`}
        >
          Prev
        </button>

        {[...Array(totalPages).keys()].map((page) => (
          <button
            key={page + 1}
            onClick={() => paginate(page + 1)}
            className={`text-sm font-semibold py-2 px-4 rounded-lg mr-3 ${
              currentPage === page + 1
                ? "bg-gray-400 text-white"
                : "hover:bg-gray-400 bg-gray-300 text-gray-800"
            }`}
          >
            {page + 1}
          </button>
        ))}

        <button
          onClick={nextPage}
          disabled={currentPage === totalPages}
          className={`text-sm font-semibold py-2 px-4 rounded-lg ${
            currentPage === totalPages
              ? "cursor-not-allowed bg-gray-200"
              : "hover:bg-gray-400 bg-gray-300 text-gray-800"
          }`}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default BackendPaginatedTable;
