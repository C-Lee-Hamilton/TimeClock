import "./App.css";
import { React, useState, useEffect } from "react";
import { PageProvider } from "./PageContext";
import Main from "./pages/Main";
import Settings from "./pages/Settings";
import Hours from "./pages/Hours";

function App() {
  const formatTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [currentTime, setCurrentTime] = useState(formatTime());

  useEffect(() => {
    // Set up an interval to update the state every second
    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  return (
    <PageProvider>
      <div className="App bg-hero-pattern min-h-screen bg-cover ">
        <div className="App flex flex-col items-center justify-center min-h-screen">
          <h1 className="text-6xl text-khakiG text-shadow-dark font-bold  mt-0 mb-20 font-skran">
            Time Clock
          </h1>
          <Main />
          <Settings />
          <Hours />
          <h1 className="text-5xl text-khakiG font-bold text-shadow-default mt-20 mb-0 font-skran">
            {currentTime}
          </h1>
        </div>
      </div>
    </PageProvider>
  );
}

export default App;
