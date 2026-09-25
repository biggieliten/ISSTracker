import getISSCoordinates from "@/api/iss";
import {
  DARK_SATELLITE_SVG,
  LIGHT_SATELLITE_SVG,
  USER_SVG,
} from "@/assets/map-markers";
import { useGetDeviceLocation } from "@/hooks/useGetLocation";
import { useQuery } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
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
} from "react-native-leaflet-view";

const MapLayers = {
  dark: {
    layerType: MapLayerType.TILE_LAYER,
    url: "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png?key=cb1_3xop_1_c901e44bfd7051cbb3a68d84",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
  light: {
    layerType: MapLayerType.TILE_LAYER,
    url: "https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png?key=cb1_3xop_1_c901e44bfd7051cbb3a68d84",
    attribution: '&copy; <a href="https://carto.com/">CARTO</a>',
  },
};

export default function ISSMap() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["coordinates"],
    queryFn: getISSCoordinates,
    // refetchInterval: 5000,
  });

  if (isError) return null;

  const { location } = useGetDeviceLocation();

  const [webViewContent, setWebViewContent] = useState<string | null>(null);
  const [zoom, setZoom] = useState(5);
  const [followISS, setFollowISS] = useState(true);
  const [isDarkMap, setIsDarkMap] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const path = require("../../../assets/leaflet.html");
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

  if (!webViewContent || isPending) {
    return (
      <View style={s.root}>
        <ActivityIndicator size="large" color="#2563EB" />
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
      icon: isDarkMap ? DARK_SATELLITE_SVG : LIGHT_SATELLITE_SVG,
      position: [data.iss_position.latitude, data.iss_position.longitude],
    },
  ];

  if (location) {
    mapMarkers.push({
      icon: USER_SVG,
      position: [location.latitude, location.longitude],
    });
  }

  return (
    <View style={s.root}>
      <View style={s.settings}>
        <View style={s.switch}>
          <Text style={s.switchLabel}>Follow ISS</Text>
          <Switch
            value={followISS}
            onValueChange={setFollowISS}
            trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
            thumbColor={followISS ? "#2563EB" : "#F8FAFC"}
          />
        </View>
        <View style={s.switch}>
          <Text style={s.switchLabel}>Dark Map</Text>
          <Switch
            value={isDarkMap}
            onValueChange={setIsDarkMap}
            trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
            thumbColor={followISS ? "#2563EB" : "#F8FAFC"}
          />
        </View>
      </View>
      <LeafletView
        doDebug={false}
        source={{ html: webViewContent }}
        mapMarkers={mapMarkers}
        mapLayers={isDarkMap ? [MapLayers.dark] : [MapLayers.light]}
        mapCenterPosition={
          followISS
            ? {
                lat: data.iss_position.latitude,
                lng: data.iss_position.longitude,
              }
            : null
        }
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
    // height: "100%",
    // position: "relative",
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
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 24,
  },
  switch: { flexDirection: "row", alignItems: "center" },

  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
