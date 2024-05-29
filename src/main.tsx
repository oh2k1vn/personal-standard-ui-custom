/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOM from "react-dom/client";
import "../lib/tailwind.css";
import "zmp-ui/zaui.css";
import { usePullToRefresh } from "../lib/hooks/usePullToRefresh";

const ComponentApp = () => {
  const divRef = React.useRef(null);
  usePullToRefresh(divRef, () => {
    console.log("123");
  });
  return (
    <div className="w-full h-screen bg-background text-text p-10 ">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white rounded-3xl w-[20rem] h-[40rem] border-[10px] border-gray-600 overflow-hidden ">
        <img
          ref={divRef}
          src="https://images.pexels.com/photos/1366919/pexels-photo-1366919.jpeg?cs=srgb&dl=pexels-eberhardgross-1366919.jpg&fm=jpg"
          alt=""
          className="h-screen"
        />
      </div>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
