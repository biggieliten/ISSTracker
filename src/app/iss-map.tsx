import getISSCoordinates from "@/api/iss";
import { useQuery } from "@tanstack/react-query";
import { Asset } from "expo-asset";
import * as FileSystem from "expo-file-system/legacy";
import { useEffect, useState } from "react";
import { ActivityIndicator, Alert } from "react-native";
import { LeafletView } from "react-native-leaflet-view";

export default function ISSMap() {
  const { data, isPending, isError } = useQuery({
    queryKey: ["coordinates"],
    queryFn: getISSCoordinates,
    refetchInterval: 5000,
  });

  const [webViewContent, setWebViewContent] = useState<string | null>(null);

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

  if (isPending) return null;
  if (isError) return null;
  if (!webViewContent) {
    return <ActivityIndicator size="large" />;
  }

  return (
    <LeafletView
      source={{ html: webViewContent }}
      mapCenterPosition={{
        lat: data.iss_position.latitude,
        lng: data.iss_position.longitude,
      }}
    />
  );
}
