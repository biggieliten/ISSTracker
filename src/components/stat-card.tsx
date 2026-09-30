import {
  FontSize,
  FontWeight,
  IconSize,
  Radius,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { LucideIcon } from "lucide-react-native";
import {
  StyleProp,
  StyleSheet,
  Text,
  View,
  ViewStyle,
} from "react-native";

type Props = {
  icon: LucideIcon;
  label: string;
  value: string;
  style?: StyleProp<ViewStyle>;
};

export default function StatCard({ icon: Icon, label, value, style }: Props) {
  const { colors } = useTheme();

  return (
    <View style={[s.root, { backgroundColor: colors.surface }, style]}>
      <Icon size={IconSize.sm} color={colors.primary} />
      <Text style={[s.label, { color: colors.textSecondary }]}>{label}</Text>
      <Text style={[s.value, { color: colors.text }]}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    borderRadius: Radius.md,
    padding: 14,
    gap: Spacing.one,
    flexGrow: 1,
    flexBasis: "45%",
  },
  value: {
    fontSize: FontSize.base,
    fontWeight: FontWeight.bold,
  },
  label: {
    fontSize: FontSize.sm,
  },
});
