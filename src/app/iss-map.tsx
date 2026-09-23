import type { ISSCoordinates } from "@/api/iss";
import getISSCoordinates from "@/api/iss";
import { useQuery } from "@tanstack/react-query";
import { Image } from "expo-image";
import { useEffect, useState } from "react";
import {
  Button,
  PixelRatio,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from "react-native";

const GEOAPIFY_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

export default function ISSMap() {
  const { width } = useWindowDimensions();
  const pixelRatio = PixelRatio.get();
  const [zoom, setZoom] = useState(1);
  const [debounceZoom, setDebounceZoom] = useState(zoom);
  const mapWidth = Math.round(width * pixelRatio);
  const mapHeight = Math.round(mapWidth * 0.66);

  useEffect(() => {
    const timeOut = setTimeout(() => setDebounceZoom(zoom), 400);
    return () => clearTimeout(timeOut);
  }, [zoom]);

  const { data, isPending, isError } = useQuery<ISSCoordinates>({
    queryKey: ["coordinates"],
    queryFn: getISSCoordinates,
    refetchInterval: 5000,
  });

  if (isPending) {
    return <Text>Loading ISS location...</Text>;
  }

  if (isError) {
    return <Text>Could not get ISS location at this time...</Text>;
  }

  const lon = Number(data.iss_position.longitude);
  const lat = Number(data.iss_position.latitude);

  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=dark-matter-dark-grey&width=${mapWidth}&height=${mapHeight}&attribution=none&scaleFactor=1&center=lonlat:${lon},${lat}&zoom=${debounceZoom}&marker=lonlat:${lon},${lat};type:circle;icon:satellite;icontype:awesome;contentcolor:%2300d9ff;size:large&apiKey=${GEOAPIFY_API_KEY}`;

  return (
    <View style={styles.container}>
      <Image source={{ uri: mapUrl }} style={styles.map} contentFit="cover" />
      <View>
        <Button
          title="+"
          onPress={() => setZoom((z: number) => Math.min(z + 0.5, 20))}
        />
        <Button
          title="-"
          onPress={() => setZoom((z: number) => Math.max(z - 0.5, 0))}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, width: "100%" },
  map: { flex: 1, width: "100%" },
});
