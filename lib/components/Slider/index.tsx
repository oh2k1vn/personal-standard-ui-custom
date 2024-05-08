/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useRef, useState } from "react";

import "./slider.css";

interface SliderProp {
  images: {
    url: string;
    alt?: string;
  }[];
  autoPlay?: boolean;
  delay?: number;
  isArrow?: boolean;
}

export const Slider: React.FC<SliderProp> = ({
  images,
  autoPlay = false,
  delay = 2000,
  isArrow = true,
}) => {
  const [imageIndex, setImageIndex] = useState(0);
  const [dragStart, setDragStart] = useState(0);
  const [dragging, setDragging] = useState(false);
  const [autoplayActive] = useState(autoPlay);
  const sliderRef = useRef<HTMLDivElement>(null);
  const [intervalId, setIntervalId] = useState<any>(null);
  const [touchStartX, setTouchStartX] = useState(0);
  const [touchMoveX, setTouchMoveX] = useState(0);

  React.useEffect(() => {
    if (autoplayActive) {
      const id = setInterval(() => {
        showNextImage();
      }, delay);
      setIntervalId(id);
    } else {
      if (intervalId) clearInterval(intervalId);
      setIntervalId(null);
    }
    return () => {
      if (intervalId) clearInterval(intervalId);
    };
  }, [autoplayActive, delay]);

  function showNextImage() {
    setImageIndex((index) => {
      if (index === images.length - 1) return 0;
      return index + 1;
    });
  }

  function showPrevImage() {
    setImageIndex((index) => {
      if (index === 0) return images.length - 1;
      return index - 1;
    });
  }

  function handleDragStart(event: React.MouseEvent<HTMLDivElement>) {
    setDragging(true);
    setDragStart(event.clientX);
  }

  function handleDragEnd() {
    setDragging(false);
  }

  function handleDragMove(event: React.MouseEvent<HTMLDivElement>) {
    if (!dragging) return;
    const currentX = event.clientX;
    const deltaX = currentX - dragStart;
    const sensitivity = 50; // Tùy chỉnh cảm nhận độ nhạy của việc kéo
    if (deltaX > sensitivity) {
      showPrevImage();
      setDragging(false);
    } else if (deltaX < -sensitivity) {
      showNextImage();
      setDragging(false);
    }
  }

  function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
    setTouchStartX(event.touches[0].clientX);
  }

  function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
    setTouchMoveX(event.touches[0].clientX);
  }

  function handleTouchEnd() {
    const sensitivity = 50;
    const deltaX = touchMoveX - touchStartX;
    if (deltaX > sensitivity) {
      showPrevImage();
    } else if (deltaX < -sensitivity) {
      showNextImage();
    }
  }

  return (
    <section
      aria-label="Image Slider"
      style={{ width: "100%", height: "100%", position: "relative" }}
    >
      <div
        ref={sliderRef}
        onMouseDown={handleDragStart}
        onMouseUp={handleDragEnd}
        onMouseMove={handleDragMove}
        onMouseLeave={handleDragEnd}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          overflow: "hidden",
        }}
      >
        {images?.map(({ url, alt }, index) => (
          <img
            key={url}
            src={url}
            alt={alt}
            aria-hidden={imageIndex !== index}
            className="img-slider-img"
            style={{ translate: `${-100 * imageIndex}%` }}
          />
        ))}
      </div>
      {isArrow && (
        <button
          onClick={showPrevImage}
          className="img-slider-btn"
          style={{ left: 0 }}
          aria-label="View Previous Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m7.825 12l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T5.426 12t.063-.375t.212-.325l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7zm6.6 0l3.875 3.9q.275.275.288.688t-.288.712q-.275.275-.7.275t-.7-.275l-4.6-4.6q-.15-.15-.213-.325T12.026 12t.063-.375t.212-.325l4.6-4.6q.275-.275.688-.287t.712.287q.275.275.275.7t-.275.7z"
            />
          </svg>
        </button>
      )}
      {isArrow && (
        <button
          onClick={showNextImage}
          className="img-slider-btn"
          style={{ right: 0 }}
          aria-label="View Next Image"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="M9.575 12L5.7 8.1q-.275-.275-.288-.687T5.7 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T5.7 17.3q-.275-.275-.275-.7t.275-.7zm6.6 0L12.3 8.1q-.275-.275-.288-.687T12.3 6.7q.275-.275.7-.275t.7.275l4.6 4.6q.15.15.213.325t.062.375t-.062.375t-.213.325l-4.6 4.6q-.275.275-.687.288T12.3 17.3q-.275-.275-.275-.7t.275-.7z"
            />
          </svg>
        </button>
      )}

      <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-2">
        {images.map((_, index) => (
          <button
            key={index}
            className={`size-2 rounded-full transition-colors ${
              index === imageIndex ? "bg-primary" : "bg-white bg-opacity-50"
            }`}
            aria-label={`View Image ${index + 1}`}
            onClick={() => setImageIndex(index)}
          ></button>
        ))}
      </div>
      <div id="after-image-slider-controls" />
    </section>
  );
};
