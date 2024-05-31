/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import Loading from "../lib/components/Loading";

const ComponentApp = () => {
  return (
    <div className="w-full h-screen bg-background text-text p-10 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-[20rem] h-[40rem] border-[10px] border-gray-600 overflow-hidden tex">
        12312312
        <Loading active={false} />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
