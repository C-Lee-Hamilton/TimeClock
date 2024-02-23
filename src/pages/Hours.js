import { React, useState } from "react";
import { usePageContext } from "../PageContext";
import Report from "../components/detailedReport";
import axios from "axios";
function Hours() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [isDetailed, setIsDetailed] = useState(false);
  const [detailedArray, setDetailedArray] = useState([]);
  const [totalHr, setTotalHr] = useState();
  const [totalPay, setTotalPay] = useState();

  const { setMainPage, token, hoursPage, setHoursPage } = usePageContext();
  const backButton = () => {
    setDetailedArray([]);
    setStartDate("");
    setEndDate("");
    setTotalHr();
    setTotalPay();
    setHoursPage(false);
    setMainPage(true);
  };

  if (!hoursPage) return null;

  const fetchHoursInRange = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/time-range",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { startDate, endDate },
        }
      );
      setTotalHr(response.data.totalHours);
      setTotalPay(response.data.totalPay);
    } catch (error) {
      console.error("Error fetching hours:", error);
    }
  };
  const fetchDetailed = async () => {
    setIsDetailed(!isDetailed);
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/detailed-report",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          params: { startDate, endDate },
        }
      );

      setDetailedArray(response.data.entries);
    } catch (error) {
      console.error("Error fetching hours:", error);
    }
  };

  return (
    <>
      <div className="flex mb-80 flex-col items-center justify-center space-y-10 my-8">
        <div className="text-3xl font-skran text-khakiG font-bold "></div>
        <h1
          style={{ visibility: totalHr > 0 ? "visible" : "hidden" }}
          className="text-2xl font-skran text-khakiG font-bold "
        >
          {totalHr} Hours
        </h1>
        <h1
          style={{ visibility: totalPay > 0 ? "visible" : "hidden" }}
          className="text-2xl font-skran text-khakiG font-bold "
        >
          ${totalPay}
        </h1>
        <div>
          <input
            className="px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="date"
            value={startDate}
            onChange={(e) => setStartDate(e.target.value)}
          />
        </div>
        <div>
          <input
            className="px-4 py-2 border-2 border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-500 focus:ring-opacity-50"
            type="date"
            value={endDate}
            onChange={(e) => setEndDate(e.target.value)}
          />
        </div>
        <button
          onClick={fetchHoursInRange}
          className="px-4 py-2 border-4 border-khakiG text-3xl bg-blue-500 text-white rounded shadow-custom hover:bg-blue-600 active:scale-95 transition duration-150 ease-in-out"
        >
          Get Hours
        </button>
        <button
          onClick={fetchDetailed}
          className="px-4 py-2 border-4 border-khakiG text-3xl bg-yellow-500 text-white rounded shadow-custom hover:bg-yellow-600 active:scale-95 transition duration-150 ease-in-out"
        >
          Get Detailed Report
        </button>
        <button
          onClick={backButton}
          className="px-4 py-2 border-4 border-khakiG text-3xl bg-green-500 text-white rounded my-4 shadow-custom hover:border-khakiB hover:bg-green-600 active:scale-95 shadow-lg"
        >
          Back
        </button>
      </div>
      <Report
        isDetailed={isDetailed}
        setIsDetailed={setIsDetailed}
        detailedArray={detailedArray}
      />
    </>
  );
}
export default Hours;
