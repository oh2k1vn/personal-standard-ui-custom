/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import "zmp-ui/zaui.css";
import { PullToRefresh } from "../lib/components/PullToRefresh";

const ComponentApp = () => {
  return (
    <div className="w-full h-screen bg-background text-text p-10 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-[20rem] h-[40rem] border-[10px] border-gray-600 overflow-hidden">
        <PullToRefresh
          srcLogo="https://upload.wikimedia.org/wikipedia/commons/thumb/e/e5/NASA_logo.svg/918px-NASA_logo.svg.png"
          onRefresh={() => {
            return new Promise((res) => {
              setTimeout(() => {
                res([]);
                console.log("onRefresh");
              }, 2000);
            });
          }}
        >
          <div className="min-h-40 bg-red-500"></div>
          <div className="min-h-40 bg-blue-500"></div>
          <div className="min-h-40 bg-red-500"></div>
          <div className="min-h-40 bg-blue-500"></div>
          <div className="min-h-40 bg-red-500"></div>
          <div className="min-h-40 bg-blue-500"></div>
          <div className="min-h-40 bg-red-500"></div>
          <div className="min-h-40 bg-blue-500"></div>
        </PullToRefresh>
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
