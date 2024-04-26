/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";

interface IRestriction extends React.ComponentPropsWithoutRef<"div"> {
  userInfo: any;
}

export const Restriction: React.FC<IRestriction> = ({ userInfo }) => {
  if (!userInfo?.reachedMaxAct) return;

  React.useEffect(() => {
    const pageContentElements = document.querySelectorAll(".page-content");
    document.documentElement.style.overflowY = "hidden";
    document.documentElement.style.overscrollBehavior = "none";
    if (pageContentElements) {
      pageContentElements.forEach((element) => {
        element.classList.add("overflow-hidden");
      });
    }
  }, []);

  return (
    <div className="fixed z-[9998] inset-0 flex flex-col justify-end items-center w-full">
      <div className="absolute z-10 flex justify-center gap-3 items-center bg-[#EB0F0F] pb-10 p-4 w-full text-white">
        <div>
          <p className="text-sm text-center">
            {userInfo?.reachedMaxActMessage || "Bạn đã tham gia trước đó"}
          </p>
        </div>
      </div>
    </div>
  );
};
