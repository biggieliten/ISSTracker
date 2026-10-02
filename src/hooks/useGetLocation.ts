import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useGetDeviceLocation() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    let positionSubscription: Location.LocationSubscription;
    let isMounted = true;

    async function WatchLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const subscription = await Location.watchPositionAsync(
        {
          distanceInterval: 1,
          accuracy: Location.Accuracy.Balanced,
        },
        (location: Location.LocationObject) => {
          setLocation(location.coords);
        },
      );

      if (isMounted) positionSubscription = subscription;
      else subscription.remove();
    }

    WatchLocation();

    return () => {
      isMounted = false;
      positionSubscription?.remove();
    };
  }, []);

  return { location };
}
