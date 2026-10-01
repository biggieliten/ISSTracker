import { themePreferenceAtom, type ThemePreference } from "@/atoms/settings";
import {
  Colors,
  type ColorSchemeName,
  type ThemeColors,
} from "@/constants/theme";
import { useAtom } from "jotai";
import { Appearance, useColorScheme } from "react-native";

export function useTheme(): {
  colors: ThemeColors;
  scheme: ColorSchemeName;
  isDark: boolean;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
} {
  const systemScheme = useColorScheme();
  const [preference, setPreferenceAtom] = useAtom(themePreferenceAtom);

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
