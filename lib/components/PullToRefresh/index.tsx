/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { ReactNode, useEffect, useRef } from "react";
import { isTreeScrollable } from "utils/isScrollable";
import { DIRECTION } from "utils/types";
import { cn } from "main";

interface IPullToRefresh {
  srcLogo?: string;
  isPullable?: boolean;
  onRefresh: () => Promise<any>;
  refreshingContent?: JSX.Element | string;
  children: ReactNode;
  pullDownThreshold?: number;
  stretchedDownToTheThreshold?: number;
  resistance?: number;
  backgroundColor?: string;
  className?: string;
}

const PullToRefresh: React.FC<IPullToRefresh> = ({
  srcLogo,
  isPullable = true,
  onRefresh,
  refreshingContent,
  children,
  pullDownThreshold = 130,
  stretchedDownToTheThreshold = 50,
  resistance = 1,
  backgroundColor,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const pullDownRef = useRef<HTMLDivElement>(null);
  let pullToRefreshThresholdBreached: boolean = false;
  let isDragging: boolean = false;
  let startY: number = 0;
  let currentY: number = 0;

  useEffect(() => {
    if (!isPullable || !childrenRef || !childrenRef.current) return;
    const childrenEl = childrenRef.current;
    childrenEl.addEventListener("touchstart", onTouchStart, { passive: true });
    childrenEl.addEventListener("mousedown", onTouchStart);
    childrenEl.addEventListener("touchmove", onTouchMove, { passive: false });
    childrenEl.addEventListener("mousemove", onTouchMove);
    childrenEl.addEventListener("touchend", onEnd);
    childrenEl.addEventListener("mouseup", onEnd);
    document.body.addEventListener("mouseleave", onEnd);
    return () => {
      childrenEl.removeEventListener("touchstart", onTouchStart);
      childrenEl.removeEventListener("mousedown", onTouchStart);
      childrenEl.removeEventListener("touchmove", onTouchMove);
      childrenEl.removeEventListener("mousemove", onTouchMove);
      childrenEl.removeEventListener("touchend", onEnd);
      childrenEl.removeEventListener("mouseup", onEnd);
      document.body.removeEventListener("mouseleave", onEnd);
    };
  }, [children, isPullable, onRefresh, pullDownThreshold]);

  const initContainer = (): void => {
    requestAnimationFrame(() => {
      /**
       * Reset Styles
       */
      if (childrenRef.current) {
        childrenRef.current.style.overflowX = "hidden";
        childrenRef.current.style.overflowY = "auto";
        childrenRef.current.style.transform = `unset`;
      }
      if (pullDownRef.current) {
        pullDownRef.current.style.opacity = "0";
      }

      if (pullToRefreshThresholdBreached)
        pullToRefreshThresholdBreached = false;
    });
  };

  const onTouchStart = (e: MouseEvent | TouchEvent): void => {
    isDragging = false;
    if (e instanceof MouseEvent) {
      startY = e.pageY;
    }
    if (window.TouchEvent && e instanceof TouchEvent) {
      startY = e.touches[0].pageY;
    }
    currentY = startY;
    // Check if element can be scrolled
    if (
      e.type === "touchstart" &&
      isTreeScrollable(e.target as HTMLElement, DIRECTION.UP)
    ) {
      return;
    }
    // Top non visible so cancel
    if (childrenRef.current!.getBoundingClientRect().top < 0) {
      return;
    }
    isDragging = true;
  };

  const onTouchMove = (e: MouseEvent | TouchEvent): void => {
    if (!isDragging) {
      return;
    }

    if (window.TouchEvent && e instanceof TouchEvent) {
      currentY = e.touches[0].pageY;
    } else {
      currentY = (e as MouseEvent).pageY;
    }

    if (currentY < startY) {
      isDragging = false;
      return;
    }

    if (e.cancelable) {
      e.preventDefault();
    }

    const yDistanceMoved = Math.min((currentY - startY) / resistance);
    // Limit to trigger refresh has been breached
    if (yDistanceMoved >= pullDownThreshold) {
      isDragging = true;
      pullToRefreshThresholdBreached = true;
    } else {
      pullToRefreshThresholdBreached = false;
    }
    pullDownRef.current!.style.opacity = (
      Math.round((yDistanceMoved / 65) * 100) / 100 -
      0.46
    ).toString();
    pullDownRef.current!.style.visibility = "visible";
    pullDownRef.current!.style.transition = "transform 0.2s";

    childrenRef.current!.style.overflow = "visible";
    childrenRef.current!.style.transform = `translateY(${appr(
      currentY - startY
    )}px)`;
    childrenRef.current!.style.transition = "transform 0.2s";
  };

  const appr = (x: number) => {
    return 128 * (1 - Math.exp((-0.4 * x) / 128));
  };

  const onEnd = (): void => {
    isDragging = false;
    startY = 0;
    currentY = 0;

    // Container has not been dragged enough, put it back to it's initial state
    if (!pullToRefreshThresholdBreached) {
      if (pullDownRef.current) pullDownRef.current.style.visibility = "hidden";
      initContainer();
      return;
    } else {
      if (childrenRef.current) {
        childrenRef.current.style.overflow = "visible";
        childrenRef.current.style.transform = `translateY(${
          pullDownThreshold - stretchedDownToTheThreshold
        }px)`;
      }
      onRefresh().then(initContainer).catch(initContainer);
    }
  };

  return (
    <div
      className={`size-full overflow-hidden relative ${className}`}
      style={{ backgroundColor }}
      ref={containerRef}
    >
      <div
        className="-z-[1] absolute overflow-hidden left-0 top-0 right-0 invisible pt-2 pb-4"
        ref={pullDownRef}
      >
        {refreshingContent ? (
          refreshingContent
        ) : (
          <div
            className={cn(
              "size-8 rounded-full relative from-gray-200 to-white bg-gradient-to-tr mx-auto mt-4"
            )}
          >
            <span className="absolute size-12 border border-gray-300 -top-2 -left-2 rounded-full after:size-2 after:absolute after:top-0 after:left-1.5 after:rounded-full after:bg-primary animate-spin"></span>
            <img
              src={srcLogo}
              className="size-full rounded-full bg-cover bg-no-repeat object-cover overflow-hidden"
              alt=""
            />
          </div>
        )}
      </div>
      <div className="size-full overflow-hidden relative" ref={childrenRef}>
        {children}
      </div>
    </div>
  );
};
export default PullToRefresh;
