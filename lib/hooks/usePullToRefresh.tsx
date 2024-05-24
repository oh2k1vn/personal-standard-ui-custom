/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from "react";
import ReactDOMServer from "react-dom/server";

const TRIGGER_THRESHOLD = 200;
const SHOW_INDICATOR_THRESHOLD = 0;

export const usePullToRefresh = (
  ref: React.RefObject<HTMLDivElement>,
  onRefresh: () => Promise<any>
) => {
  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;

    el.addEventListener("touchstart", handleTouchStart);

    function handleTouchStart(startEvent: TouchEvent) {
      const el = ref.current;
      if (!el) return;

      const initialY = startEvent.touches[0].clientY;

      el.addEventListener("touchmove", handleTouchMove);
      el.addEventListener("touchend", handleTouchEnd);

      function handleTouchMove(moveEvent: TouchEvent) {
        const el = ref.current;
        if (!el) return;

        const currentY = moveEvent.touches[0].clientY;

        const dy = currentY - initialY;
        if (dy < 0) return;
        const parentEl = el.parentNode as HTMLDivElement;
        if (dy > TRIGGER_THRESHOLD) {
          flipArrow(parentEl);
        } else if (dy > SHOW_INDICATOR_THRESHOLD) {
          addPullIndicator(parentEl);
        } else {
          removePullIndicator(parentEl);
        }

        el.style.transform = `translateY(${appr(dy)}px)`;
        document.body.style.overflow = "hidden";
      }

      function handleTouchEnd(endEvent: TouchEvent) {
        const el = ref.current;
        if (!el) return;

        el.style.transform = "translateY(0)";
        removePullIndicator(el.parentNode as HTMLDivElement);

        el.style.transition = "transform 0.2s";

        const y = endEvent.changedTouches[0].clientY;
        const dy = y - initialY;
        if (dy > TRIGGER_THRESHOLD) {
          onRefresh();
        } else if (dy > SHOW_INDICATOR_THRESHOLD) {
          console.log("2");
        } else {
          console.log("3");
        }

        el.addEventListener("transitionend", onTransitionEnd);

        el.removeEventListener("touchmove", handleTouchMove);
        el.removeEventListener("touchend", handleTouchEnd);
      }

      function onTransitionEnd() {
        const el = ref.current;
        if (!el) return;

        el.style.transition = "";
        document.body.style.overflow = "";

        el.removeEventListener("transitionend", onTransitionEnd);
      }
    }

    return () => {
      el.removeEventListener("touchstart", handleTouchStart);
    };
  }, [ref.current]);

  function appr(x: number) {
    return 128 * (1 - Math.exp((-0.4 * x) / 128));
  }

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
      <div className=" size-8 rounded-full bg-gradient-to-r from-indigo-600 via-indigo-400 to-transparent p-1 animate-spin">
        <div className="flex size-full items-center justify-center bg-white back rounded-full"></div>
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
};
