import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity } from "react-native";
import { useLocalSearchParams, router } from "expo-router";
import { Ionicons } from "@expo/vector-icons";
import { WebView } from "react-native-webview";

// For now, reuse mock EVENTS (later you can fetch by id)
const EVENTS = {
    "1": {
        title: "Tree Plantation Drive",
        date: "2025-09-10",
        location: "Guindy National Park",
        category: "Plantation",
        image:
            "https://ecobravo.co.uk/cdn/shop/articles/10_Surprising_Eco-Friendly_Activities_2100x.jpg?v=1596013082",
        progress: 0.7,
        spots: { registered: 70, total: 100 },
        tags: ["Saplings", "Volunteers", "Morning"],
        description:
            "Join us in restoring green cover 🌳! Plant saplings, nurture the soil, and create a healthier environment together.",
    },
    "2": {
        title: "Beach Cleanup",
        date: "2025-09-15",
        location: "Marina Beach",
        category: "Cleanup",
        image:
            "https://runwildmychild.com/wp-content/uploads/2023/04/LeaReynoldsPhotography2023-3.jpg",
        progress: 0.4,
        spots: { registered: 40, total: 100 },
        tags: ["Plastics", "Recycling", "Coast"],
        description:
            "Help us keep the shorelines clean 🏖️. Collect plastics, sort recyclables, and protect marine life.",
    },
    "3": {
        title: "Eco Awareness Marathon",
        date: "2025-09-20",
        location: "CIT Campus",
        category: "Awareness",
        image:
            "https://runwildmychild.com/wp-content/uploads/2023/04/earth-day1-1.jpg",
        progress: 0.55,
        spots: { registered: 55, total: 100 },
        tags: ["Run", "Community", "Health"],
        description:
            "Run for nature 🏃‍♂️! Spread awareness on sustainability while boosting your health.",
    },
    "4": {
        title: "Urban Garden Workshop",
        date: "2025-10-02",
        location: "Adyar Eco Park",
        category: "Workshop",
        image:
            "https://runwildmychild.com/wp-content/uploads/2023/04/LeaReynoldsPhotography2023-4.jpg",
        progress: 0.25,
        spots: { registered: 25, total: 100 },
        tags: ["DIY", "Compost", "Home"],
        description:
            "Discover how to create your own urban garden 🌱. Composting, planting, and sustainable living techniques.",
    },
};

const ProgressBar = ({ value }) => {
    const pct = Math.max(0, Math.min(1, value)) * 100;
    return (
        <View style={styles.progressBg}>
            <View style={[styles.progressFill, { width: `${pct}%` }]} />
        </View>
    );
};

export default function DetailsScreen() {
    const { id, title, lat, lng } = useLocalSearchParams();
    
    const event = EVENTS[id];

    if (!event) {
        return (
            <View style={styles.center}>
                <Text>No event found</Text>
            </View>
        );
    }

    const pct = Math.round(event.progress * 100);
    const html = `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet/dist/leaflet.css"/>
        <script src="https://unpkg.com/leaflet/dist/leaflet.js"></script>
        <style>
          #map { height: 200px; width: 100%; border-radius: 12px; }
          html, body { margin: 0; padding: 0; }
          .leaflet-popup-content-wrapper { 
            border-radius: 10px; 
            padding: 4px 8px; 
            font-size: 12px;
          }
          .leaflet-control-attribution { display: none; }
        </style>
      </head>
      <body>
        <div id="map"></div>
        <script>
          var map = L.map('map').setView([${lat}, ${lng}], 14);
          L.tileLayer('https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png').addTo(map);

          var placeMarker = L.marker([${lat}, ${lng}]).addTo(map)
            .bindPopup("<b>${title}</b>").openPopup();
        </script>
      </body>
    </html>
  `;
    return (
        <ScrollView className="flex-1 bg-green-50">
            {/* Header image */}
            <View className="relative">
                <Image source={{ uri: event.image }} className="w-full h-64" />
                {/* Back button */}
                <TouchableOpacity
                    className="absolute top-12 left-4 bg-white/80 p-2 rounded-full"
                    onPress={() => router.back()}
                >
                    <Ionicons name="arrow-back" size={20} color="#166534" />
                </TouchableOpacity>
                {/* Overlay category */}
                <View className="absolute bottom-4 left-4 bg-green-600/90 px-3 py-1 rounded-full">
                    <Text className="text-white text-xs font-semibold">
                        {event.category}
                    </Text>
                </View>
            </View>

            {/* Content */}
            <View className="px-5 py-6">
                <Text className="text-2xl font-extrabold text-green-900">
                    {event.title}
                </Text>
                <Text className="text-green-700 mt-2">📍 {event.location}</Text>
                <Text className="text-green-700 mt-1">📅 {event.date}</Text>

                {/* Tags */}
                <View className="flex-row flex-wrap mt-3">
                    {event.tags.map((t) => (
                        <View
                            key={t}
                            className="px-3 py-1 mr-2 mb-2 rounded-full bg-green-100"
                        >
                            <Text className="text-green-700 text-xs">{t}</Text>
                        </View>
                    ))}
                </View>

                {/* Description */}
                <Text className="mt-4 text-green-800 leading-6">
                    {event.description}
                </Text>

                {/* Progress */}
                <View className="mt-5">
                    <ProgressBar value={event.progress} />
                    <View className="flex-row justify-between mt-1">
                        <Text className="text-green-700 text-xs">
                            Registered: {event.spots.registered}/{event.spots.total}
                        </Text>
                        <Text className="text-green-700 text-xs font-semibold">
                            {pct}%
                        </Text>
                    </View>
                </View>

                {/* Buttons */}
                <View className="mt-6 flex-row">
                    <TouchableOpacity className="flex-1 bg-green-600 py-3 rounded-full mr-2">
                        <Text className="text-white text-center font-semibold">
                            Register Now
                        </Text>
                    </TouchableOpacity>
                    <TouchableOpacity className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
                        <Ionicons
                            name="heart-outline"
                            size={22}
                            color="#166534"
                        />
                    </TouchableOpacity>
                </View>
                <WebView
                    source={{ html }}
                    style={styles.miniMap}
                    scrollEnabled={false}
                />
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
    miniMap: { height: 200, borderRadius: 12, marginTop: 20 },

});
