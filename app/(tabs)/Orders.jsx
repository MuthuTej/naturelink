import React, { useEffect, useState } from "react";
import { View, StyleSheet, ActivityIndicator, Text } from "react-native";
import { WebView } from "react-native-webview";
import * as Location from "expo-location";
import { useRouter } from "expo-router";

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission denied for location");
        return;
      }
      try {
        let { coords } = await Location.getCurrentPositionAsync({});
        setLocation(coords);
      } catch (error) {
        setErrorMsg("Unable to fetch location");
      }
    })();
  }, []);

  // Pins
  const locations = [
    { id: "2", lat: 13.0108, lng: 80.212, title: "Guindy" },
    { id: "1", lat: 13.049952, lng: 80.28244, title: "Marina Beach" },
    { id: "4", lat: 12.9568, lng: 80.0837, title: "Kundrathur" },
    { id: "3", lat: 13.0067, lng: 80.257, title: "Adyar" },
  ];

  if (errorMsg) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>{errorMsg}</Text>
      </View>
    );
  }

  if (!location) {
    return (
      <View style={styles.loader}>
        <ActivityIndicator size="large" color="#6C63FF" />
        <Text style={styles.loaderText}>Getting your location...</Text>
      </View>
    );
  }

  // Markers + Paths
  const markersAndPaths = locations
    .map(
      (loc) => `
      var marker = L.marker([${loc.lat}, ${loc.lng}]).addTo(map)
        .bindPopup("<b>${loc.title}</b>");
marker.on('click', function() {
  window.ReactNativeWebView.postMessage(JSON.stringify({ 
    id: "${loc.id}", 
    title: "${loc.title}",
    lat: ${loc.lat},
    lng: ${loc.lng}
  }));
});

      L.polyline([[${location.latitude}, ${location.longitude}], [${loc.lat}, ${loc.lng}]], 
        { color: '#6C63FF', weight: 3, opacity: 0.7 }).addTo(map);
    `
    )
    .join("\n");


  // Leaflet HTML
  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          #map { height: 100%; width: 100%; }
          html, body { height: 100%; margin: 0; padding: 0; }
          .leaflet-popup-content-wrapper { 
            border-radius: 12px; 
            padding: 6px 10px; 
            font-size: 14px;
            font-weight: 500;
          }
          .leaflet-control-attribution { display: none; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${location.latitude}, ${location.longitude}], 12);
          L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png', {
            attribution: '© OpenStreetMap contributors'
          }).addTo(map);

          var homeIcon = L.icon({
            iconUrl: 'https://cdn-icons-png.flaticon.com/512/25/25694.png',
            iconSize: [42, 42],
            iconAnchor: [21, 42]
          });

          L.marker([${location.latitude}, ${location.longitude}], {icon: homeIcon})
            .addTo(map).bindPopup("🏠 Home");

          ${markersAndPaths}
        </script>
      </body>
    </html>
  `;

  return (
    <View style={styles.container}>
      <WebView
        originWhitelist={["*"]}
        source={{ html }}
        style={{ flex: 1 }}
        onMessage={(event) => {
          const data = JSON.parse(event.nativeEvent.data);
          router.push({
            pathname: "/(tabs)/details",
            params: { 
              id: data.id, 
              title: data.title, 
              lat: data.lat, 
              lng: data.lng 
            },
          });
        }}
        
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  loader: { flex: 1, justifyContent: "center", alignItems: "center" },
  loaderText: { marginTop: 12, fontSize: 16, color: "#333" },
  errorText: { fontSize: 16, color: "red" },
});
