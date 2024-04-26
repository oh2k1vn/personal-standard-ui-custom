/* eslint-disable react-refresh/only-export-components */
import React from "react";
import ReactDOM from "react-dom/client";

import "../lib/tailwind.css";

import { Input } from "../lib/components/Input";
import { Button } from "../lib/components/Button";
import { Dialog } from "../lib/components/Dialog";

const ComponentApp = () => {
  return (
    <>
      <div
        className="transition-all duration-500 bg-background flex items-center justify-center h-screen"
        style={{
          padding: "1rem",
        }}
      >
        <div className="bg-surface rounded shadow dark:text-white text-black flex flex-col gap-4 p-4 h-full overflow-y-auto">
          <div className="flex gap-4">
            <Input
              onChange={() => {}}
              type="text"
              value={"hieu"}
              className="bg-white"
            />
            <Button
              className="w-[30%]"
              onClick={() => {
                Dialog.create({
                  title: "Thông báo",
                  content: <>hieu</>,
                });
              }}
            >
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="size-5"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="m10.5 16.2l-4-4l1.4-1.4l2.6 2.6l5.6-5.6l1.4 1.4l-7 7Z"
                  />
                </svg>
                <span
                  className="line-clamp-1 flex-1"
                  style={{ overflow: "hidden", textOverflow: "ellipsis" }}
                >
                  hieu
                </span>
              </div>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

ReactDOM.createRoot(document.getElementById("root")!).render(<ComponentApp />);
