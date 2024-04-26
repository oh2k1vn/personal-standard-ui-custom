import { onLCP, onFID, onCLS, onFCP, onINP, onTTFB } from "web-vitals";

export const useWebVitals = () => {
  return {
    onLCP,
    onFID,
    onCLS,
    onFCP,
    onINP,
    onTTFB,
  };
};
