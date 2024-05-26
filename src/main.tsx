/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import { Avatar } from "zmp-ui";
import { Avatar as Ava } from "../lib/components/Avatar";
import "../lib/tailwind.css";
import "zmp-ui/zaui.css";

const ComponentApp = () => {
  return (
    <div className="w-full h-screen bg-background text-text p-10 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-[20rem] h-[40rem] border-[10px] border-gray-600 overflow-hidden ">
        <div className="flex flex-col gap-4 h-full justify-center items-center">
          <Ava />
          <Avatar />
        </div>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
