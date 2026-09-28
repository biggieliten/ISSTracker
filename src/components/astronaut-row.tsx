import { Astronaut } from "@/api/astronauts";
import { ArrowRight } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AstronautRow({ astronaut }: { astronaut: Astronaut }) {
  return (
    <Pressable style={s.root}>
      <View style={s.details}>
        <Image
          style={s.thumbNail}
          source={{ uri: astronaut.image.thumbnail_url }}
        />
        <Text style={s.text}>{astronaut.name}</Text>
      </View>
      <ArrowRight size={30} color="white" />
    </Pressable>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: "#131314",
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    marginVertical: 3,
    borderRadius: 12,
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
  thumbNail: {
    width: 90,
    height: 90,
    borderTopLeftRadius: 12,
    borderBottomLeftRadius: 12,
  },
  details: { flexDirection: "row", gap: 8 },
  text: {
    color: "#ffff",
    fontWeight: "bold",
    fontSize: 24,
  },
  arrow: {
    marginRight: 15,
  },
});
