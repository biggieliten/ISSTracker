import type { OMMJsonObject } from "satellite.js";

export default async function getISSOrbit(): Promise<OMMJsonObject> {
  const response = await fetch(
    "https://celestrak.org/NORAD/elements/gp.php?CATNR=25544&FORMAT=JSON",
  );

  if (!response.ok) {
    throw new Error("Could not fetch ISS orbit");
  }

  const [orbit] = await response.json();

  return orbit;
}
