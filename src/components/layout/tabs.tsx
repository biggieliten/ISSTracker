import { NativeTabs } from "expo-router/unstable-native-tabs";

export default function Tabs() {
  //   const scheme = useColorScheme();
  //   const colors = Colors[scheme === "unspecified" ? "light" : scheme];

  return (
    <NativeTabs
    //   backgroundColor={colors.background}
    //   indicatorColor={colors.backgroundElement}
    //   labelStyle={{ selected: { color: colors.text } }}
    >
      <NativeTabs.Trigger name="home">
        <NativeTabs.Trigger.Label>Home</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: "home", selected: "home_filled" }}
          sf={{ default: "house", selected: "house.fill" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="iss-map">
        <NativeTabs.Trigger.Label>Map</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: "map", selected: "map" }}
          sf={{ default: "map", selected: "map.fill" }}
        />
      </NativeTabs.Trigger>

      <NativeTabs.Trigger name="app-settings">
        <NativeTabs.Trigger.Label>Settings</NativeTabs.Trigger.Label>
        <NativeTabs.Trigger.Icon
          md={{ default: "settings", selected: "settings" }}
          sf={{ default: "gear", selected: "gear" }}
        />
      </NativeTabs.Trigger>
    </NativeTabs>
  );
}
