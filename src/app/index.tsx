import { Astronaut, getAstronautsInSpaceNow } from "@/api/astronauts";
import AstronautRow from "@/components/astronaut-row";
import { useQuery } from "@tanstack/react-query";
import { StyleSheet, Text } from "react-native";

import { ScrollView, View } from "react-native";

export default function HomeScreen() {
  const { data, isPending } = useQuery({
    queryKey: ["astronauts"],
    queryFn: getAstronautsInSpaceNow,
  });

  //   console.log(data);
  return (
    <>
      <ScrollView contentContainerStyle={s.root}>
        {isPending && (
          <View style={s.pending}>
            <Text>Loading astronauts...</Text>
          </View>
        )}
        {data?.results.map((astronaut: Astronaut) => (
          <AstronautRow astronaut={astronaut} />
        ))}
      </ScrollView>
    </>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    // justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  pending: { color: "red", marginTop: 20 },
});
