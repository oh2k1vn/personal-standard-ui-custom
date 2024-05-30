/* eslint-disable @typescript-eslint/no-explicit-any */
import { motion, useMotionValue } from "framer-motion";
import React from "react";
import cn from "utils/cn";

const DRAG_BUFFER = 50;

const SPRING_OPTIONS = {
  type: "spring",
  mass: 3,
  stiffness: 400,
  damping: 50,
};

interface CarouselProps extends React.ComponentPropsWithoutRef<"div"> {
  autoPlay?: boolean;
  autoDelay?: number;
  images: string[];
}

const Carousel: React.FC<CarouselProps> = ({
  images,
  autoDelay = 3000,
  autoPlay = false,
  className,
}) => {
  const [imgIndex, setImgIndex] = React.useState(0);

  const dragX = useMotionValue(0);

  React.useEffect(() => {
    if (autoPlay) {
      const intervalRef = setInterval(() => {
        const x = dragX.get();

        if (x === 0) {
          setImgIndex((pv) => {
            if (pv === images.length - 1) {
              return 0;
            }
            return pv + 1;
          });
        }
      }, autoDelay);

      return () => clearInterval(intervalRef);
    }
  }, []);

  const onDragEnd = () => {
    const x = dragX.get();

    if (x <= -DRAG_BUFFER && imgIndex < images.length - 1) {
      setImgIndex((pv) => pv + 1);
    } else if (x >= DRAG_BUFFER && imgIndex > 0) {
      setImgIndex((pv) => pv - 1);
    }
  };
  return (
    <div className={cn("relative overflow-hidden size-full", className)}>
      <motion.div
        drag="x"
        dragConstraints={{
          left: 0,
          right: 0,
        }}
        style={{
          x: dragX,
        }}
        animate={{
          translateX: `-${imgIndex * 100}%`,
        }}
        transition={SPRING_OPTIONS}
        onDragEnd={onDragEnd}
        className="flex cursor-grab items-center active:cursor-grabbing size-full"
      >
        <Images images={images} imgIndex={imgIndex} />
      </motion.div>

      <Dots images={images} imgIndex={imgIndex} setImgIndex={setImgIndex} />
    </div>
  );
};

export default Carousel;

const Images = ({
  images,
  imgIndex,
}: {
  images: string[];
  imgIndex: number;
}) => {
  return (
    <>
      {images.map((imgSrc, idx) => {
        return (
          <motion.div
            key={idx}
            style={{
              backgroundImage: `url(${imgSrc})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            animate={{
              scale: imgIndex === idx ? 1 : 0.9,
              borderRadius: imgIndex === idx ? "0px" : "10px",
            }}
            transition={SPRING_OPTIONS}
            className="aspect-video size-full shrink-0 object-cover"
          />
        );
      })}
    </>
  );
};

const Dots = ({
  images,
  imgIndex,
  setImgIndex,
}: {
  images: string[];
  imgIndex: number;
  setImgIndex: (e: number) => void;
}) => {
  return (
    <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex justify-center gap-2">
      {images.map((_, idx) => {
        return (
          <button
            key={idx}
            onClick={() => setImgIndex(idx)}
            className={`size-2 rounded-full transition-colors ${
              idx === imgIndex ? "bg-primary" : "bg-white bg-opacity-50"
            }`}
          />
        );
      })}
    </div>
  );
};
