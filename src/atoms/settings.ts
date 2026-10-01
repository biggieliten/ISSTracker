import { atom } from "jotai";

export type ThemePreference = "system" | "light" | "dark";
export type Units = "metric" | "imperial";

export const themePreferenceAtom = atom<ThemePreference>("system");
export const unitsAtom = atom<Units>("metric");
export const showVisibilityCircleAtom = atom(true);
