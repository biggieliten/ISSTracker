import { FontSize, FontWeight, Spacing } from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = { title: string };

export default function Header({ title }: Props) {
  const { colors } = useTheme();

  return (
    <SafeAreaView
      edges={["top"]}
      style={[s.root, { backgroundColor: colors.backgroundElement }]}
    >
      <View style={s.bar}>
        <Text style={[s.title, { color: colors.text }]}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    paddingBottom: Spacing.two + Spacing.half,
  },
  bar: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.lg,
  },
});
