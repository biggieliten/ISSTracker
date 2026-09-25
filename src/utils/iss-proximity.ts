import { getDistance } from "geolib";

type Coordinates = {
  latitude: number;
  longitude: number;
};

export function calcIssDistance(coord1: Coordinates, coord2: Coordinates) {
  return getDistance(coord1, coord2) / 1000;
}
