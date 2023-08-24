import React, { useEffect, useState, useRef } from "react";
import { PieChart, Pie, Cell } from "recharts";
import PieChartComponent from "@/components/PieChartComponent";
import BarChartComponent from "@/components/BarChartComponent";
import LineChartComponent from "@/components/LineCharComponent";
import UserPieChart from "@/components/UserPieChart";
import { AiOutlineMenu } from "react-icons/ai"; // Hamburger icon from react-icons
import VisitorPieChart from "@/components/VisitorPieChart";
import GenderStats from "@/components/GenderStats";
import AgeStats from "@/components/AgeStats";
import InterestTags from "@/components/InterestTags";
import { API_URL } from "../libs/constants";
import PaginatedTable from "@/components/PaginatedTable";
import Image from "next/image";
import BackendPaginatedTable from "@/components/BackendPaginatedTable";
import Loading from "@/components/Loading";
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
const userDetailHeadings = [
  "Country",
  "City",
  "Device Category",
  "Operating System",
  "Avg Session Duration",
  "New Users",
];
const ipListHeadings = ["Date", "IP", "Service Provider", "Country", "City"];

export default function Dashboard({
  initialData,
  initialGenderData,
  initialDeviceData,
  initialUniqueReturningUserData,
  initialUniqueUserData,
  initialTotalUserData,
  initialageStatsData,
  initialListData,
  initialUserMonthlyData,
  initialEngagementTimeData,
  initialViewedPagesData,
  initialActiveUserData,
  initialLastHalfHourData,
  initialIpListData,
  initialBestAudioData,
  initialBestArticleData,
}) {
  const formatDate = (date) => {
    const d = new Date(date);
    let month = "" + (d.getMonth() + 1);
    let day = "" + d.getDate();
    const year = d.getFullYear();

    if (month.length < 2) month = "0" + month;
    if (day.length < 2) day = "0" + day;

    return [year, month, day].join("-");
  };
  const handleLastWeekClick = () => {
    const endDate = new Date(); // Today's date
    const startDate = new Date();
    startDate.setDate(endDate.getDate() - 7); // Subtracting 7 days from the end date

    // Assuming you have setStartDate and setEndDate to update the state
    setStartDate(formatDate(startDate));
    setEndDate(formatDate(endDate));
    setTimeRange("lastWeek");
    setShowSidebar(false);
  };

  const handleLastMonthClick = () => {
    const endDate = new Date(); // Today's date
    const startDate = new Date();
    startDate.setMonth(endDate.getMonth() - 1); // Subtracting one month

    setStartDate(formatDate(startDate));
    setEndDate(formatDate(endDate));
    setTempStartDate(formatDate(startDate));
    setTempEndDate(formatDate(endDate));
    setTimeRange("lastMonth");
    setShowSidebar(false);
  };

  const [timeRange, setTimeRange] = useState(null);

  const [isClient, setIsClient] = useState(false);
  const [isNavCollapsed, setIsNavCollapsed] = useState(true);
  const [startDate, setStartDate] = useState(() => {
    // 30 days ago
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return formatDate(date);
  });

  const [endDate, setEndDate] = useState(formatDate(new Date())); // today
  const [tempStartDate, setTempStartDate] = useState(() => {
    // 30 days ago
    const date = new Date();
    date.setDate(date.getDate() - 30);
    return formatDate(date);
  });
    const [tempEndDate, setTempEndDate] = useState(formatDate(new Date()));
  const [showSidebar, setShowSidebar] = useState(false);

  const [data, setData] = useState(initialData);

  const [genderData, setGenderData] = useState(initialGenderData);
  const [deviceData, setDeviceData] = useState(initialDeviceData);
  const [uniqueReturningUserData, setUniqueReturningUserData] = useState(
    initialUniqueReturningUserData
  );
  const [uniqueUserData, setUniqueUserData] = useState(initialUniqueUserData);
  const [totalUserData, setTotalUserData] = useState(initialTotalUserData);
  // const [totalViewsData, setTotalViewsData] = useState(initialTotalViewsData);
  const [ageStatsData, setAgeStatsData] = useState(initialageStatsData?.data);
  const [listData, setListData] = useState(initialListData);
  const [userMonthlyData, setUserMonthlyData] = useState(
    initialUserMonthlyData
  );
  const [engagementTimeData, setEngagementTimeData] = useState(
    initialEngagementTimeData
  );
  const [viewedPagesData, setViewedPagesData] = useState(
    initialViewedPagesData
  );

  const [activeUsersData, setActiveUsersData] = useState(
    initialActiveUserData[0]
  );
  const [lastHalfHourData, setLastHalfHourData] = useState(
    initialLastHalfHourData
  );
  const [ipListData, setIpListData] = useState(initialIpListData);

  const [bestAudioData, setBestAudioData] = useState(initialBestAudioData);
  const [bestArticleData, setBestArticleData] = useState(
    initialBestArticleData
  );

  const [loading, setLoading] = useState({
    general: true,
    countryData: true,
    deviceData: true,
    uniqueReturningUserData: true,
    genderData: true,
    uniqueUserData: true,
    totalUserData: true,
    ageStatsData: true,
    userMonthlyData: true,
    engagementTimeData: true,
    viewedPagesData: true,
    bestAudioData: true,
    bestArticleData: true,
  });

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
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
    const fetchDataAsync = async () => {
      setLoading({
        general: true,
        countryData: true,
        deviceData: true,
        uniqueReturningUserData: true,
        genderData: true,
        uniqueUserData: true,
        totalUserData: true,
        ageStatsData: true,
        userMonthlyData: true,
        engagementTimeData: true,
        viewedPagesData: true,
        bestAudioData: true,
        bestArticleData: true,
      });
      {
        const data1 = await getDataT(`${API_URL}/country`, {
          startDate,
          endDate,
        });
        const res1 = data1?.data;
        setData(res1);
        setLoading((prev) => ({ ...prev, countryData: false }));
      }

      {
        const data2 = await getDataT(`${API_URL}/device`, {
          startDate,
          endDate,
        });
        const res2 = data2?.data;
        setDeviceData(res2);
        setLoading((prev) => ({ ...prev, deviceData: false }));
      }

      {
        const data3 = await getDataT(`${API_URL}/user/unique-returning`, {
          startDate,
          endDate,
        });
        const res3 = data3?.data;
        setUniqueReturningUserData(res3);
        setLoading((prev) => ({ ...prev, uniqueReturningUserData: false }));
      }

      {
        const data4 = await getDataT(`${API_URL}/list/male-female-stats`, {
          startDate,
          endDate,
        });
        const res4 = data4;
        setGenderData(res4);
        setLoading((prev) => ({ ...prev, genderData: false }));
      }

      {
        const data5 = await getDataT(`${API_URL}/user/unique`, {
          startDate,
          endDate,
        });
        const res5 = data5?.data;
        setUniqueUserData(res5);
        setLoading((prev) => ({ ...prev, uniqueUserData: false }));
      }

      {
        const data6 = await getDataT(`${API_URL}/user`, { startDate, endDate });
        const res6 = data6?.data;
        setTotalUserData(res6);
        setLoading((prev) => ({ ...prev, totalUserData: false }));
      }

      {
        const data7 = await getDataT(`${API_URL}/list/age-stats`, {
          startDate,
          endDate,
        });
        const res7 = data7?.data;
        setAgeStatsData(res7);
        setLoading((prev) => ({ ...prev, ageStatsData: false }));
      }

      {
        const data1 = await getDataT(`${API_URL}/list`, { startDate, endDate });
        setListData(data1);
      }

      {
        const data8 = await getDataT(`${API_URL}/user/monthly`, {
          startDate,
          endDate,
        });
        const res8 = data8?.data;
        setUserMonthlyData(res8);
        setLoading((prev) => ({ ...prev, userMonthlyData: false }));
      }

      {
        const data9 = await getDataT(`${API_URL}/visit/average-time`, {
          startDate,
          endDate,
        });
        const res9 = data9?.data;
        setEngagementTimeData(res9);
        setLoading((prev) => ({ ...prev, engagementTimeData: false }));
      }

      {
        const data10 = await getDataT(`${API_URL}/visit/most-viewed`, {
          startDate,
          endDate,
        });
        const res10 = data10?.data;
        setViewedPagesData(res10);
        setLoading((prev) => ({ ...prev, viewedPagesData: false }));
      }

      {
        const data11 = await getDataT(`${API_URL}/user/interest`, {
          startDate,
          endDate,
        });
        const res11 = data11?.data;
        setActiveUsersData(res11[0]);
        // setLoading((prev) => ({ ...prev, activeUserData1: false }));
      }

      {
        const data12 = await getDataT(`${API_URL}/list/ip`, {
          startDate,
          endDate,
        });
        const res12 = data12?.data;
        setIpListData(res12);
        // setLoading(prev => ({ ...prev, ipListData: false }));
      }
      {
        const data13 = await getDataT(`${API_URL}/user/all-content`, {
          startDate,
          endDate,
          type: "Audio",
        });
        const res13 = data13;
        setBestAudioData(res13);
        setLoading((prev) => ({ ...prev, bestAudioData: false }));
      }
      {
        const data14 = await getDataT(`${API_URL}/user/all-content`, {
          startDate,
          endDate,
          type: "Article",
        });
        const res14 = data14;
        setBestArticleData(res14);
        setLoading((prev) => ({ ...prev, bestArticleData: false }));
      }
    };
    fetchDataAsync();
  }, [endDate, startDate]);

  const useAllLoaded = (loading, setLoading) => {
    useEffect(() => {
      // Extract the values from loading, but exclude the 'general' key
      const valuesExceptGeneral = Object?.keys(loading)
        .filter((key) => key !== "general")
        .map((key) => loading[key]);

      // Check if all values except 'general' are false
      const allLoaded = !valuesExceptGeneral.some((value) => value);
      if (allLoaded && loading.general === true) {
        setLoading((prev) => ({ ...prev, general: false }));
      }
    }, [loading, setLoading]);
  };

  useAllLoaded(loading, setLoading);

  let isDisabled = Object.keys(loading).some(
    (key) => key !== "general" && loading[key]
  );

  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
    setShowSidebar(false);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
    setShowSidebar(false);
  };

  useEffect(() => {
    setIsClient(true);
  }, []);

  const handleNavCollapse = () => setIsNavCollapsed(!isNavCollapsed);

  const convertMillisecondsToSeconds = (milliseconds) => {
    return (milliseconds / 1000).toFixed(2);
  };

  const allUserSectionRef = useRef(null);
  const deviceSectionRef = useRef(null);
  const uniqueReturningSectionRef = useRef(null);
  const countriesChartSectionRef = useRef(null);
  const mostViewedPagesectionRef = useRef(null);
  const bestArticleAudiosectionRef = useRef(null);
  const demographicsSectionRef = useRef(null);
  const userDetailsSectionRef = useRef(null);
  const ipListsSectionRef = useRef(null);

  const handleScroll = (ref) => {
    ref.current.scrollIntoView({ behavior: "smooth" }); // smooth scroll
  };

  const [maxDate, setMaxDate] = useState("");

  useEffect(() => {
    const today = new Date();
    setMaxDate(formatDate(today));
  }, []);

  const navItems = [
    { ref: allUserSectionRef, color: "bg-green-500", label: "All Users" },
    {
      ref: countriesChartSectionRef,
      color: "bg-red-500",
      label: "Countries Chart",
    },
    {
      ref: mostViewedPagesectionRef,
      color: "bg-red-500",
      label: "Most Viewed Pages",
    },
    { ref: deviceSectionRef, color: "bg-pink-500", label: "Mobile vs Desktop" },
    {
      ref: uniqueReturningSectionRef,
      color: "bg-pink-500",
      label: "Unique vs Returning",
    },
    {
      ref: bestArticleAudiosectionRef,
      color: "bg-pink-500",
      label: "Best Article & Audio",
    },
    // {
    //   ref: demographicsSectionRef,
    //   color: "bg-blue-500",
    //   label: "Demographics",
    // },
    { ref: userDetailsSectionRef, color: "bg-red-500", label: "User Details" },
    { ref: ipListsSectionRef, color: "bg-red-500", label: "IP Lists" },
  ];

  const handleDoneClick = () => 
  {
    setStartDate(tempStartDate);
    setEndDate(tempEndDate);
  }

  const downloadPDF = () => {
    const originalOverflow = document.body.style.overflow;
    const originalHeight = document.body.style.height;
    document.body.style.overflow = 'visible';
    document.body.style.height = 'auto';

    const input = document.body;
    html2canvas(input, {
        scale: 1,
        useCORS: true,
        scrollY: -window.scrollY  // Ensure it starts capturing from the top
    }).then((canvas) => {
        document.body.style.overflow = originalOverflow;
        document.body.style.height = originalHeight;

        const imgData = canvas.toDataURL('image/png');
        const pdf = new jsPDF({
            orientation: 'landscape',
        });
        const imgProps= pdf.getImageProperties(imgData);
        const pdfWidth = pdf.internal.pageSize.getWidth();
        const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
        pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
        pdf.save("download.pdf");
    });
}



  return (
    <div className="flex h-screen bg-gray-200" id="web-page">
      <div
        onClick={toggleSidebar} // Added onClick to hide the sidebar when overlay is clicked
        className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity ${
          showSidebar ? "block" : "hidden"
        } lg:hidden`}
        aria-hidden="true"
      ></div>

      <div
        className={`fixed z-20 inset-0 bg-black opacity-50 transition-opacity lg:hidden ${
          isNavCollapsed && "hidden"
        }`}
        aria-hidden="true"
      ></div>

      <div
        className={`transform top-0 left-0 w-64 bg-white rounded-r-3xl overflow-auto h-full fixed z-30 transition-transform duration-200 ease-in-out ${
          showSidebar ? "translate-x-0" : "-translate-x-full"
        } lg:translate-x-0 lg:static lg:inset-0`}
      >
        <div className="flex items-center justify-between mt-8 px-6">
          <Image
            src="/images/w-logo.png"
            width={200}
            className="w-full"
            height={80}
            alt="text"
          />

          <button
            className="lg:hidden absolute top-2 right-2"
            onClick={toggleSidebar}
          >
            <span className="text-2xl">&times;</span>
          </button>

        </div>

        <nav
          className="mt-6 overflow-y-auto custom-scrollbar"
          style={{ height: "200px" }}
        >
          {navItems.map((item, index) => (
            <a
              key={index}
              className="flex items-center space-x-2 py-1.5 text-sm px-4 rounded transition duration-200 hover:bg-slate-500 hover:text-white cursor-pointer"
              onClick={() => handleScroll(item.ref)}
            >
              <span
                className={`block w-2 h-2 rounded-full ${item.color}`}
              ></span>
              <span>{item.label}</span>
            </a>
          ))}
        </nav>
        <div className="flex flex-col md:flex-row gap-3 mb-2 flex-wrap px-5 mt-6 border-t-2 pt-6">
          {loading.general && (
            <>
              <div className="flex gap-2 mt-1 bg-slate-100 p-2">
                <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-gray-900"></div>
                <p className="text-red-500">Fetching Data...</p>
              </div>
            </>
          )}
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-lg text-primary-color">
              Start Date:
            </label>
            <input
              type="date"
              value={tempStartDate}
              onChange={e => setTempStartDate(e.target.value)}
              className={`p-2 border rounded-md ${
                isDisabled || loading.general ? "cursor-not-allowed" : ""
              }`}
              disabled={isDisabled || loading.general}
              max={tempEndDate}
              min="2023-01-01" // <-- This sets the minimum date to January 1, 2023
            />
          </div>
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-lg text-primary-color">
              End Date:
            </label>
            <input
              type="date"
              value={tempEndDate}
              onChange={e => setTempEndDate(e.target.value)}
              className={`p-2 border rounded-md ${
                isDisabled || loading.general ? "cursor-not-allowed" : ""
              }`}
              disabled={isDisabled || loading.general}
              min={tempStartDate}
              max={maxDate}
            />
          </div>
          <button 
          onClick={handleDoneClick}
          className="bg-primary-color  text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline-blue active:bg-blue-800 transition duration-150"
          >
                Search
            </button>
          <button
            onClick={handleLastWeekClick}
            className={`border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              timeRange === "lastWeek"
                ? "text-white bg-gray-500"
                : "text-gray-700 bg-white"
            } ${isDisabled || loading.general ? "cursor-not-allowed" : ""}`}
            disabled={isDisabled || loading.general}
          >
            Last week
          </button>
          <button
            onClick={handleLastMonthClick}
            className={`border border-gray-300 px-4 py-2 rounded hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 ${
              timeRange === "lastMonth"
                ? "text-white bg-gray-500"
                : "text-gray-700 bg-white"
            } ${isDisabled || loading.general ? "cursor-not-allowed" : ""}`} // Add cursor styling
            disabled={isDisabled || loading.general}
          >
            Last month
          </button>
        </div>
      </div>
      <div className="relative w-full flex flex-col h-full overflow-y-auto">
        <div className="px-6 py-4 flex gap-2 justify-between">
          <h1 className=" text-2xl sm:text-4xl text-primary-color">
            Analytics Dashboard
          </h1>
           {/* <button onClick={downloadPDF}>Download PDF</button> */}

          <button className="lg:hidden" onClick={toggleSidebar}>
            <AiOutlineMenu size={24} />
          </button>
        </div>
        <div className="px-6 pb-8 mt-6">
          <div className="bg-white rounded-lg shadow overflow-hidden">
            <div className=" px-4 py-8 sm:px-10" ref={allUserSectionRef}>
              <h2 className="text-3xl">
                All Users:
                <span className="font-bold">
                  {totalUserData?.totalUsers}
                </span>{" "}
                <br />
                <small className="text-sm">(Unique + Returning Users)</small>
              </h2>
              <div className="md:grid grid-cols-12 gap-4 items-center">
                <div className="md:col-start-1 md:col-end-9 ">
                  {isClient && (
                    <>
                      <LineChartComponent data={userMonthlyData} />
                    </>
                  )}
                </div>
                <div
                  className="md:col-start-9 md:col-end-13"
                  ref={countriesChartSectionRef}
                >
                  {isClient && (
                    <>
                      {loading.countryData ? (
                        <Loading />
                      ) : (
                        <PieChartComponent data={data} />
                      )}
                    </>
                  )}
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-[900px] mt-10">
                {activeUsersData?.activeUsers != "" && (
                  <div className="border  p-4 py-8 border-primary-color bg-light-primary-color rounded-md shadow-sm">
                    <p className="font-semibold text-center text-white">
                      Active Users
                    </p>
                    <h3 className="text-5xl text-center my-4 text-white">
                      {loading.activeUserData1 ? (
                        <div className="loader">Loading Country Data...</div>
                      ) : (
                        <>{activeUsersData?.activeUsers}</>
                      )}
                    </h3>
                  </div>
                )}

                <div className="border  p-4 py-8 border-primary-color bg-light-primary-color rounded-md">
                  <p className="font-semibold  text-center text-white">
                    Unique Visitors
                  </p>
                  <h3 className="text-5xl text-center my-4 text-white">
                    {uniqueUserData?.unique}
                  </h3>
                </div>
                <div className="border  p-4 py-8 border-primary-color rounded-md bg-light-primary-color">
                  <p className="font-semibold  text-center text-white">
                    Engagement Time
                  </p>
                  <h3 className="text-5xl text-center my-4 text-white">
                    {convertMillisecondsToSeconds(
                      engagementTimeData?.averageEngagementTime
                    )}
                    s
                  </h3>
                </div>

                <div className="border p-4 py-8 border-primary-color rounded-md bg-light-primary-color hidden">
                  <p className="font-semibold  text-center text-white">
                    Users in Last 30 Min
                  </p>
                  <h3 className="text-5xl text-center my-4 text-white">
                    {lastHalfHourData?.last30MinuteUsers}
                  </h3>
                </div>
              </div>

              {isClient && (
                <div className="sm:m-8" ref={mostViewedPagesectionRef}>
                  <h2 className="text-4xl m-6 text-center">
                    Most Viewed Pages
                  </h2>
                  <div className="overflow-x-auto">
                    <table className="min-w-full bg-white border border-gray-200 text-sm sm:text-base">
                      <thead>
                        <tr className="text-gray-700">
                          <th className="py-2 px-4 border-b border-r border-gray-200 w-3/5">
                            Page Path
                          </th>
                          <th className="py-2 px-4 border-b border-gray-200 w-2/5">
                            Views
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        {viewedPagesData?.mostViewedPages?.map(
                          (item, index) => {
                            return (
                              <tr key={index} className="text-gray-600">
                                <td className="py-2 px-4 border-b border-r border-gray-200 w-3/5">
                                  {item.pagePath}
                                </td>
                                <td className="py-2 px-4 border-b border-gray-200 w-2/5 text-center font-bold">
                                  {item.views}
                                </td>
                              </tr>
                            );
                          }
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {isClient && (
                <>
                  <div
                    className="flex flex-col md:flex-row gap-4"
                    ref={deviceSectionRef}
                  >
                    <div className="w-full max-w-[900px] py-10 px-6 border rounded-md mt-4 bg-white">
                      {loading.deviceData ? (
                        <div className="loader">Device data loading here</div>
                      ) : (
                        <UserPieChart data={deviceData} />
                      )}
                    </div>
                    <div
                      className="w-full max-w-[900px] py-10  px-6 border rounded-md mt-4 "
                      ref={uniqueReturningSectionRef}
                    >
                      {loading.uniqueReturningUserData ? (
                        <div className="loader"> Data loading here</div>
                      ) : (
                        <VisitorPieChart data={uniqueReturningUserData} />
                      )}
                    </div>
                  </div>

                  <div
                    className="bg-whitesmoke grid grid-cols-1 sm:grid-cols-2 gap-4 p-4"
                    ref={bestArticleAudiosectionRef}
                  >
                    <div className="bg-white p-6 rounded shadow">
                      <h2 className="text-center text-4xl mb-8">
                        Best Article
                      </h2>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Title
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Views
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {loading.bestArticleData ? (
                              <Loading />
                            ) : (
                              <>
                                {bestArticleData?.data
                                  ?.sort((a, b) => b.count - a.count)
                                  .map((item, index) => (
                                    <tr
                                      key={index}
                                      className={`${
                                        index % 2 === 0
                                          ? "bg-gray-50"
                                          : "bg-white"
                                      }`}
                                    >
                                      <td className="px-6 py-4 text-sm text-gray-800">
                                        {item?.title}
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-800">
                                        {item?.count}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                    <div className="bg-white p-6 rounded shadow">
                      <h2 className="text-center text-4xl mb-8">Best Audio</h2>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-100">
                            <tr>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Title
                              </th>
                              <th className="px-6 py-3 text-left text-xs font-medium text-gray-600 uppercase tracking-wider">
                                Views
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {loading.bestAudioData ? (
                              <Loading />
                            ) : (
                              <>
                                {bestAudioData?.data
                                  ?.sort((a, b) => b.count - a.count)
                                  ?.map((item, index) => (
                                    <tr
                                      key={index}
                                      className={`${
                                        index % 2 === 0
                                          ? "bg-gray-50"
                                          : "bg-white"
                                      }`}
                                    >
                                      <td className="px-6 py-4 text-sm text-gray-800">
                                        {item?.title}
                                      </td>
                                      <td className="px-6 py-4 text-sm text-gray-800">
                                        {item?.count}
                                      </td>
                                    </tr>
                                  ))}
                              </>
                            )}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                  <div
                    className="w-full mt-16 hidden"
                    ref={demographicsSectionRef}
                  >
                    <h2 className="text-center text-4xl">Demographics</h2>
                    <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Gender Stats
                        </h2>
                        {loading.genderData ? (
                          <Loading />
                        ) : (
                          <GenderStats data={genderData} />
                        )}
                      </div>
                      <div className="bg-white rounded-lg shadow-md p-6">
                        <h2 className="text-lg font-semibold mb-4">
                          Age Stats
                        </h2>
                        {loading.ageStatsData ? (
                          <Loading />
                        ) : (
                          <AgeStats data={ageStatsData} />
                        )}
                      </div>
                    </div>
                  </div>
                </>
              )}

              <h1
                className="m-6 mt-10 text-4xl text-center"
                ref={userDetailsSectionRef}
              >
                User Details
              </h1>
              {isClient &&
                listData &&
                listData?.data &&
                Array.isArray(listData?.data[0]) &&
                listData?.data[0]?.length > 0 && (
                  <div className="overflow-x-auto">
                    <PaginatedTable
                      data={listData?.data[0]}
                      headings={userDetailHeadings}
                      tableTitle="userDetail"
                    />
                  </div>
                )}

              <h1
                className="m-6 mt-10 text-4xl text-center"
                ref={ipListsSectionRef}
              >
                IP List
              </h1>
              {isClient && (
                <>
                  {ipListData.length > 0 && (
                    <div className="overflow-x-auto">
                      <BackendPaginatedTable
                        data={ipListData}
                        headings={ipListHeadings}
                        tableTitle="ipList"
                        initialStartDate={startDate}
                        initialEndDate={endDate}
                      />
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      {loading.general && (
        <div className="fixed inset-x-0 top-0 z-50 flex justify-center p-6">
          <Loading />
        </div>
      )}
    </div>
  );
}

async function fetchData(url, body = null, method = "POST") {
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

const EformatDate = (date) => {
  const d = new Date(date);
  let month = "" + (d.getMonth() + 1);
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
};

export async function getServerSideProps(context) {
  const date = new Date();
  date.setDate(date.getDate() - 30);
  const startDate = EformatDate(date);
  const endDate = EformatDate(new Date());

  // const [endDate, setEndDate] = useState(formatDate(new Date())); // today

  const [
    data1,
    genderData,
    deviceData,
    uniqueReturningUserData,
    uniqueUserData,
    totalUserData,
    ageStatsData,
    listData,
    userMonthlyData,
    engagementTimeData,
    viewedPagesData,
    activeUserData,
    lastHalfHourData,
    bestAudioData,
    bestArticleData,
    ipListData,
  ] = await Promise.all([
    fetchData(`${API_URL}/country`, { startDate, endDate }),
    fetchData(`${API_URL}/list/male-female-stats`, { startDate, endDate }),
    fetchData(`${API_URL}/device`, { startDate, endDate }),
    fetchData(`${API_URL}/user/unique-returning`, { startDate, endDate }),
    fetchData(`${API_URL}/user/unique`, { startDate, endDate }),
    fetchData(`${API_URL}/user`, { startDate, endDate }),
    fetchData(`${API_URL}/list/age-stats`, { startDate, endDate }),
    fetchData(`${API_URL}/list`, { startDate, endDate }),
    fetchData(`${API_URL}/user/monthly`, { startDate, endDate }),
    fetchData(`${API_URL}/visit/average-time`, {
      startDate,
      endDate,
    }),
    fetchData(`${API_URL}/visit/most-viewed`, {
      startDate,
      endDate,
    }),
    fetchData(`${API_URL}/user/interest`, { startDate, endDate }),
    fetchData(`${API_URL}/user/last-30-minutes`, null, "GET"),
    // Please make sure to define appropriate body parameters if needed
    fetchData(`${API_URL}/user/all-content`, {
      startDate,
      endDate,
      type: "Audio",
    }),
    // Please make sure to define appropriate body parameters if needed
    fetchData(`${API_URL}/user/all-content`, {
      startDate,
      endDate,
      type: "Article",
    }),

    fetchData(`${API_URL}/list/ip`, {
      startDate,
      endDate,
      pageNumber: 1,
      pageSize: 5,
    }),
  ]);

  return {
    props: {
      initialData: data1?.data,
      initialGenderData: genderData,
      initialDeviceData: deviceData?.data,
      initialUniqueReturningUserData: uniqueReturningUserData?.data,
      initialUniqueUserData: uniqueUserData?.data,
      initialTotalUserData: totalUserData?.data,
      // initialTotalViewsData: totalViewsData?.data ,
      initialageStatsData: ageStatsData,
      initialListData: listData,
      initialUserMonthlyData: userMonthlyData?.data,
      initialEngagementTimeData: engagementTimeData?.data,
      initialViewedPagesData: viewedPagesData?.data,
      initialActiveUserData: activeUserData?.data,
      initialLastHalfHourData: lastHalfHourData?.data,
      initialIpListData: ipListData?.data,
      initialBestAudioData: bestAudioData?.data,
      initialBestArticleData: bestArticleData?.data,
    },
  };
}
