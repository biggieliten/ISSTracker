import * as Location from "expo-location";
import { useEffect, useState } from "react";

export function useGetDeviceLocation() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  useEffect(() => {
    let positionSubscription: Location.LocationSubscription;

    async function WatchLocation() {
      let { status } = await Location.requestForegroundPermissionsAsync();

      if (status != "granted") {
        return;
      }

      positionSubscription = await Location.watchPositionAsync(
        {
          //   timeInterval: 2,
          distanceInterval: 1,
          accuracy: Location.Accuracy.Balanced,
        },
        (location: Location.LocationObject) => {
          (setLocation(location.coords),
            console.log(
              "lat:",
              location.coords.latitude,
              "lon:",
              location.coords.longitude,
              "CURRENT LOCATION",
            ));
        },
      );
    }

    WatchLocation();

    return () => {
      positionSubscription.remove();
    };
  }, []);

  return { location };
}
