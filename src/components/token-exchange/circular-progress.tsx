"use client";

import { CircularProgress } from "@nextui-org/react";
import { useEffect, useState } from "react";

export default function CircularProgressIndicator() {
  const [value, setValue] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setValue((v) => (v >= 100 ? 0 : v + 1.1));
    }, 500);

    return () => clearInterval(interval);
  }, []);

  return (
    <CircularProgress
      aria-label="Loading..."
      size="lg"
      value={value}
      color="success"
    />
  );
}
