import { atom, useAtom } from "jotai";

export type Units = "metric" | "imperial";

const unitsAtom = atom<Units>("metric");

export function useUnits() {
  const [units, setUnits] = useAtom(unitsAtom);

  return { units, setUnits };
}
