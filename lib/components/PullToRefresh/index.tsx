/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { MouseEvent, TouchEvent, useEffect, useRef } from "react";

interface IPullToRefresh extends React.ComponentPropsWithoutRef<"div"> {
  isPullable?: boolean;
  canFetchMore?: boolean;
  onRefresh: () => Promise<any>;
  onFetchMore?: () => Promise<any>;
  refreshingContent?: JSX.Element | string;
  pullingContent?: JSX.Element | string;
  children: JSX.Element;
  pullDownThreshold?: number;
  fetchMoreThreshold?: number;
  maxPullDownDistance?: number;
  resistance?: number;
  backgroundColor?: string;
  className?: string;
}

enum DIRECTION {
  UP = -0b01,
  DOWN = 0b01,
}

export const PullToRefresh: React.FC<IPullToRefresh> = ({
  isPullable = true,
  canFetchMore = false,
  onRefresh,
  onFetchMore,
  refreshingContent = <></>,
  pullingContent = <></>,
  children,
  pullDownThreshold = 67,
  fetchMoreThreshold = 100,
  maxPullDownDistance = 95, // max distance to scroll to trigger refresh
  resistance = 1,
  backgroundColor,
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const childrenRef = useRef<HTMLDivElement>(null);
  const pullDownRef = useRef<HTMLDivElement>(null);
  const fetchMoreRef = useRef<HTMLDivElement>(null);

  let pullToRefreshThresholdBreached: boolean = false;
  let fetchMoreTresholdBreached: boolean = false;
  let isDragging: boolean = false;
  let startY: number = 0;
  let currentY: number = 0;

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

    containerRef.current!.classList.add("ptr--dragging");

    if (currentY < startY) {
      isDragging = false;
      return;
    }

    if (e.cancelable) {
      e.preventDefault();
    }

    const yDistanceMoved = Math.min(
      (currentY - startY) / resistance,
      maxPullDownDistance
    );

    // Limit to trigger refresh has been breached
    if (yDistanceMoved >= pullDownThreshold) {
      isDragging = true;
      pullToRefreshThresholdBreached = true;
      containerRef.current!.classList.remove("ptr--dragging");
      containerRef.current!.classList.add("ptr--pull-down-treshold-breached");
    }

    // maxPullDownDistance breached, stop the animation
    if (yDistanceMoved >= maxPullDownDistance) {
      return;
    }
    pullDownRef.current!.style.opacity = (yDistanceMoved / 65).toString();
    childrenRef.current!.style.overflow = "visible";
    childrenRef.current!.style.transform = `translate(0px, ${yDistanceMoved}px)`;
    pullDownRef.current!.style.visibility = "visible";
  };

  const getScrollToBottomValue = (): number => {
    if (!childrenRef || !childrenRef.current) return -1;
    const scrollTop = window.scrollY; // is the pixels hidden in top due to the scroll. With no scroll its value is 0.
    const scrollHeight = childrenRef.current.scrollHeight; // is the pixels of the whole container
    return scrollHeight - scrollTop - window.innerHeight;
  };

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
      if (containerRef.current) {
        containerRef.current.classList.remove(
          "ptr--pull-down-treshold-breached"
        );
        containerRef.current.classList.remove("ptr--dragging");
        containerRef.current.classList.remove(
          "ptr--fetch-more-treshold-breached"
        );
      }

      if (pullToRefreshThresholdBreached)
        pullToRefreshThresholdBreached = false;
      if (fetchMoreTresholdBreached) fetchMoreTresholdBreached = false;
    });
  };

  const onScroll = (e: Event): void => {
    /**
     * Check if component has already called onFetchMore
     */
    if (fetchMoreTresholdBreached) return;
    /**
     * Check if user breached fetchMoreThreshold
     */
    if (
      canFetchMore &&
      getScrollToBottomValue() < fetchMoreThreshold &&
      onFetchMore
    ) {
      fetchMoreTresholdBreached = true;
      containerRef.current!.classList.add("ptr--fetch-more-treshold-breached");
      onFetchMore().then(initContainer).catch(initContainer);
    }
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
    }

    if (childrenRef.current) {
      childrenRef.current.style.overflow = "visible";
      childrenRef.current.style.transform = `translate(0px, ${pullDownThreshold}px)`;
    }
    onRefresh().then(initContainer).catch(initContainer);
  };

  useEffect(() => {
    if (!childrenRef || !childrenRef.current) return;
    const childrenEl = childrenRef.current;
    childrenEl.addEventListener("touchstart", onTouchStart, { passive: true });
    childrenEl.addEventListener("mousedown", onTouchStart);
    childrenEl.addEventListener("touchmove", onTouchMove, { passive: false });
    childrenEl.addEventListener("mousemove", onTouchMove);
    window.addEventListener("scroll", onScroll);
    childrenEl.addEventListener("touchend", onEnd);
    childrenEl.addEventListener("mouseup", onEnd);
    document.body.addEventListener("mouseleave", onEnd);

    return () => {
      childrenEl.removeEventListener("touchstart", onTouchStart);
      childrenEl.removeEventListener("mousedown", onTouchStart);
      childrenEl.removeEventListener("touchmove", onTouchMove);
      childrenEl.removeEventListener("mousemove", onTouchMove);
      window.removeEventListener("scroll", onScroll);
      childrenEl.removeEventListener("touchend", onEnd);
      childrenEl.removeEventListener("mouseup", onEnd);
      document.body.removeEventListener("mouseleave", onEnd);
    };
  }, [children]);

  return (
    <div ref={containerRef}>
      <div ref={pullDownRef}></div>
      <div ref={childrenRef}>
        {children} <div ref={fetchMoreRef}></div>
      </div>
    </div>
  );
};

function isTreeScrollable(element: HTMLElement, direction: DIRECTION): boolean {
  if (isScrollable(element, direction)) {
    return true;
  }

  if (element.parentElement == null) {
    return false;
  }

  return isTreeScrollable(element.parentElement, direction);
}

function isScrollable(element: HTMLElement, direction: DIRECTION): boolean {
  if (!isOverflowScrollable(element)) {
    return false;
  }

  if (direction === DIRECTION.DOWN) {
    const bottomScroll = element.scrollTop + element.clientHeight;
    return bottomScroll < element.scrollHeight;
  }

  if (direction === DIRECTION.UP) {
    return element.scrollTop > 0;
  }

  throw new Error("unsupported direction");
}

function isOverflowScrollable(element: HTMLElement): boolean {
  const overflowType: string = getComputedStyle(element).overflowY;
  if (element === document.scrollingElement && overflowType === "visible") {
    return true;
  }

  if (overflowType !== "scroll" && overflowType !== "auto") {
    return false;
  }

  return true;
}
