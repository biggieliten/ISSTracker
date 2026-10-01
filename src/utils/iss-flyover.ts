import {
  calcIssDistance,
  VISIBILITY_RADIUS_KM,
  type Coordinates,
} from "@/utils/iss-proximity";
import {
  degreesLat,
  degreesLong,
  eciToGeodetic,
  gstime,
  json2satrec,
  propagate,
  type OMMJsonObject,
} from "satellite.js";

const STEP_MS = 60 * 1000;
const SEARCH_MS = 24 * 60 * 60 * 1000;

/** Finds the next time the ISS rises above the horizon at `observer`. */
export function predictNextFlyover(
  orbit: OMMJsonObject,
  observer: Coordinates,
): Date | null {
  const satrec = json2satrec(orbit);
  const now = Date.now();
  let wasBelowHorizon = false;

  for (let time = now; time < now + SEARCH_MS; time += STEP_MS) {
    const date = new Date(time);
    const iss = propagate(satrec, date);
    if (!iss) continue;

    const pointBelow = eciToGeodetic(iss.position, gstime(date));
    const distance = calcIssDistance(observer, {
      latitude: degreesLat(pointBelow.latitude),
      longitude: degreesLong(pointBelow.longitude),
    });
    const isAboveHorizon = distance <= VISIBILITY_RADIUS_KM;

    // Skip a pass that is already under way and wait for the next one to start
    if (isAboveHorizon && wasBelowHorizon) return date;
    if (!isAboveHorizon) wasBelowHorizon = true;
  }

  return null;
}
