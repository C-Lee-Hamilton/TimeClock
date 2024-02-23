import { React, useState, useEffect } from "react";

function Stopwatch({ setWorkedTime, start, paused }) {
  const [sec, setSec] = useState(0);
  const [min, setMin] = useState(0);
  const [hour, setHour] = useState(0);

  useEffect(() => {
    if (start && !paused) {
      const interval = setInterval(() => {
        setSec((prevSec) => {
          if (prevSec < 59) {
            setWorkedTime(hour / 60 + min + prevSec / 60);
            return prevSec + 1;
          } else {
            setSec(0);
            setMin((prevMin) => {
              if (prevMin < 59) {
                const newMin = prevMin + 1;
                setWorkedTime(hour / 60 + newMin + sec / 60);
                return newMin;
              } else {
                setMin(0);
                setHour((prevHour) => {
                  const newHour = prevHour + 1;
                  setWorkedTime(newHour / 60 + min + sec / 60);
                  return newHour;
                });
              }
            });
          }
        });
      }, 100);

      return () => clearInterval(interval);
    } else if (!start) {
      setSec(0);
      setMin(0);
      setHour(0);
      setWorkedTime(0);
    }
  }, [start, sec, min, hour, setWorkedTime, paused]);

  return (
    <>
      <h2 className="text-4xl text-khakiG font-bold text-shadow-default mt-0 mb-5 font-skran">
        {hour}:{min}:{sec}
      </h2>
    </>
  );
}
export default Stopwatch;
