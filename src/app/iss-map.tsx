import { Image } from "expo-image";
import { useState } from "react";
import {
  Button,
  PixelRatio,
  StyleSheet,
  View,
  useWindowDimensions,
} from "react-native";

const GEOAPIFY_API_KEY = process.env.EXPO_PUBLIC_GEOAPIFY_API_KEY;

const LATITUDE = 59.33;
const LONGITUDE = 18.06;

export default function ISSMap() {
  const { width } = useWindowDimensions();
  const pixelRatio = PixelRatio.get();
  const [zoom, setZoom] = useState(1);
  const mapWidth = Math.round(width * pixelRatio);
  const mapHeight = Math.round(mapWidth * 0.66);

  const mapUrl = `https://maps.geoapify.com/v1/staticmap?style=dark-matter-dark-grey&width=${mapWidth}&height=${mapHeight}&attribution=none&scaleFactor=2&center=lonlat:${LONGITUDE},${LATITUDE}&zoom=${zoom}&marker=lonlat:${LONGITUDE},${LATITUDE};type:circle;icon:satellite;icontype:awesome;contentcolor:%23ffffff;contentcolor:%2300d9ff;size:large&apiKey=${GEOAPIFY_API_KEY}`;

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
