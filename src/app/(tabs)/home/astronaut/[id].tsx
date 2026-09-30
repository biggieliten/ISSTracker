import { getAstronautsInSpaceNow } from "@/api/astronauts";
import StatCard from "@/components/stat-card";
import {
  FontSize,
  FontWeight,
  IconSize,
  LetterSpacing,
  LineHeight,
  Radius,
  Spacing,
} from "@/constants/theme";
import { useTheme } from "@/hooks/useTheme";
import { formatIsoDuration } from "@/utils/duration";
import { useQuery } from "@tanstack/react-query";
import { differenceInDays, format } from "date-fns";
import { router, useLocalSearchParams } from "expo-router";
import * as WebBrowser from "expo-web-browser";
import {
  ArrowLeft,
  BookOpen,
  Cake,
  CalendarClock,
  CalendarDays,
  Clock,
  Cross,
  ExternalLink,
  Flag,
  Footprints,
  Hourglass,
  LucideIcon,
  PlaneLanding,
  Rocket,
  Timer,
} from "lucide-react-native";
import { ReactNode } from "react";
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

type Stat = { icon: LucideIcon; label: string; value: string | null };

const formatDate = (iso: string | null) =>
  iso ? format(new Date(iso), "d MMM yyyy") : null;

const formatCount = (n: number | null) => (n === null ? null : String(n));

const openLink = (url: string) =>
  WebBrowser.openBrowserAsync(url, { createTask: false });

export default function AstronautView() {
  const { id } = useLocalSearchParams();
  const { top } = useSafeAreaInsets();
  const { colors } = useTheme();

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["astronauts"],
    queryFn: getAstronautsInSpaceNow,
    staleTime: THREE_HOURS_MS,
    select: (data) => data.results.find((a) => String(a.id) === id),
  });

  if (isPending)
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );

  if (isError || !data)
    return (
      <View style={[s.center, { backgroundColor: colors.background }]}>
        <Text style={{ color: colors.text }}>
          {isError ? error.message : "Astronaut not found"}
        </Text>
      </View>
    );

  const career: Stat[] = [
    { icon: Rocket, label: "Flights", value: formatCount(data.flights_count) },
    {
      icon: Footprints,
      label: "Spacewalks",
      value: formatCount(data.spacewalks_count),
    },
    {
      icon: PlaneLanding,
      label: "Landings",
      value: formatCount(data.landings_count),
    },
  ];

  const timeInSpace: Stat[] = [
    {
      icon: Hourglass,
      label: "Total in space",
      value: formatIsoDuration(data.time_in_space),
    },
    {
      icon: Clock,
      label: "Spacewalk time",
      value: formatIsoDuration(data.eva_time),
    },
    {
      icon: Timer,
      label: "Current mission",
      value:
        data.in_space && data.last_flight
          ? `${differenceInDays(new Date(), new Date(data.last_flight))} days`
          : null,
    },
  ];

  const personal: Stat[] = [
    { icon: Cake, label: "Age", value: formatCount(data.age) },
    {
      icon: Flag,
      label: "Nationality",
      value: data.nationality.map((n) => n.name).join(", ") || null,
    },
    { icon: Cross, label: "Died", value: formatDate(data.date_of_death) },
    {
      icon: CalendarDays,
      label: "First flight",
      value: formatDate(data.first_flight),
    },
    {
      icon: CalendarClock,
      label: "Latest launch",
      value: formatDate(data.last_flight),
    },
  ];

  const agencyLine = [data.agency.abbrev || data.agency.name, data.type?.name]
    .filter(Boolean)
    .join(" · ");

  return (
    <ScrollView
      style={{ backgroundColor: colors.background }}
      contentContainerStyle={s.scroll}
    >
      <Pressable
        style={[s.backBtn, { top: top + Spacing.two }]}
        onPress={() => router.back()}
        hitSlop={8}
      >
        <ArrowLeft color="#FFFFFF" size={IconSize.md - 6} />
      </Pressable>

      <Image style={s.image} source={{ uri: data.image.image_url }} />

      <View style={[s.sheet, { backgroundColor: colors.background }]}>
        <View style={s.header}>
          <Text style={[s.name, { color: colors.text }]}>{data.name}</Text>
          <View style={s.badges}>
            <Badge
              label={data.status.name}
              color={colors.primary}
              background={colors.primaryMuted}
            />
            {data.in_space && (
              <Badge
                label="In space"
                color={colors.success}
                background={colors.successMuted}
                dot
              />
            )}
          </View>
          {agencyLine ? (
            <Text style={[s.agency, { color: colors.textSecondary }]}>
              {agencyLine}
            </Text>
          ) : null}
        </View>

        <StatGroup title="Career" stats={career} columns={3} />
        <StatGroup title="Time in space" stats={timeInSpace} />
        <StatGroup title="Personal" stats={personal} />

        {data.bio ? (
          <Section title="Biography">
            <View style={[s.card, { backgroundColor: colors.surface }]}>
              <Text style={[s.bio, { color: colors.text }]}>{data.bio}</Text>
            </View>
          </Section>
        ) : null}

        {data.wiki || data.social_media_links.length > 0 ? (
          <Section title="Links">
            <View style={s.links}>
              {data.wiki ? (
                <LinkButton
                  label="Wikipedia"
                  icon={BookOpen}
                  onPress={() => openLink(data.wiki!)}
                />
              ) : null}
              {data.social_media_links.map((link) => (
                <LinkButton
                  key={link.id}
                  label={link.social_media.name}
                  logoUri={link.social_media.logo?.thumbnail_url}
                  onPress={() => openLink(link.url)}
                />
              ))}
            </View>
          </Section>
        ) : null}
      </View>
    </ScrollView>
  );
}

function Section({ title, children }: { title: string; children: ReactNode }) {
  const { colors } = useTheme();

  return (
    <View style={s.section}>
      <Text style={[s.sectionLabel, { color: colors.textSecondary }]}>
        {title.toUpperCase()}
      </Text>
      {children}
    </View>
  );
}

function StatGroup({
  title,
  stats,
  columns = 2,
}: {
  title: string;
  stats: Stat[];
  columns?: 2 | 3;
}) {
  const visible = stats.filter(
    (stat): stat is Stat & { value: string } => stat.value !== null,
  );
  if (visible.length === 0) return null;

  return (
    <Section title={title}>
      <View style={s.stats}>
        {visible.map((stat) => (
          <StatCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            style={columns === 3 ? s.statThird : undefined}
          />
        ))}
      </View>
    </Section>
  );
}

function Badge({
  label,
  color,
  background,
  dot,
}: {
  label: string;
  color: string;
  background: string;
  dot?: boolean;
}) {
  return (
    <View style={[s.badge, { backgroundColor: background }]}>
      {dot ? <View style={[s.badgeDot, { backgroundColor: color }]} /> : null}
      <Text style={[s.badgeLabel, { color }]}>{label}</Text>
    </View>
  );
}

function LinkButton({
  label,
  icon: Icon,
  logoUri,
  onPress,
}: {
  label: string;
  icon?: LucideIcon;
  logoUri?: string;
  onPress: () => void;
}) {
  const { colors } = useTheme();

  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        s.linkButton,
        {
          backgroundColor: pressed ? colors.backgroundSelected : colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {logoUri ? (
        <Image source={{ uri: logoUri }} style={s.linkLogo} />
      ) : Icon ? (
        <Icon size={IconSize.sm} color={colors.primary} />
      ) : null}
      <Text style={[s.linkLabel, { color: colors.text }]}>{label}</Text>
      <ExternalLink size={14} color={colors.textSecondary} />
    </Pressable>
  );
}

const s = StyleSheet.create({
  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: Spacing.three,
  },
  scroll: {
    paddingBottom: Spacing.five,
  },
  backBtn: {
    position: "absolute",
    left: Spacing.three,
    zIndex: 10,
    width: 40,
    height: 40,
    borderRadius: Radius.full,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: 420,
  },
  sheet: {
    marginTop: -Spacing.four,
    borderTopLeftRadius: Radius.xl,
    borderTopRightRadius: Radius.xl,
    paddingHorizontal: Spacing.three,
    paddingTop: Spacing.four,
    gap: Spacing.four,
  },
  header: {
    gap: Spacing.two,
  },
  name: {
    fontSize: FontSize.xxl,
    fontWeight: FontWeight.bold,
  },
  badges: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  badge: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.one + 2,
    paddingHorizontal: Spacing.two + 2,
    paddingVertical: Spacing.one,
    borderRadius: Radius.full,
  },
  badgeDot: {
    width: 8,
    height: 8,
    borderRadius: Radius.full,
  },
  badgeLabel: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
  },
  agency: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.medium,
  },
  section: {
    gap: Spacing.two,
  },
  sectionLabel: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.semibold,
    letterSpacing: LetterSpacing.label,
    marginLeft: Spacing.one,
  },
  stats: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  statThird: {
    flexBasis: "30%",
  },
  card: {
    borderRadius: Radius.md,
    padding: Spacing.three,
  },
  bio: {
    fontSize: FontSize.md,
    lineHeight: LineHeight.body + 2,
  },
  links: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: Spacing.two,
  },
  linkButton: {
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    paddingHorizontal: Spacing.three - 2,
    paddingVertical: Spacing.two + 2,
    borderRadius: Radius.full,
    borderWidth: 1,
  },
  linkLogo: {
    width: 18,
    height: 18,
    borderRadius: Radius.sm / 2,
  },
  linkLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});
