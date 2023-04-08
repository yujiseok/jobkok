import { useEffect, useState } from "react";

export const useTimer = (initialValue: number, start: boolean) => {
  const [time, setTime] = useState<number>(initialValue);
  const [isCountingDown, setIsCountingDown] = useState<boolean>(start);

  useEffect(() => {
    let countdownInterval: NodeJS.Timeout;

    if (isCountingDown && time > 0) {
      countdownInterval = setInterval(() => {
        setTime(time - 1000);
      }, 1000);
    }

    return () => clearInterval(countdownInterval);
  }, [time, isCountingDown]);

  const resetTime = () => setTime(initialValue);

  const formattedTime = new Date(time).toISOString().substr(14, 5);

  return { formattedTime, isCountingDown, setIsCountingDown, resetTime };
};
