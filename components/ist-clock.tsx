"use client";

import { useEffect, useState } from "react";

function getTime() {
  return new Intl.DateTimeFormat("en-IN", { timeZone: "Asia/Kolkata", hour: "2-digit", minute: "2-digit", hour12: false }).format(new Date());
}

export function ISTClock() {
  const [time, setTime] = useState("--:--");
  useEffect(() => {
    const update = () => setTime(getTime());
    update();
    const timer = window.setInterval(update, 60_000);
    return () => window.clearInterval(timer);
  }, []);
  return <time aria-label={`Current time in India: ${time}`} dateTime={time === "--:--" ? undefined : time}>{time} IST</time>;
}
