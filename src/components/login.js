import { React, useState, useEffect } from "react";
import CreateAccount from "./createAccount";

function LoginMessage({ login, setLogin }) {
  const [userLogin, setUserLogin] = useState();
  const [passLogin, setPassLogin] = useState();
  const [create, setCreate] = useState(false);

  if (!login) return null;
  // Don't render the component if there's no message.
  const closer = () => {
    setLogin(false);
  };
  const creator = () => {
    setCreate(true);
  };
  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="p-8 w-2/3 max-w-md mx-auto bg-blue-600 text-white rounded-lg shadow-lg">
        <div className="flex flex-col items-center">
          {!create && (
            <>
              <span className="text-xl my-2">Login</span>
              <input
                className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-khakiG text-center rounded my-2 shadow-custom"
                type="text"
                placeholder="username"
                onChange={(event) => setUserLogin(event.target.value)}
                value={userLogin}
              />
              <input
                className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-khakiG text-center rounded my-4 shadow-custom"
                type="password"
                placeholder="password"
                onChange={(event) => setPassLogin(event.target.value)}
                value={passLogin}
              />
              <button className="w-full text-lg font-bold px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer my-2">
                Login
              </button>
              <button
                onClick={creator}
                className="w-full text-lg font-bold px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer my-2"
              >
                Create Account
              </button>
              <button
                onClick={closer}
                className="w-full text-lg font-bold px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer my-2"
              >
                Close
              </button>
            </>
          )}
          <CreateAccount create={create} setCreate={setCreate} />
        </div>
      </div>
    </div>
  );
}

export default LoginMessage;