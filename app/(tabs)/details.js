import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";
import AsyncStorage from "@react-native-async-storage/async-storage";

const ProgressBar = ({ value }) => {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View style={styles.progressBg}>
      <View style={[styles.progressFill, { width: `${pct}%` }]} />
    </View>
  );
};

export default function DetailsScreen() {
  const { eventId } = useLocalSearchParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [registering, setRegistering] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const res = await fetch(
          `https://naturelink-production.up.railway.app/api/events/${eventId}`
        );
        const json = await res.json();
        if (json.success && json.data.event) {
          setEvent(json.data.event);
        }
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    if (eventId) fetchEvent();
  }, [eventId]);

  const handleRegister = async () => {
    try {
      setRegistering(true);
      const token = await AsyncStorage.getItem("authToken"); // adjust key if different
      if (!token) {
        Alert.alert("Error", "User not logged in");
        return;
      }

      const res = await fetch(
        `https://naturelink-production.up.railway.app/api/events/${eventId}/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            specialRequirements: "Vegetarian meal required",
            emergencyContact: {
              name: "Jane Doe",
              phone: "+1987654321",
              relationship: "Spouse",
            },
            paymentMethod: "credit_card",
          }),
        }
      );

      const json = await res.json();
      if (json.success) {
        Alert.alert("Success", json.message || "Registered successfully!");
        // update participants locally
        setEvent((prev) =>
          prev
            ? {
                ...prev,
                currentParticipants: prev.currentParticipants + 1,
              }
            : prev
        );
      } else {
        Alert.alert("Failed", json.message || "Could not register");
      }
    } catch (err) {
      console.error(err);
      Alert.alert("Error", "Something went wrong");
    } finally {
      setRegistering(false);
    }
  };

  if (loading)
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#166534" />
      </View>
    );

  if (!event)
    return (
      <View style={styles.center}>
        <Text>No event data found</Text>
      </View>
    );

  const pct = event.maxParticipants
    ? Math.round((event.currentParticipants / event.maxParticipants) * 100)
    : 0;

  const coordinates = event.coordinates || { latitude: 0, longitude: 0 };

  const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          #map { height: 220px; width: 100%; border-radius: 12px; }
          html, body { margin: 0; padding: 0; }
          .leaflet-popup-content-wrapper { border-radius: 10px; padding: 4px 8px; font-size: 12px; }
          .leaflet-control-attribution { display: none; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${coordinates.latitude}, ${coordinates.longitude}], 14);
          L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);
          L.marker([${coordinates.latitude}, ${coordinates.longitude}])
            .addTo(map)
            .bindPopup("<b>${event.title}</b>").openPopup();
        </script>
      </body>
    </html>
  `;

  return (
    <ScrollView className="flex-1 bg-green-50">
      <View className="relative">
        <Image
          source={{ uri: event.images?.[0]?.url }}
          className="w-full h-64"
        />
        <TouchableOpacity
          className="absolute top-12 left-4 bg-white/80 p-2 rounded-full"
          onPress={() => router.back()}
        >
          <Ionicons name="arrow-back" size={20} color="#166534" />
        </TouchableOpacity>
        <View className="absolute bottom-4 left-4 bg-green-600/90 px-3 py-1 rounded-full">
          <Text className="text-white text-xs font-semibold">
            {event.category}
          </Text>
        </View>
      </View>

      <View className="px-5 py-6">
        <Text className="text-2xl font-extrabold text-green-900">
          {event.title}
        </Text>
        <Text className="text-green-700 mt-2">📍 {event.location}</Text>
        <Text className="text-green-700 mt-1">
          📅 {new Date(event.date).toDateString()}
        </Text>

        <Text className="mt-4 text-green-800 leading-6">
          {event.description}
        </Text>

        {event.organizer && (
          <View className="mt-5">
            <Text className="text-green-900 font-bold text-lg mb-2">
              Organizer
            </Text>
            <Text className="text-green-700">👤 {event.organizer.name}</Text>
            {event.organizer.email && (
              <Text className="text-green-700">📧 {event.organizer.email}</Text>
            )}
            {event.organizer.contact && (
              <Text className="text-green-700">📞 {event.organizer.contact}</Text>
            )}
          </View>
        )}

        {event.highlights?.length > 0 && (
          <View className="mt-5">
            <Text className="text-green-900 font-bold text-lg mb-2">
              Highlights
            </Text>
            {event.highlights.map((h, i) => (
              <Text key={i} className="text-green-700">
                • {h}
              </Text>
            ))}
          </View>
        )}

        {event.requirements?.length > 0 && (
          <View className="mt-5">
            <Text className="text-green-900 font-bold text-lg mb-2">
              Requirements
            </Text>
            {event.requirements.map((r, i) => (
              <Text key={i} className="text-green-700">
                • {r}
              </Text>
            ))}
          </View>
        )}

        <View className="mt-6">
          <ProgressBar
            value={
              event.maxParticipants
                ? event.currentParticipants / event.maxParticipants
                : 0
            }
          />
          <View className="flex-row justify-between mt-1">
            <Text className="text-green-700 text-xs">
              Registered: {event.currentParticipants}/{event.maxParticipants}
            </Text>
            <Text className="text-green-700 text-xs font-semibold">{pct}%</Text>
          </View>
        </View>

        <View className="mt-6 flex-row">
          <TouchableOpacity
            className="flex-1 bg-green-600 py-3 rounded-full mr-2"
            disabled={registering}
            onPress={handleRegister}
          >
            {registering ? (
              <ActivityIndicator color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold">
                Register Now
              </Text>
            )}
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
            <Ionicons name="heart-outline" size={22} color="#166534" />
          </TouchableOpacity>
        </View>

        {coordinates && (
          <WebView source={{ html }} style={styles.miniMap} scrollEnabled={false} />
        )}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  progressBg: {
    width: "100%",
    height: 8,
    backgroundColor: "#bbf7d0",
    borderRadius: 8,
    overflow: "hidden",
  },
  progressFill: {
    height: "100%",
    backgroundColor: "#166534",
  },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  miniMap: { height: 220, borderRadius: 12, marginTop: 20 },
});
