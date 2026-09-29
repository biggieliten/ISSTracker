import { getAstronautsInSpaceNow } from "@/api/astronauts";
import StatCard from "@/components/stat-card";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, differenceInYears } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowLeft,
  Cake,
  CalendarClock,
  Rocket,
  Timer,
} from "lucide-react-native";
import {
  ActivityIndicator,
  Image,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
const THREE_HOURS_MS = 3 * 60 * 60 * 1000;

export default function AstronauotView() {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();

  const { data, isPending, isError, isFetchedAfterMount } = useQuery({
    queryKey: ["astronauts"],
    queryFn: getAstronautsInSpaceNow,
    staleTime: THREE_HOURS_MS,
    select: (data) => data.results.find((a) => String(a.id) === id),
  });

  if (isError) return;

  if (isPending)
    return (
      <View style={s.root}>
        <ActivityIndicator size="large" color="#2563EB" />
      </View>
    );

  if (!data)
    return (
      <View>
        <Text>Astronaut not found</Text>
      </View>
    );

  console.log(
    isFetchedAfterMount ? "fetched from network" : "served from cache",
  );

  const getAge = (date?: string) => {
    if (!date) return;
    const birthDate = new Date(date);
    const age = new Date().getTime() - birthDate.getTime();
    return age;
  };

  return (
    <ScrollView style={s.root}>
      <Pressable
        style={[s.backBtn, { top: top }]}
        onPress={() => router.back()}
      >
        <ArrowLeft color="#ffff" size={30} />
      </Pressable>
      <Image style={s.image} source={{ uri: data.image.image_url }} />
      <View style={s.content}>
        <Text style={s.name}>{data.name}</Text>
        <View style={s.stats}>
          <StatCard
            icon={Cake}
            label="Age"
            value={
              data.date_of_birth
                ? differenceInYears(
                    new Date().getTime(),
                    new Date(data.date_of_birth).getTime(),
                  ).toString()
                : "Age is unknown"
            }
          />
          <StatCard
            icon={ArrowLeft}
            label="Nationality"
            value={data.nationality
              .map((n) => `${n.name} (${n.alpha_3_code})`)
              .join(", ")}
          />
          <StatCard
            icon={Rocket}
            label="First flight"
            value={
              data.first_flight
                ? new Date(data.first_flight).toDateString()
                : "Latest flight is unkown"
            }
          />
          <StatCard
            icon={CalendarClock}
            label="Latest launch"
            value={
              data.last_flight
                ? new Date(data.last_flight).toDateString()
                : "Latest flight is unkown"
            }
          />
          <StatCard
            icon={Timer}
            label="Days in space"
            value={
              data.last_flight
                ? differenceInDays(
                    new Date().getTime(),
                    new Date(data.last_flight).getTime(),
                  ).toString() + " days"
                : "Days in space is currently unknown"
            }
          />
        </View>
      </View>
    </ScrollView>
  );
}

const s = StyleSheet.create({
  root: {
    backgroundColor: "#323335",
    flex: 1,
    position: "relative",
  },
  name: { color: "#ffff", fontSize: 30, fontWeight: "bold" },
  backBtn: { position: "absolute", left: 25, zIndex: 10 },
  image: { width: "100%", height: 500 },
  content: {
    marginTop: -24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    backgroundColor: "#323335",
    padding: 10,
    gap: 8,
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginTop: 12,
  },
});
