import { React, useState, useEffect } from "react";
import { usePageContext } from "../PageContext";
import Stopwatch from "../components/stopwatch";
import ErrorPopup from "../components/rateError";
import axios from "axios";
function Main({ loggedIn, loginButton }) {
  const [workedTime, setWorkedTime] = useState(0);
  const [timeLabel, setTimeLabel] = useState("");
  const [start, setStart] = useState(false);
  const [paused, setPaused] = useState(false);
  const [startLabel, setStartLabel] = useState("Clock In");
  const [pauseLabel, setPauseLabel] = useState("Break");
  const [rate, setRate] = useState();

  const [error, setError] = useState(false);
  const [hArray, setHArray] = useState([]);
  const currentDate = new Date();
  const dateString = currentDate.toLocaleDateString("en-US", {
    year: "2-digit",
    month: "2-digit",
    day: "2-digit",
  });
  const processor = {
    date: dateString,
    time: parseFloat(workedTime.toFixed(2)),
    pay: parseFloat(((workedTime / 60) * rate).toFixed(2)),
  };
  const addTime = async (e) => {
    // let temptime = processor;
    try {
      await axios.post(
        "http://localhost:5000/Auth/add-time",
        { time: e },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      localStorage.setItem("time", JSON.stringify(processor)); //store to local
    } catch (error) {
      console.error("Error adding score:", error);
    }
  };
  useEffect(() => {
    if (!start) {
      setPaused(false);
      setPauseLabel("Break");
      console.log(hArray);
    }
  }, [start]);
  useEffect(() => {
    if (!loggedIn) {
      setToken("");
      console.log("it worked my dude");
    }
  }, [loggedIn]);
  const {
    mainPage,
    setMainPage,

    hoursPage,
    setHoursPage,
    token,
    setToken,
  } = usePageContext();
  if (!mainPage) return null;

  const starting = () => {
    if (rate > 0) {
      setStart(!start);
      !start ? setStartLabel("Clock Out") : setStartLabel("Clock In");
      if (start) {
        setHArray([...hArray, processor]);
        addTime(processor);
      }
    } else {
      setError(true);
    }
  };

  const pause = () => {
    setPaused(!paused);
    !paused ? setPauseLabel("Resume") : setPauseLabel("Break");
    console.log(rate);
  };
  const HPg = () => {
    setMainPage(false);
    setHoursPage(true);
  };

  return (
    <>
      <button
        onClick={starting}
        className="px-4 py-2 border-4 border-khakiG text-3xl bg-blue-500 text-white rounded my-4 shadow-custom hover:border-khakiB active:scale-95 shadow-lg"
      >
        {startLabel}
      </button>

      <input
        className="mt-2 w-32 px-1 py-1 text-2xl font-bold border-4 border-khakiG text-center rounded my-4 shadow-custom"
        type="text"
        placeholder="Rate/Hr"
        onChange={(event) => setRate(event.target.value)}
        value={rate}
      />
      <ErrorPopup error={error} setError={setError} />
      <h2 className="text-2xl text-khakiG font-bold mt-5 mb-0 font-skran">
        Time Elapsed:{" "}
      </h2>
      <Stopwatch
        setWorkedTime={setWorkedTime}
        workedTime={workedTime}
        setTimeLabel={setTimeLabel}
        start={start}
        paused={paused}
        hArray={hArray}
        setHArray={setHArray}
      />
      <button
        onClick={pause}
        className="px-4 py-2 border-4 border-khakiG text-3xl bg-gray-500 my-4 text-white rounded   shadow-custom hover:border-khakiB active:scale-95 shadow-lg"
      >
        {pauseLabel}
      </button>

      <button
        onClick={HPg}
        className="px-4 py-2 border-4 border-khakiG text-3xl bg-green-500 text-white rounded my-4  shadow-custom hover:border-khakiB active:scale-95 shadow-lg"
      >
        View Hours
      </button>
      <button
        onClick={loginButton}
        className="px-4 py-2 mb-5 border-4 border-khakiG text-3xl bg-yellow-500 text-white rounded my-4 shadow-custom hover:border-khakiB active:scale-95 shadow-lg"
      >
        {loggedIn ? "Logout" : "Login"}
      </button>
      <h3 className="text-white bg-khakiG mb-40 mt-20 px-4">
        {loggedIn ? " " : "Login to store and view hours"}
      </h3>
    </>
  );
}
export default Main;
