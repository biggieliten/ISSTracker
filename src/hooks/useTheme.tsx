import {
  Colors,
  type ColorSchemeName,
  type ThemeColors,
} from "@/constants/theme";
import { atom, useAtom } from "jotai";
import { Appearance, useColorScheme } from "react-native";

export type ThemePreference = "system" | "light" | "dark";

const preferenceAtom = atom<ThemePreference>("system");

export function useTheme(): {
  colors: ThemeColors;
  scheme: ColorSchemeName;
  isDark: boolean;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
} {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceAtom] = useAtom(preferenceAtom);

  const scheme: ColorSchemeName = systemScheme === "dark" ? "dark" : "light";

  const setPreference = (next: ThemePreference) => {
    setPreferenceAtom(next);
    Appearance.setColorScheme(next === "system" ? "unspecified" : next);
  };

  return {
    colors: Colors[scheme],
    scheme,
    isDark: scheme === "dark",
    preference,
    setPreference,
  };
}
