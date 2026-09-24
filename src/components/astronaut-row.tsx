import { Astronaut } from "@/api/astronauts";
import { Text, View } from "react-native";

export default function AstronautRow({ astronaut }: { astronaut: Astronaut }) {
  return (
    <View>
      <Text>{astronaut.name}</Text>
    </View>
  );
}
