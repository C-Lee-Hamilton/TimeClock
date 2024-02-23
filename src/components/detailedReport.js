import { React } from "react";

function LoginMessage({ isDetailed, setIsDetailed, detailedArray }) {
  const closeWindow = () => {
    setIsDetailed(false);
  };
  if (!isDetailed) return null;

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-8 w-2/3 max-w-md mx-auto bg-blue-600 text-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <div className="overflow-auto max-h-96 w-full">
            {detailedArray.map((entry, index) => (
              <div key={index}>
                <p>Date: {entry.date}</p>
                <p>Time Worked: {entry.timeWorked} minutes</p>
                <p>Rate: ${entry.rate} per hour</p>
                <p>Pay: ${entry.pay}</p>
                <hr />
              </div>
            ))}
          </div>
          <button
            onClick={closeWindow}
            className="px-4 py-2 border-4 border-khakiG text-3xl bg-yellow-500 text-white rounded my-4 shadow-custom hover:border-khakiB hover:bg-yellow-600 active:scale-95 shadow-lg"
          >
            Back
          </button>
        </div>
      </div>
    </div>
  );
}

export default LoginMessage;
