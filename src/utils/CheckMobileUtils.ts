import { useEffect, useState } from "react";

export function CheckMobileUtils() {
  const match = () => {
    if (!window.matchMedia) {
      return false;
    } else if (window.matchMedia("(max-width: 480px)").matches) {
      return "480";
    } else if (window.matchMedia("(max-width: 767px)").matches) return "767";
  };
  const [value, set] = useState(match);
  useEffect(() => {
    const handler = () => set(match);
    window.addEventListener("resize", handler);
  }, [match]);
  return value;
}
