import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Pressable,
  ActivityIndicator,
  Image,
  ScrollView,
  Dimensions,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import AsyncStorage from "@react-native-async-storage/async-storage";

/* ---------- Small UI bits ---------- */
const Chip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 mr-2 mb-2 rounded-full ${
      active ? "bg-green-600" : "bg-green-100"
    }`}
  >
    <Text className={`${active ? "text-white" : "text-green-700"} font-medium`}>
      {label}
    </Text>
  </TouchableOpacity>
);
const screenWidth = Dimensions.get("window").width;


const EventCard = ({ title, date, location, category, images, status }) => (
  
<View
  style={{
    backgroundColor: "white",
    borderRadius: 20,
    marginHorizontal: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 8,
    overflow: "hidden",
    borderWidth: 1,
    borderColor: "#d1fae5",
    height: 200, // Card height
  }}
>
  {/* Image carousel */}
  <ScrollView horizontal pagingEnabled showsHorizontalScrollIndicator={false}>
    {images.map((img, idx) => (
      <Image
        key={idx}
        source={{ uri: img.url }}
        style={{ width: screenWidth - 32, height: 200 }}
        resizeMode="cover"
      />
    ))}
  </ScrollView>

  {/* Gradient overlay */}
  <LinearGradient
    colors={["transparent", "rgba(0,0,0,0.25)"]}
    style={{
      position: "absolute",
      bottom: 0,
      left: 0,
      right: 0,
      height: 50,
    }}
  />

  {/* Content */}
  <View
    style={{
      position: "absolute",
      bottom: 8,
      left: 12,
      right: 12,
    }}
  >
    <Text style={{ color: "#064e3b", fontWeight: "700", fontSize: 18 }}>
      {title}
    </Text>
    <Text style={{ color: "#16a34a", fontSize: 12 }}>
      {new Date(date).toDateString()}
    </Text>

    <View style={{ flexDirection: "row", marginTop: 4 }}>
      <Text
        style={{
          backgroundColor: "#d1fae5",
          color: "#047857",
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 9999,
          fontSize: 10,
          fontWeight: "600",
          marginRight: 4,
        }}
      >
        {category}
      </Text>
      <Text
        style={{
          backgroundColor: status === "upcoming" ? "#bfdbfe" : "#e5e7eb",
          color: status === "upcoming" ? "#1d4ed8" : "#374151",
          paddingHorizontal: 8,
          paddingVertical: 2,
          borderRadius: 9999,
          fontSize: 10,
          fontWeight: "600",
        }}
      >
        {status}
      </Text>
    </View>

    <View style={{ flexDirection: "row", marginTop: 4, alignItems: "center" }}>
      <Ionicons name="location-outline" size={16} color="#166534" />
      <Text style={{ color: "#166534", marginLeft: 6 }}>{location}</Text>
    </View>
  </View>
</View>


);

/* ---------- Screen ---------- */
export default function Menu() {
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [token, setToken] = useState(null);
  const [events, setEvents] = useState([]);
  const [page, setPage] = useState(1);

  const router = useRouter();
  const CATEGORIES = ["All", "Wildlife Safari", "Nature Trek", "Bird Watching"];

  useEffect(() => {
    const loadToken = async () => {
      const savedToken = await AsyncStorage.getItem("authToken");
      setToken(savedToken);
    };
    loadToken();
  }, []);

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        setLoading(true);

        const params = new URLSearchParams({
          page: page.toString(),
          limit: "12",
          search: query,
          status: "upcoming",
          sortBy: "date",
          sortOrder: "asc",
        });

        if (cat !== "All") params.append("category", cat);

        const res = await fetch(
          `https://naturelink-production.up.railway.app/api/events?${params.toString()}`
        );

        const json = await res.json();
        if (json.success) {
          // Only map the minimal data for the list page
          console.log(json.data.events);
          
          const mapped = json.data.events.map((e) => ({
            id: e._id,
            title: e.title,
            date: e.date,
            location: e.location,
            category: e.category,
            images: e.images?.length
              ? e.images
              : [{ url: "https://placehold.co/600x400?text=No+Image" }],
            status: e.status,
          }));

          setEvents(mapped);
        }
      } catch (error) {
        console.log("Error fetching events:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [page, query, cat]);

  return (
    <View className="flex-1 bg-green-50">
      {/* Header */}
      <View className="flex-row items-center justify-between px-4 pt-12 pb-4 bg-green-600">
        <View className="flex-row items-center">
          <Ionicons name="leaf-outline" size={22} color="#fff" />
          <Text className="text-white text-xl font-bold ml-2">NatureLink</Text>
        </View>
        <TouchableOpacity className="flex-row items-center">
          <Ionicons name="notifications-outline" size={22} color="#fff" />
        </TouchableOpacity>
      </View>

      {/* Search */}
      <View className="mx-4 mt-4 mb-2 bg-green-100 rounded-2xl px-4 py-3 flex-row items-center">
        <Ionicons name="search-outline" size={18} color="#166534" />
        <TextInput
          className="ml-2 flex-1 text-green-900"
          placeholder="Search events, places…"
          placeholderTextColor="#166534"
          value={query}
          onChangeText={setQuery}
        />
      </View>

      {/* Category chips */}
      <View className="px-4 pt-2 pb-1 flex-row flex-wrap">
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} active={c === cat} onPress={() => setCat(c)} />
        ))}
      </View>

      {/* Event list */}
      {loading ? (
        <View className="flex-1 items-center justify-center">
          <ActivityIndicator size="large" color="#166534" />
        </View>
      ) : (
        <FlatList
          data={events}
          keyExtractor={(item) => item.id}
          contentContainerStyle={{ paddingTop: 12, paddingBottom: 90 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() =>
                router.push({
                  pathname: "/(tabs)/details",
                  params: { eventId: item.id },
                })
              }
            >
              <EventCard {...item} />
            </Pressable>
          )}
          ListEmptyComponent={
            <View className="mx-4 mt-10 bg-white rounded-2xl p-6 items-center">
              <Ionicons name="cloud-outline" size={26} color="#166534" />
              <Text className="text-green-800 font-semibold mt-2">
                No events found
              </Text>
              <Text className="text-green-700 text-xs mt-1">
                Try a different search or category.
              </Text>
            </View>
          }
        />
      )}
    </View>
  );
}
