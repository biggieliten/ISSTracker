import getISSCoordinates from "@/api/iss";
import { SATELLITE_SVG, USER_SVG } from "@/assets/map-markers";
import { useGetLocation } from "@/hooks/useGetLocation";
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
import { LeafletView, MapMarker } from "react-native-leaflet-view";

export default function ISSMap() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["coordinates"],
    queryFn: getISSCoordinates,
    // refetchInterval: 5000,
  });

  if (isError) return null;

  const { WatchLocation, RequestLocation, location } = useGetLocation();

  const [webViewContent, setWebViewContent] = useState<string | null>(null);
  const [zoom, setZoom] = useState(5);
  const [followISS, setFollowISS] = useState(true);

  useEffect(() => {
    WatchLocation();
  }, [WatchLocation]);

  useEffect(() => {
    let isMounted = true;

    const loadHtml = async () => {
      try {
        const path = require("../../assets/leaflet.html");
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
      icon: SATELLITE_SVG,
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
      <View style={s.followIssSwitch}>
        <Text style={s.switchLabel}>Follow ISS</Text>
        <Switch
          value={followISS}
          onValueChange={setFollowISS}
          trackColor={{ false: "#CBD5E1", true: "#93C5FD" }}
          thumbColor={followISS ? "#2563EB" : "#F8FAFC"}
        />
      </View>
      <LeafletView
        doDebug={false}
        source={{ html: webViewContent }}
        mapMarkers={mapMarkers}
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
  followIssSwitch: {
    position: "absolute",
    bottom: 24,
    right: 20,
    zIndex: 10,
    elevation: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    paddingLeft: 14,
    paddingRight: 8,
    height: 48,
    backgroundColor: "#FFFFFF",
    borderWidth: 1,
    borderColor: "#E2E8F0",
    borderRadius: 24,
  },

  switchLabel: {
    fontSize: 14,
    fontWeight: "600",
  },
});
