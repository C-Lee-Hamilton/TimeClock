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
  if (!hoursPage) return null;

  return (
    <>
      Hours
      <button
        onClick={backButton}
        className="px-4 py-2 border-4 border-khakiG text-3xl bg-green-500 text-white rounded my-4  shadow-custom hover:border-khakiB active:scale-95 shadow-lg"
      >
        Back
      </button>
    </>
  );
}
export default Settings;
