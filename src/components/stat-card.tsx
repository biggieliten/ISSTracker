import { LucideIcon } from "lucide-react-native";
import { StyleSheet, Text, View } from "react-native";

type Props = { icon: LucideIcon; label: string; value: string };

export default function StatCard({ icon: Icon, label, value }: Props) {
  return (
    <View style={s.root}>
      <Icon size={18} color="#2563EB" />
      <Text style={s.label}>{label}</Text>
      <Text style={s.value}>{value}</Text>
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: "#131314",
    borderRadius: 12,
    padding: 14,
    gap: 4,
    flexGrow: 1,
    flexBasis: "45%",
  },
  value: {
    color: "#ffff",
    fontSize: 16,
    fontWeight: "bold",
  },
  label: {
    color: "#B0B4BA",
    fontSize: 13,
  },
});
