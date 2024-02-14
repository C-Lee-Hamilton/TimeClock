import React, { createContext, useContext, useState } from "react";

const PageContext = createContext();

export const usePageContext = () => useContext(PageContext);

export const PageProvider = ({ children }) => {
  const [mainPage, setMainPage] = useState(true);
  const [settingsPage, setSettingsPage] = useState(false);
  const [hoursPage, setHoursPage] = useState(false);
  const backButton = () => {
    setMainPage(true);
    if (settingsPage) {
      setSettingsPage(false);
    } else if (hoursPage) {
      setHoursPage(false);
    }
  };

  return (
    <PageContext.Provider
      value={{
        mainPage,
        setMainPage,
        settingsPage,
        setSettingsPage,
        hoursPage,
        setHoursPage,
        backButton,
      }}
    >
      {children}
    </PageContext.Provider>
  );
};
