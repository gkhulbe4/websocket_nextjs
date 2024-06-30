"use client";
import React, { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

function Main() {
  const [btnText, setBtnText] = useState("Send event");
  const socketRef = useRef(null);

  useEffect(() => {
    // Create the socket instance once
    socketRef.current = io("http://localhost:4000");

    socketRef.current.on("connect", () => {
      console.log("Socket client id -> ", socketRef.current.id);
    });

    socketRef.current.on("responseEvent", (data) => {
      console.log("Data from server -> ", data);
      setBtnText(data);
    });

    return () => {
      // Properly disconnect the socket and clean up listeners
      socketRef.current.disconnect();
    };
  }, []);

  function sendSocketEvent() {
    // socketRef.current.emit("myEvent", "Hello server");

    socketRef.current.emit("myEvent", "a", "b", (response) => {
      setBtnText(response.msg);
    });
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <button
        className="bg-gray-300 text-gray-600 px-3 py-2 cursor-pointer"
        onClick={sendSocketEvent}
      >
        {btnText}
      </button>
    </div>
  );
}

export default Main;
