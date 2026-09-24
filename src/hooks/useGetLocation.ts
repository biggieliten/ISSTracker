import * as Location from "expo-location";
import { useState } from "react";

export function useGetLocation() {
  const [location, setLocation] =
    useState<Location.LocationObjectCoords | null>(null);

  async function WatchLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status != "granted") {
      return;
    }

    const positionSubscription = await Location.watchPositionAsync(
      {
        timeInterval: 2,
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

    return positionSubscription;
  }

  async function RequestLocation() {
    let { status } = await Location.requestForegroundPermissionsAsync();

    if (status != "granted") {
      return;
    }

    const location = await Location.getCurrentPositionAsync({});
    // setLocation(location);
  }

  return { RequestLocation, WatchLocation, location };
}
