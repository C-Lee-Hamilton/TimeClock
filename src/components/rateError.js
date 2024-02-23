import React from "react";

function ErrorMessage({ error, setError }) {
  if (!error) return null;
  const closer = () => {
    setError(false);
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-4 max-w-sm mx-auto bg-red-600 text-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          <span className="text-xl my-6">Add Rate To Clock In</span>
          <button
            onClick={closer}
            className="mt-4 text-lg font-bold px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer"
          >
            {" "}
            Close
          </button>
        </div>
      </div>
    </div>
  );
}

export default ErrorMessage;
