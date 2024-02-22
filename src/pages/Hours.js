import { React, useState, useEffect } from "react";
import { usePageContext } from "../PageContext";
import axios from "axios";
function Hours() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const [hoursForSpecificDate, setHoursForSpecificDate] = useState("");
  const [payForSpecificDate, setPayForSpecificDate] = useState("");
  const { mainPage, setMainPage, token, hoursPage, setHoursPage, backButton } =
    usePageContext();
  useEffect(() => {
    const fetchTimeForDate = async (specificDate) => {
      try {
        const response = await axios.get(
          "http://localhost:5000/auth/time-for-date",
          {
            headers: {
              Authorization: `Bearer ${token}`, // Make sure your token is correctly set up
            },
            params: { specificDate },
          }
        );
        console.log(
          `Total minutes for ${specificDate}: ${response.data.totalHours}`
        );
        setHoursForSpecificDate(response.data.totalHours);
        setPayForSpecificDate(response.data.totalPay);
      } catch (error) {
        console.error("Error fetching hours:", error);
      }
    };

    // Format today's date as MM/DD/YY
    const today = new Date();
    const date = `${(today.getMonth() + 1).toString().padStart(2, "0")}/${today
      .getDate()
      .toString()
      .padStart(2, "0")}/${today.getFullYear().toString().slice(-2)}`;

    fetchTimeForDate(date);
  }, [token]);
  if (!hoursPage) return null;

  const fetchHoursInRange = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/time-range",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure your token is correctly set up
          },
          params: { startDate, endDate },
        }
      );
      console.log(
        `Total Minutes: ${response.data.totalHours} Total Pay: ${response.data.totalPay}`
      );
    } catch (error) {
      console.error("Error fetching hours:", error);
    }
  };
  // const rangeClick = () => {
  //   if (startDate !== endDate) {
  //     fetchHoursInRange();
  //   } else if (startDate === endDate) {

  //   }
  // };

  return (
    <>
      <div className="flex mb-80 flex-col items-center justify-center space-y-10 my-8">
        <h2 className="text-3xl font-bold text-center font-skran text-khakiG font-bold ">
          Today
        </h2>
        <div className="text-3xl font-skran text-khakiG font-bold ">
          {hoursForSpecificDate}hrs ${payForSpecificDate}
        </div>
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
          onClick={backButton}
          className="px-4 py-2 border-4 border-khakiG text-3xl bg-green-500 text-white rounded my-4 shadow-custom hover:border-khakiB hover:bg-green-600 active:scale-95 shadow-lg"
        >
          Back
        </button>
      </div>
    </>
  );
}
export default Hours;
