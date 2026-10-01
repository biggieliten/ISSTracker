import { IconSize } from "@/constants/theme";
import { useHeading } from "@/hooks/useHeading";
import { useTheme } from "@/hooks/useTheme";
import { ArrowUp } from "lucide-react-native";
import { View } from "react-native";

export default function IssCompass({ bearing }: { bearing: number }) {
  const { colors } = useTheme();
  const heading = useHeading();

  if (heading === null) return null;

  return (
    <View style={{ transform: [{ rotate: `${bearing - heading}deg` }] }}>
      <ArrowUp size={IconSize.md} color={colors.primary} />
    </View>
  );
}
