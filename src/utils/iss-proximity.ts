import type { Units } from "@/atoms/settings";
import { getDistance, getGreatCircleBearing } from "geolib";

type Coordinates = {
  latitude: number;
  longitude: number;
};

const KM_PER_MILE = 1.609344;

// The ISS is above the horizon for anyone within this distance of the point below it
export const VISIBILITY_RADIUS_KM = 2200;

export function calcIssDistance(coord1: Coordinates, coord2: Coordinates) {
  return getDistance(coord1, coord2) / 1000;
}

export function calcIssBearing(from: Coordinates, iss: Coordinates) {
  return getGreatCircleBearing(from, iss);
}

export function formatDistance(km: number, units: Units) {
  const value = units === "metric" ? km : km / KM_PER_MILE;
  const unit = units === "metric" ? "km" : "mi";

  return `${Math.round(value).toLocaleString()} ${unit}`;
}
