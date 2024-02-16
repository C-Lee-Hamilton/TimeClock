import { React, useState, useEffect } from "react";

function Creator({ create, setCreate }) {
  const [newUser, setNewUser] = useState();
  const [newPass, setNewPass] = useState();
  const [newEmail, setNewEmail] = useState();

  if (!create) return null;
  // Don't render the component if there's no message.
  const closer = () => {
    setCreate(false);
  };

  return (
    <>
      <span className="text-xl my-2">Create Account</span>
      <input
        className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-khakiG text-center rounded my-2 shadow-custom"
        type="text"
        placeholder="username"
        onChange={(event) => setNewUser(event.target.value)}
        value={newUser}
      />
      <input
        className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-khakiG text-center rounded my-4 shadow-custom"
        type="password"
        placeholder="password"
        onChange={(event) => setNewPass(event.target.value)}
        value={newPass}
      />
      <input
        className="text-black w-full px-4 py-2 text-xl font-bold border-4 border-khakiG text-center rounded my-4 shadow-custom"
        type="text"
        placeholder="email"
        onChange={(event) => setNewEmail(event.target.value)}
        value={newEmail}
      />

      <button className="w-full text-lg font-bold px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer my-2">
        Create Account
      </button>
      <button
        onClick={closer}
        className="w-full text-lg font-bold px-4 py-2 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 active:bg-gray-500 focus:outline-none focus:ring focus:ring-gray-300 cursor-pointer my-2"
      >
        Go Back
      </button>
    </>
  );
}

export default Creator;
