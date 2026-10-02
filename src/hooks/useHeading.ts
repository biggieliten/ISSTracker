import { Magnetometer } from "expo-sensors";
import { useEffect, useState } from "react";

const UPDATE_INTERVAL_MS = 200;

export function useHeading() {
  const [heading, setHeading] = useState<number | null>(null);

  useEffect(() => {
    Magnetometer.setUpdateInterval(UPDATE_INTERVAL_MS);

    const subscription = Magnetometer.addListener(({ x, y }) => {
      const degrees = (Math.atan2(-x, y) * 180) / Math.PI;
      setHeading((degrees + 360) % 360);
    });

    return () => subscription.remove();
  }, []);

  return heading;
}
