import {
  showVisibilityCircleAtom,
  unitsAtom,
  type ThemePreference,
  type Units,
} from "@/atoms/settings";
import {
  BorderWidth,
  FontSize,
  FontWeight,
  LetterSpacing,
  Radius,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { useAtom } from "jotai";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";

const OPTIONS: { value: ThemePreference; label: string }[] = [
  { value: "system", label: "System" },
  { value: "light", label: "Light" },
  { value: "dark", label: "Dark" },
];

const UNIT_OPTIONS: { value: Units; label: string }[] = [
  { value: "metric", label: "Metric" },
  { value: "imperial", label: "Imperial" },
];

export default function Settings() {
  const { colors, preference, setPreference } = useTheme();
  const [units, setUnits] = useAtom(unitsAtom);
  const [showVisibilityCircle, setShowVisibilityCircle] = useAtom(
    showVisibilityCircleAtom,
  );

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

      <Text
        style={[s.sectionLabel, s.sectionGap, { color: colors.textSecondary }]}
      >
        UNITS
      </Text>
      <View style={[s.group, { backgroundColor: colors.surface }]}>
        {UNIT_OPTIONS.map(({ value, label }) => {
          const selected = units === value;
          return (
            <Pressable
              key={value}
              onPress={() => setUnits(value)}
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

      <Text
        style={[s.sectionLabel, s.sectionGap, { color: colors.textSecondary }]}
      >
        MAP
      </Text>
      <View style={[s.row, { backgroundColor: colors.surface }]}>
        <View style={s.rowText}>
          <Text style={[s.rowTitle, { color: colors.text }]}>
            Visibility circle
          </Text>
          <Text style={[s.rowSub, { color: colors.textSecondary }]}>
            Shows where the ISS is above the horizon.
          </Text>
        </View>
        <Switch
          value={showVisibilityCircle}
          onValueChange={setShowVisibilityCircle}
          trackColor={{
            false: colors.switchTrackOff,
            true: colors.switchTrackOn,
          }}
          thumbColor={
            showVisibilityCircle ? colors.primary : colors.switchThumbOff
          }
        />
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
  sectionGap: {
    marginTop: Spacing.three,
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
  row: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.three,
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  rowText: {
    flex: 1,
    gap: Spacing.half,
  },
  rowTitle: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.semibold,
  },
  rowSub: {
    fontSize: FontSize.sm,
  },
});
