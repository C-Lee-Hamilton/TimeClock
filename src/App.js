import "./App.css";
import { React, useState, useEffect } from "react";
import { PageProvider } from "./PageContext";
import axios from "axios";
import Main from "./pages/Main";
import Hours from "./pages/Hours";
import Login from "./components/login";

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
  const [rate, setRate] = useState();

  const loginButton = () => {
    loggedIn ? handleLogout() : setLogin(!login);
  };
  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:5000/Auth/logout");
      setRate("");
      setLoggedIn(false);
    } catch (error) {
      console.error("Error during logout:", error);
    }
  };
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(formatTime());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  return (
    <PageProvider>
      <div className="App bg-hero-pattern min-h-screen bg-cover ">
        <Login login={login} setLogin={setLogin} setLoggedIn={setLoggedIn} />
        <div className="relative mb-10 top-5 right-0 left-0 flex flex-col items-center justify-center">
          <h1 className="text-6xl text-khakiG text-shadow-dark font-bold   mb-2 font-skran mt-4 md:mt-12 lg:mt-20">
            Time Clock
          </h1>
          <h1 className="text-2xl text-khakiG font-bold text-shadow-dark mt-0 mb-0 font-skran">
            {currentTime}
          </h1>
        </div>
        <div className="App flex flex-col items-center justify-center min-h-screen">
          <div className="fixed top-0 left-1/2 transform -translate-x-1/2 z-50"></div>

          <Main
            loggedIn={loggedIn}
            loginButton={loginButton}
            rate={rate}
            setRate={setRate}
          />

          <Hours />
        </div>
      </div>
    </PageProvider>
  );
}

export default App;
