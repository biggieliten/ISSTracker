import { StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

type Props = { title: string };

export default function Header({ title }: Props) {
  return (
    <SafeAreaView edges={["top"]} style={s.root}>
      <View style={s.bar}>
        <Text style={s.title}>{title}</Text>
      </View>
    </SafeAreaView>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: "#212225",
    paddingBottom: 10,
  },
  bar: {
    height: 56,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    color: "white",
    fontWeight: "bold",
    fontSize: 20,
  },
  safeView: {},
});
