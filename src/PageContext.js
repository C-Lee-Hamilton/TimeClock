import React, { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [mainPage, setMainPage] = useState(true);

  const [hoursPage, setHoursPage] = useState(false);
  const [token, setToken] = useState();
  const backButton = () => {
    setMainPage(true);
    if (hoursPage) {
      setHoursPage(false);
    }
  };

  return (
    <PageContext.Provider
      value={{
        mainPage,
        setMainPage,

        hoursPage,
        setHoursPage,
        backButton,
        token,
        setToken,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
