import {
  BorderWidth,
  FontSize,
  FontWeight,
  LetterSpacing,
  Radius,
  Spacing,
} from "@/constants/theme";
import { ThemePreference, useTheme } from "@/hooks/useTheme";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

export default function Settings() {
  const { colors, preference, setPreference } = useTheme();

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={s.root}
    >
      <Text style={[s.sectionLabel, { color: colors.textSecondary }]}>
        APPEARANCE
      </Text>
      <View style={[s.group, { backgroundColor: colors.surface }]}>
        {OPTIONS.map(({ value, label }) => {
          const selected = preference === value;
          return (
            <Pressable
              key={value}
              onPress={() => setPreference(value)}
              style={[
                s.option,
                {
                  backgroundColor: selected ? colors.primary : "transparent",
                },
              ]}
            >
              <Text
                style={[
                  s.optionLabel,
                  { color: selected ? colors.onPrimary : colors.text },
                ]}
              >
                {label}
              </Text>
            </Pressable>
          );
        })}
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    padding: Spacing.three,
    gap: Spacing.two,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.label,
    marginLeft: Spacing.one,
  },
  group: {
    flexDirection: "row",
    borderRadius: Radius.md,
    padding: Spacing.one,
    gap: Spacing.one,
    borderWidth: BorderWidth.thin,
    borderColor: "transparent",
  },
  option: {
    flex: 1,
    alignItems: "center",
    paddingVertical: Spacing.two + Spacing.one,
    borderRadius: Radius.sm,
  },
  optionLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});
