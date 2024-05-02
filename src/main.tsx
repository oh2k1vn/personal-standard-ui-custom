/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";

import "../lib/tailwind.css";

import { Button } from "../lib/components/Button";
import { BottomSheet } from "../lib/components/BottomSheet";

const ComponentApp = () => {
  return (
    <>
      <div
        id="container"
        className="transition-all duration-500 bg-background flex items-center justify-center h-screen"
        style={{
          padding: "1rem",
        }}
      >
        <div className="bg-surface max-w-80 w-full rounded shadow dark:text-white text-black flex flex-col gap-4 p-4 h-full overflow-y-auto">
          <div className="">
            <Button
              onClick={() => {
                BottomSheet.create({
                  content: <>hieu</>,
                });
              }}
            >
              OPEN
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
