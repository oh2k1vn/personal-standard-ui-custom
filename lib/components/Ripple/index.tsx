import React, { useState, useLayoutEffect } from "react";
import styled from "styled-components";

interface RippleProps {
  duration?: number;
  color?: string;
}

interface RippleEffect {
  x: number;
  y: number;
  size: number;
}

const RippleContainer = styled.div<{ duration: number; color: string }>`
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;

  span {
    transform: scale(0);
    border-radius: 100%;
    position: absolute;
    opacity: 0.75;
    background-color: ${(props) => props.color};
    animation-name: ripple;
    animation-duration: ${(props) => props.duration}ms;
  }

  @keyframes ripple {
    to {
      opacity: 0;
      transform: scale(2);
    }
  }
`;

const useDebouncedRippleCleanUp = (
  rippleCount: number,
  duration: number,
  cleanUpFunction: () => void
) => {
  useLayoutEffect(() => {
    let bounce: NodeJS.Timeout | null = null;
    if (rippleCount > 0) {
      clearTimeout(bounce!);

      bounce = setTimeout(() => {
        cleanUpFunction();
        clearTimeout(bounce!);
      }, duration * 4);
    }

    return () => clearTimeout(bounce!);
  }, [rippleCount, duration, cleanUpFunction]);
};

const Ripple: React.FC<RippleProps> = ({ duration = 850, color = "#fff" }) => {
  const [rippleArray, setRippleArray] = useState<RippleEffect[]>([]);

  useDebouncedRippleCleanUp(rippleArray.length, duration, () => {
    setRippleArray([]);
  });

  const addRipple = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    const rippleContainer = event.currentTarget.getBoundingClientRect();
    const size =
      rippleContainer.width > rippleContainer.height
        ? rippleContainer.width
        : rippleContainer.height;
    const x = event.pageX - rippleContainer.x - size / 2;
    const y = event.pageY - rippleContainer.y - size / 2;
    const newRipple = {
      x,
      y,
      size,
    };

    setRippleArray([...rippleArray, newRipple]);
  };

  return (
    <RippleContainer duration={duration} color={color} onMouseDown={addRipple}>
      {rippleArray.length > 0 &&
        rippleArray.map((ripple, index) => {
          return (
            <span
              key={"span" + index}
              style={{
                top: ripple.y,
                left: ripple.x,
                width: ripple.size,
                height: ripple.size,
              }}
            />
          );
        })}
    </RippleContainer>
  );
};

export default Ripple;
