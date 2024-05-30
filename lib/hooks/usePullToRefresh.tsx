/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { cn } from "main";
import { RefObject, TouchEvent, useEffect } from "react";
import ReactDOMServer from "react-dom/server";

const TRIGGER_THRESHOLD = 200;
const SHOW_INDICATOR_THRESHOLD = 180;

export const usePullToRefresh = (
  ref: RefObject<HTMLDivElement>,
  _onRefresh: () => void
) => {
  let initialY = 0;
  let start = false;

  const handleTouchStart = (e: TouchEvent) => {
    const el = ref.current;
    if (!el) return;

    initialY = e.touches[0].clientY;
  };

  const handleTouchMove = (e: TouchEvent) => {
    const el = ref.current;
    if (!el) return;

    const currentY = e.touches[0].clientY;

    const dy = currentY - initialY;

    if (dy < 0) return;
    const parentEl = el.parentNode as HTMLDivElement;
    if (dy > TRIGGER_THRESHOLD) {
      flipArrow(parentEl);
    } else if (dy > SHOW_INDICATOR_THRESHOLD) {
      addPullIndicator(parentEl);
      start = true;
    } else {
      removePullIndicator(parentEl);
    }

    el.style.transform = `translateY(${appr(dy)}px)`;
    el.style.borderTopRightRadius = "10px";
    el.style.borderTopLeftRadius = "10px";
    document.body.style.overflow = "hidden";
  };

  const handleTouchEnd = () => {
    const el = ref.current;
    if (!el) return;

    if (start == true) {
      el.style.transform = "translateY(70px)";

      setTimeout(() => {
        el.style.transform = "translateY(0)";
        el.style.transition = "transform 0.2s";
        const parentEl = el.parentNode as HTMLDivElement;
        _onRefresh();
        removePullIndicator(parentEl);
      }, 1000);
    } else {
      el.style.transform = "translateY(0)";
      el.style.transition = "transform 0.2s";
    }

    el.addEventListener("transitionend", onTransitionEnd);
  };

  const onTransitionEnd = () => {
    const el = ref.current;
    if (!el) return;

    el.style.transition = "";
  };

  const appr = (x: number) => {
    return 128 * (1 - Math.exp((-0.4 * x) / 128));
  };

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleNativeTouchStart = (e: globalThis.TouchEvent) =>
      handleTouchStart(e as any);
    const handleNativeTouchMove = (e: globalThis.TouchEvent) =>
      handleTouchMove(e as any);
    const handleNativeTouchEnd = () => handleTouchEnd();

    el.addEventListener("touchstart", handleNativeTouchStart);
    el.addEventListener("touchmove", handleNativeTouchMove);
    el.addEventListener("touchend", handleNativeTouchEnd);

    return () => {
      el.removeEventListener("touchstart", handleNativeTouchStart);
      el.removeEventListener("touchmove", handleNativeTouchMove);
      el.removeEventListener("touchend", handleNativeTouchEnd);
    };
  }, [ref.current]);
};

function addPullIndicator(el: HTMLDivElement) {
  const indicator = el.querySelector(".pull-indicator");
  if (indicator) {
    if (indicator.classList.contains("flip")) {
      indicator.classList.remove("flip");
    }
    return;
  }

  const pullIndicator = document.createElement("div");
  pullIndicator.className = "pull-indicator";
  pullIndicator.innerHTML = ReactDOMServer.renderToString(
    // <div className=" size-8 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-transparent p-1 animate-spin">
    //   <div className="flex size-full items-center justify-center bg-white back rounded-full"></div>
    // </div>
    <div
      className={cn(
        "size-10 rounded-full relative from-primary to-white bg-gradient-to-tr"
      )}
    >
      <span className="absolute size-14 border border-gray-300 -top-2 -left-2 rounded-full after:size-2 after:absolute after:top-0 after:left-2 after:rounded-full after:bg-primary animate-spin"></span>
      <img
        src="https://seeklogo.com/images/V/viet-nam-logo-3D78D597F9-seeklogo.com.png"
        className="size-full rounded-full bg-cover bg-no-repeat object-cover overflow-hidden"
        alt=""
      />
    </div>
  );
  el.appendChild(pullIndicator);
}

function removePullIndicator(el: HTMLDivElement) {
  const pullIndicator = el.querySelector(".pull-indicator");
  if (pullIndicator) {
    pullIndicator.remove();
  }
}

function flipArrow(el: HTMLDivElement) {
  const pullIndicator = el.querySelector(".pull-indicator");
  if (pullIndicator && !pullIndicator.classList.contains("flip")) {
    pullIndicator.classList.add("flip");
  }
}
