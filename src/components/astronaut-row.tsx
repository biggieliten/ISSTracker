import { Astronaut } from "@/api/astronauts";
import {
  FontSize,
  FontWeight,
  IconSize,
  Radius,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { Link } from "expo-router";
import { ArrowRight } from "lucide-react-native";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

export default function AstronautRow({ astronaut }: { astronaut: Astronaut }) {
  const { colors } = useTheme();

  return (
    <Link
      href={{
        pathname: "/(tabs)/home/astronaut/[id]",
        params: { id: astronaut.id },
      }}
      asChild
    >
      <Pressable
        style={StyleSheet.flatten([
          s.root,
          { backgroundColor: colors.surface, borderLeftColor: colors.primary },
        ])}
      >
        <View style={s.details}>
          <Image
            style={s.thumbNail}
            source={{ uri: astronaut.image.thumbnail_url }}
          />
          <View>
            <Text style={[s.name, { color: colors.text }]}>
              {astronaut.name}
            </Text>
            <Text style={{ color: colors.text }}>
              {astronaut.nationality.map((n) => n.alpha_3_code).join(", ")}
            </Text>
          </View>
        </View>
        <ArrowRight size={IconSize.md} color={colors.icon} />
      </Pressable>
    </Link>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    flexGrow: 1,
    flexDirection: "row",
    marginVertical: 3,
    borderRadius: Radius.md,
    justifyContent: "space-between",
    alignItems: "center",
    paddingRight: 15,
  },
  thumbNail: {
    width: 90,
    height: 90,
    borderTopLeftRadius: Radius.md,
    borderBottomLeftRadius: Radius.md,
  },
  details: { flexDirection: "row", gap: Spacing.two },
  name: {
    fontWeight: FontWeight.bold,
    fontSize: FontSize.xl,
    alignSelf: "flex-end",
    marginBottom: 3,
  },
});
