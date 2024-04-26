/* eslint-disable no-constant-condition */
import React from "react";
import { cn } from "utils/cn";

interface ICheckInternet extends React.ComponentPropsWithoutRef<"div"> {}

export const CheckInternet: React.FC<ICheckInternet> = () => {
  const getOnLineStatus = () =>
    typeof navigator !== "undefined" && typeof navigator.onLine === "boolean"
      ? navigator.onLine
      : true;

  const [status, setStatus] = React.useState(getOnLineStatus());

  const setOnline = () => {
    setStatus(true);
    const pageContentElements = document.querySelectorAll(".zaui-page");
    document.documentElement.style.overflowY = "auto";
    document.documentElement.style.overscrollBehavior = "";
    if (pageContentElements) {
      pageContentElements.forEach((element) => {
        element.classList.remove("overflow-hidden");
      });
    }
  };
  const setOffline = () => {
    setStatus(false);

    const pageContentElements = document.querySelectorAll(".zaui-page");
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    if (pageContentElements) {
      pageContentElements.forEach((element) => {
        element.classList.add("overflow-hidden");
      });
    }
  };

  React.useEffect(() => {
    window.addEventListener("online", setOnline);
    window.addEventListener("offline", setOffline);

    return () => {
      window.removeEventListener("online", setOnline);
      window.removeEventListener("offline", setOffline);
    };
  }, []);

  return (
    <div
      className={cn(
        "fixed z-[9998] inset-0 flex flex-col justify-end items-center w-full transition-all duration-500",
        {
          "opacity-0 invisible": status,
          "opacity-100 visible": !status,
        }
      )}
    >
      <div className="absolute z-10 flex gap-3 items-center bg-primary pb-10 p-4 w-full text-white">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="size-7"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="m19.05 21.9l-8.7-8.75q-.775.175-1.487.475t-1.338.725q-.525.35-1.162.363T5.3 14.275q-.45-.45-.412-1.088t.537-1.012Q6 11.75 6.638 11.4t1.312-.65L5.7 8.5q-.65.35-1.262.738t-1.188.837q-.5.4-1.137.4t-1.063-.45Q.6 9.575.625 8.95t.525-1.025q.55-.45 1.125-.862T3.5 6.3L2.1 4.9q-.275-.275-.275-.7t.275-.7q.275-.275.7-.275t.7.275l16.975 16.975q.3.3.3.713t-.3.712q-.3.275-.712.288t-.713-.288M12 21q-1.05 0-1.775-.737T9.5 18.5q0-1.05.725-1.775T12 16q1.05 0 1.775.725T14.5 18.5q0 1.025-.725 1.763T12 21m6.825-6.875q-.4.4-.937.388t-.938-.413l-.238-.237l-.262-.263l-3.6-3.6q1.65.15 3.113.725t2.687 1.525q.45.35.513.913t-.338.962m4.125-4.1q-.425.45-1.05.462t-1.125-.387q-1.8-1.475-4.037-2.287T12 7q-.525 0-1.012.038T10 7.15L7.45 4.6q1.1-.3 2.238-.45T12 4q3.125 0 5.888 1.038T22.85 7.9q.5.425.525 1.05t-.425 1.075"
          />
        </svg>
        <div>
          <p className="font-medium">Không có kết nối mạng</p>
          <p className="text-sm">Vui lòng kiểm tra lại đường truyền mạng</p>
        </div>
      </div>
    </div>
  );
};
