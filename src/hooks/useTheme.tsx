import {
  Colors,
  type ColorSchemeName,
  type ThemeColors,
} from "@/constants/theme";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { Appearance, useColorScheme } from "react-native";

export type ThemePreference = "system" | "light" | "dark";

type PreferenceValue = {
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
};

const PreferenceContext = createContext<PreferenceValue>({
  preference: "system",
  setPreference: () => {},
});

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>("system");

  useEffect(() => {
    Appearance.setColorScheme(
      preference === "system" ? "unspecified" : preference,
    );
  }, [preference]);

  return (
    <PreferenceContext.Provider value={{ preference, setPreference }}>
      {children}
    </PreferenceContext.Provider>
  );
}

export function useTheme(): {
  colors: ThemeColors;
  scheme: ColorSchemeName;
  isDark: boolean;
  preference: ThemePreference;
  setPreference: (preference: ThemePreference) => void;
} {
  const systemScheme = useColorScheme();
  const { preference, setPreference } = useContext(PreferenceContext);

  const scheme: ColorSchemeName = systemScheme === "dark" ? "dark" : "light";

  return {
    colors: Colors[scheme],
    scheme,
    isDark: scheme === "dark",
    preference,
    setPreference,
  };
}
