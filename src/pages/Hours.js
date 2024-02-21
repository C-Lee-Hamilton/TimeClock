import { React, useState, useEffect } from "react";
import { usePageContext } from "../PageContext";
import axios from "axios";
function Hours() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [specificDate, setSpecificDate] = useState("");
  const { mainPage, setMainPage, token, hoursPage, setHoursPage, backButton } =
    usePageContext();
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
      console.log(`Total Minutes: ${response.data.totalHours}`);
    } catch (error) {
      console.error("Error fetching hours:", error);
    }
  };
  const fetchTimeForDate = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/auth/time-for-date",
        {
          headers: {
            Authorization: `Bearer ${token}`, // Ensure your token is correctly set up
          },
          params: { specificDate },
        }
      );
      console.log(
        `Total minutes for ${specificDate}: ${response.data.totalHours}`
      );
    } catch (error) {
      console.error("Error fetching hours:", error);
    }
  };
  return (
    <>
      Hours
      <>
        <input
          type="date"
          value={specificDate}
          onChange={(e) => setSpecificDate(e.target.value)}
        />
        <button onClick={fetchTimeForDate}>Get Hours for Date</button>
        <button onClick={backButton}>Back</button>
      </>
      <input
        type="date"
        value={startDate}
        onChange={(e) => setStartDate(e.target.value)}
      />
      <input
        type="date"
        value={endDate}
        onChange={(e) => setEndDate(e.target.value)}
      />
      <button onClick={fetchHoursInRange}>Get Hours</button>
      <button
        onClick={backButton}
        className="px-4 py-2 border-4 border-khakiG text-3xl bg-green-500 text-white rounded my-4  shadow-custom hover:border-khakiB active:scale-95 shadow-lg"
      >
        Back
      </button>
    </>
  );
}
export default Hours;
