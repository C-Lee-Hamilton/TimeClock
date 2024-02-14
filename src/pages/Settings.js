import { React, useState } from "react";
import { usePageContext } from "../PageContext";
function Settings() {
  const {
    mainPage,
    setMainPage,
    settingsPage,
    setSettingsPage,
    hoursPage,
    setHoursPage,
    backButton,
  } = usePageContext();
  if (!settingsPage) return null;
  return (
    <>
      Settings
      <button
        onClick={backButton}
        className="px-4 py-2 border-4 border-khakiG text-3xl bg-yellow-500 text-white rounded my-4 shadow-custom hover:border-khakiB active:scale-95 shadow-lg"
      >
        Back
      </button>
    </>
  );
}
export default Settings;
