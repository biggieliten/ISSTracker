import getISSCoordinates from "@/api/iss";
import {
  DARK_SATELLITE_SVG,
  LIGHT_SATELLITE_SVG,
  USER_SVG,
} from "@/assets/map-markers";
import { showVisibilityCircleAtom, unitsAtom } from "@/atoms/settings";
import IssCompass from "@/components/iss-compass";
import {
  BorderWidth,
  FontSize,
  FontWeight,
  Radius,
  Spacing,
} from "@/constants/theme";
import { useGetDeviceLocation } from "@/hooks/useGetLocation";
import { useNextFlyover } from "@/hooks/useNextFlyover";
import { useTheme } from "@/hooks/useTheme";
import {
  calcIssBearing,
  calcIssDistance,
  formatDistance,
  VISIBILITY_RADIUS_KM,
} from "@/utils/iss-proximity";
import { useQuery } from "@tanstack/react-query";
import { formatDistanceToNow } from "date-fns";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Alert,
  StyleSheet,
  Switch,
  Text,
  View,
} from "react-native";
import {
  LeafletView,
  MapLayerType,
  MapMarker,
  MapShape,
  MapShapeType,
} from "react-native-leaflet-view";

const CARTO_API_KEY = process.env.EXPO_PUBLIC_CARTO_API_KEY;

const MapLayers = {
  dark: {
    layerType: MapLayerType.TILE_LAYER,
    url: `https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`,
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    minZoom: 2,
  },
  light: {
    layerType: MapLayerType.TILE_LAYER,
    url: `https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=${CARTO_API_KEY}`,
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
    minZoom: 2,
  },
};

// The map library draws our 24px icons from a 12px box: centred sideways but
// hanging down from the top. This anchor puts the icon's centre on its position.
const MARKER_ANCHOR: [number, number] = [6, 12];

export default function ISSMap() {
  const { colors, isDark } = useTheme();
  const units = useAtomValue(unitsAtom);
  const showVisibilityCircle = useAtomValue(showVisibilityCircleAtom);
  const { data, isPending, isError } = useQuery({
    queryKey: ["coordinates"],
    queryFn: getISSCoordinates,
    refetchInterval: 5000,
  });

  const { location } = useGetDeviceLocation();
  const nextFlyover = useNextFlyover(location);

  const [webViewContent, setWebViewContent] = useState<string>();
  const [zoom, setZoom] = useState(5);
  const [followISS, setFollowISS] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const path = require("../../../../assets/leaflet.html");
        const asset = Asset.fromModule(path);
        await asset.downloadAsync();
        const htmlContent = await FileSystem.readAsStringAsync(asset.localUri!);

        if (isMounted) {
          setWebViewContent(htmlContent);
        }
      } catch (error) {
        Alert.alert("Error loading HTML", JSON.stringify(error));
        console.error("Error loading HTML:", error);
      }
    };

    loadHtml();

    return () => {
      isMounted = false;
    };
  }, []);

  if (isError)
    return (
      <Text style={{ color: colors.text }}>Failed to load ISS position.</Text>
    );

  if (!webViewContent || isPending) {
    return (
      <View style={[s.root, { backgroundColor: colors.background }]}>
        <ActivityIndicator size="large" color={colors.primary} />
      </View>
    );
  }

  const handleMapMessage = (message: any) => {
    if (message.event === "onZoomEnd") {
      const nextZoom = message.payload?.zoom;

      if (typeof nextZoom === "number") {
        setZoom(nextZoom);
      }
    }
  };

  const mapMarkers: MapMarker[] = [
    {
      icon: isDark ? DARK_SATELLITE_SVG : LIGHT_SATELLITE_SVG,
      iconAnchor: MARKER_ANCHOR,
      position: [data.iss_position.latitude, data.iss_position.longitude],
    },
  ];

  if (location) {
    mapMarkers.push({
      icon: USER_SVG,
      iconAnchor: MARKER_ANCHOR,
      position: [location.latitude, location.longitude],
    });
  }

  const issCoords = {
    latitude: Number(data.iss_position.latitude),
    longitude: Number(data.iss_position.longitude),
  };

  const distance = location ? calcIssDistance(location, issCoords) : null;
  const bearing = location ? calcIssBearing(location, issCoords) : null;
  const isAboveHorizon = distance !== null && distance <= VISIBILITY_RADIUS_KM;

  const mapShapes: MapShape[] = [
    {
      shapeType: MapShapeType.CIRCLE,
      color: colors.primary,
      center: { lat: issCoords.latitude, lng: issCoords.longitude },
      radius: VISIBILITY_RADIUS_KM * 1000,
    },
  ];

  const LIMIT_MAP_TO_WORLD = `
  L.Map.mergeOptions({
    maxBounds: L.latLngBounds([[-85, -Infinity], [85, Infinity]]),
    maxBoundsViscosity: 1,
  });
  true;
`;

  return (
    <View style={s.root}>
      {distance !== null && bearing !== null && (
        <View
          style={[
            s.distance,
            { backgroundColor: colors.surface, borderColor: colors.border },
          ]}
        >
          <IssCompass bearing={bearing} />
          <View>
            <Text style={[s.distanceLabel, { color: colors.textSecondary }]}>
              Distance to ISS
            </Text>
            <Text style={[s.distanceValue, { color: colors.text }]}>
              {formatDistance(distance, units)}
            </Text>
            {isAboveHorizon && (
              <Text style={[s.distanceLabel, { color: colors.success }]}>
                Above your horizon
              </Text>
            )}
            {!isAboveHorizon && nextFlyover && (
              <Text style={[s.distanceLabel, { color: colors.textSecondary }]}>
                Next flyover in {formatDistanceToNow(nextFlyover)}
              </Text>
            )}
          </View>
        </View>
      )}
      <View
        style={[
          s.settings,
          { backgroundColor: colors.surface, borderColor: colors.border },
        ]}
      >
        <View style={s.switch}>
          <Text style={[s.switchLabel, { color: colors.text }]}>
            Follow ISS
          </Text>
          <Switch
            value={followISS}
            onValueChange={setFollowISS}
            trackColor={{
              false: colors.switchTrackOff,
              true: colors.switchTrackOn,
            }}
            thumbColor={followISS ? colors.primary : colors.switchThumbOff}
          />
        </View>
      </View>
      <LeafletView
        doDebug={false}
        source={{ html: webViewContent }}
        mapMarkers={mapMarkers}
        mapShapes={showVisibilityCircle ? mapShapes : []}
        mapLayers={isDark ? [MapLayers.dark] : [MapLayers.light]}
        mapCenterPosition={
          followISS
            ? {
                lat: data.iss_position.latitude,
                lng: data.iss_position.longitude,
              }
            : null
        }
        injectedJavaScript={LIMIT_MAP_TO_WORLD}
        zoom={zoom}
        onMessageReceived={handleMapMessage}
        zoomControl={false}
      />
    </View>
  );
}

const s = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: "center",
    flexDirection: "row",
  },
  settings: {
    position: "absolute",
    bottom: 24,
    right: 20,
    zIndex: 10,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    padding: 10,
    borderWidth: BorderWidth.thin,
    borderRadius: Radius.xl,
  },
  switch: { flexDirection: "row", alignItems: "center", gap: Spacing.one },

  switchLabel: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
  distance: {
    position: "absolute",
    bottom: 24,
    left: 20,
    zIndex: 10,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: Spacing.two,
    padding: 10,
    borderWidth: BorderWidth.thin,
    borderRadius: Radius.xl,
  },
  distanceLabel: {
    fontSize: FontSize.xs,
  },
  distanceValue: {
    fontSize: FontSize.md,
    fontWeight: FontWeight.semibold,
  },
});
