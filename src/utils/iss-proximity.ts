import type { Units } from "@/hooks/useUnits";
import { getDistance } from "geolib";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const KM_PER_MILE = 1.609344;

export function calcIssDistance(coord1: Coordinates, coord2: Coordinates) {
  return getDistance(coord1, coord2) / 1000;
}

export function formatDistance(km: number, units: Units) {
  const value = units === "metric" ? km : km / KM_PER_MILE;
  const unit = units === "metric" ? "km" : "mi";

  return `${Math.round(value).toLocaleString()} ${unit}`;
}
