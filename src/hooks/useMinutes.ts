/* eslint-disable react-hooks/exhaustive-deps */
import React from 'react';

interface IUseMinutes {
  timer: number;
  isMillisecond?: boolean;
  onClick?: () => void;
}

const useMinutes: React.FC<IUseMinutes> = ({ timer = 0, isMillisecond = false, onClick }) => {
  const [time, setTime] = React.useState(timer * 60);

  React.useEffect(() => {
    if (timer > 0) {
      const intervalId = setInterval(() => {
        setTime((prevTime) => {
          if (prevTime > 0) {
            return prevTime - 1;
          } else {
            clearInterval(intervalId);
            if (onClick) {
              onClick();
            }
            return 0;
          }
        });
      }, timer);

      return () => clearInterval(intervalId);
    }
  }, []);

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    if (isMillisecond) {
      return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}`;
  };
  return formatTime(time);
};

export default useMinutes