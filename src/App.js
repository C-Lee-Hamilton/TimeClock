import "./App.css";
import { React, useState, useEffect } from "react";
import { PageProvider } from "./PageContext";
import axios from "axios";
import Main from "./pages/Main";

import Hours from "./pages/Hours";
import Login from "./components/login";
// import { usePageContext } from "./PageContext";

function App() {
  const formatTime = () => {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };
  const [currentTime, setCurrentTime] = useState(formatTime());
  const [login, setLogin] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const loginButton = () => {
    loggedIn ? handleLogout() : setLogin(!login);
    // setLogin(!login);
  };

  useEffect(() => {
    // Set up an interval to update the state every second
    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }, []);

  const handleLogout = async () => {
    try {
      // Make a request to the server's logout endpoint
      await axios.post("http://localhost:5000/Auth/logout");

      setLoggedIn(false);
      // setLoggedOut("Log Out Successful...");
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };

  return (
    <PageProvider>
      <div className="App bg-hero-pattern min-h-screen bg-cover ">
        <Login login={login} setLogin={setLogin} setLoggedIn={setLoggedIn} />
        <div className="relative mb-10 top-5 right-0 left-0 flex flex-col items-center justify-center">
          <h1 className="text-6xl text-khakiG text-shadow-dark font-bold  mt-0 mb-2 font-skran">
            Time Clock
          </h1>
          <h1 className="text-2xl text-khakiG font-bold text-shadow-dark mt-0 mb-0 font-skran">
            {currentTime}
          </h1>
        </div>
        <div className="App flex flex-col items-center justify-center min-h-screen">
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"></div>

          <Main loggedIn={loggedIn} loginButton={loginButton} />

          <Hours />
        </div>
        {/* <div className=" fixed bottom-20 right-0 left-0 flex flex-col items-center justify-center">
          <h3 className="text-white bg-khakiG">
            {loggedIn ? " " : "Login to store and view hours"}
          </h3>
        </div> */}
      </div>
    </PageProvider>
  );
}

export default App;
