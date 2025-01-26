"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

const TimerContext = createContext();

export function useTimer() {
  return useContext(TimerContext);
}

export function TimerProvider({ children }) {
  const initialTime = 15 * 60; 

  const [timeLeft, setTimeLeft] = useState(() => {
    if (typeof window !== "undefined") {
      const isRefreshed = sessionStorage.getItem("isPageRefreshed");
      if (isRefreshed) {
        sessionStorage.removeItem("isPageRefreshed");
        localStorage.setItem("timerValue", initialTime.toString());
        return initialTime;
      }
      const savedTime = localStorage.getItem("timerValue");
      return savedTime ? Number.parseInt(savedTime, 10) : initialTime;
    }
    return initialTime;
  });

  useEffect(() => {
    const handleRefresh = () => {
      sessionStorage.setItem("isPageRefreshed", "true");
    };
    window.addEventListener("beforeunload", handleRefresh);

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        const newTime = prevTime > 0 ? prevTime - 1 : 0;
        localStorage.setItem("timerValue", newTime.toString());
        return newTime;
      });
    }, 1000);

    return () => {
      clearInterval(timer);
      window.removeEventListener("beforeunload", handleRefresh);
    };
  }, []);

  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, "0")}:${remainingSeconds
      .toString()
      .padStart(2, "0")}`;
  };

  return (
    <TimerContext.Provider value={{ timeLeft, formatTime }}>
      {children}
    </TimerContext.Provider>
  );
}
