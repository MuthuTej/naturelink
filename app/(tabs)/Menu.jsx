import React, { useMemo, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  Image,
  Pressable,
  Modal
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";
import * as Location from "expo-location";

const EVENTS = [
  {
    id: "1",
    title: "Tree Plantation Drive",
    date: "2025-09-10",
    location: "Guindy National Park",
    category: "Plantation",
    image:
      "https://ecobravo.co.uk/cdn/shop/articles/10_Surprising_Eco-Friendly_Activities_2100x.jpg?v=1596013082",
    progress: 0.7,
    spots: { registered: 70, total: 100 },
    tags: ["Saplings", "Volunteers", "Morning"], lat: 13.0108, lng: 80.212,
  },
  {
    id: "2",
    title: "Beach Cleanup",
    date: "2025-09-15",
    location: "Marina Beach",
    category: "Cleanup",
    image:
      "https://runwildmychild.com/wp-content/uploads/2023/04/LeaReynoldsPhotography2023-3.jpg",
    progress: 0.4,
    spots: { registered: 40, total: 100 },
    tags: ["Plastics", "Recycling", "Coast"], lat: 13.049952, lng: 80.28244,
  },
  {
    id: "3",
    title: "Eco Awareness Marathon",
    date: "2025-09-20",
    location: "CIT Campus",
    category: "Awareness",
    image:
      "https://runwildmychild.com/wp-content/uploads/2023/04/earth-day1-1.jpg",
    progress: 0.55,
    spots: { registered: 55, total: 100 },
    tags: ["Run", "Community", "Health"], lat: 12.9568, lng: 80.0837
  },
  {
    id: "4",
    title: "Urban Garden Workshop",
    date: "2025-10-02",
    location: "Adyar Eco Park",
    category: "Workshop",
    image:
      "https://runwildmychild.com/wp-content/uploads/2023/04/LeaReynoldsPhotography2023-4.jpg",
    progress: 0.25,
    spots: { registered: 25, total: 100 },
    tags: ["DIY", "Compost", "Home"], lat: 13.0067, lng: 80.257,
  },
];

const CATEGORIES = ["All", "Plantation", "Cleanup", "Awareness", "Workshop"];

/* ---------- Small UI bits ---------- */
const Chip = ({ label, active, onPress }) => (
  <TouchableOpacity
    onPress={onPress}
    className={`px-4 py-2 mr-2 mb-2 rounded-full ${active ? "bg-green-600" : "bg-green-100"
      }`}
  >
    <Text className={`${active ? "text-white" : "text-green-700"} font-medium`}>
      {label}
    </Text>
  </TouchableOpacity>
);

const Tag = ({ label }) => (
  <View className="px-3 py-1 mr-2 mb-2 rounded-full bg-green-100">
    <Text className="text-green-700 text-xs">{label}</Text>
  </View>
);

const ProgressBar = ({ value }) => {
  const pct = Math.max(0, Math.min(1, value)) * 100;
  return (
    <View className="w-full h-3 bg-green-100 rounded-full overflow-hidden">
      <View
        className="h-full bg-green-600"
        style={{ width: `${pct}%` }}
      />
    </View>
  );
};

/* ---------- Event Card ---------- */
const EventCard = ({ item, onRegister }) => {
  const { title, date, location, category, image, tags, progress, spots } =
    item;
  const pct = Math.round(progress * 100);

  return (
    <View className="bg-white rounded-2xl mx-4 mb-5 shadow-md overflow-hidden">
      {/* Image header */}
      <View className="relative">
        {/* Image */}
        <Image
          source={{ uri: image }}
          resizeMode="cover"
          className="w-full h-48 rounded-xl"
        />

        {/* Gradient overlay (bottom fade effect) */}
        <LinearGradient
          colors={["transparent", "rgba(0,0,0,0.4)"]}
          className="absolute bottom-0 left-0 right-0 h-20 rounded-b-xl"
        />

        {/* Top overlay badges */}
        <View className="absolute left-3 top-3 flex-row">
          <View className="bg-white/95 px-3 py-1 rounded-full mr-2 shadow">
            <Text className="text-green-800 text-xs font-semibold">
              {category}
            </Text>
          </View>
          <View className="bg-green-600/95 px-3 py-1 rounded-full shadow">
            <Text className="text-white text-xs font-semibold">
              {pct}% progress
            </Text>
          </View>
        </View>
      </View>

      {/* Content */}
      <View className="p-4">
        <View className="flex-row items-start justify-between">
          <View className="flex-1 pr-3">
            <Text className="text-lg font-extrabold text-green-900">
              {title}
            </Text>
            <Text className="text-green-700 mt-1">📍 {location}</Text>
          </View>

          {/* Quick actions */}
          <View className="flex-row">
            <TouchableOpacity className="p-2 rounded-full bg-green-50 mr-2">
              <Ionicons name="heart-outline" size={18} color="#166534" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2 rounded-full bg-green-50">
              <Ionicons name="share-social-outline" size={18} color="#166534" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Tags */}
        <View className="flex-row flex-wrap mt-3">
          {tags.map((t) => (
            <Tag key={t} label={t} />
          ))}
        </View>

        {/* Progress */}
        <View className="mt-3">
          <ProgressBar value={progress} />
          <View className="flex-row justify-between mt-1">
            <Text className="text-green-700 text-xs">
              Registered: {spots.registered}/{spots.total}
            </Text>
            <Text className="text-green-700 text-xs font-semibold">{pct}%</Text>
          </View>
        </View>

        {/* CTA row */}
        <View className="mt-4 flex-row">
          <TouchableOpacity
            className="flex-1 bg-green-600 py-3 rounded-full mr-2"
            onPress={onRegister}
          >
            <Text className="text-white text-center font-semibold">
              Register
            </Text>
          </TouchableOpacity>
          <TouchableOpacity className="w-12 h-12 rounded-full bg-green-100 items-center justify-center">
            <Ionicons name="information-circle-outline" size={22} color="#166534" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

/* ---------- Screen ---------- */
export default function Menu() {
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState("");
  const [cat, setCat] = useState("All");
  const [modalVisible, setModalVisible] = useState(false);

  const router = useRouter();

  const filtered = useMemo(() => {
    return EVENTS.filter((e) => {
      const inCat = cat === "All" || e.category === cat;
      const inSearch =
        e.title.toLowerCase().includes(query.toLowerCase()) ||
        e.location.toLowerCase().includes(query.toLowerCase());
      return inCat && inSearch;
    });
  }, [cat, query]);
  const getLocation = async () => {
    try {
      setLoading(true);

      // Ask for permission
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setLocation("Permission denied");
        setLoading(false);
        return;
      }

      // Get coordinates
      let { coords } = await Location.getCurrentPositionAsync({});
      setLocation(`${coords.latitude.toFixed(6)}, ${coords.longitude.toFixed(6)}`);
    } catch (error) {
      console.log(error);
      setLocation("Error fetching location");
    } finally {
      setLoading(false);
    }
  };

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
        <TouchableOpacity className="ml-2 bg-green-200 px-3 py-1 rounded-full">
          <Text className="text-green-800 text-xs font-semibold">Filters</Text>
        </TouchableOpacity>
      </View>

      {/* Category chips */}
      <View className="px-4 pt-2 pb-1 flex-row flex-wrap">
        {CATEGORIES.map((c) => (
          <Chip key={c} label={c} active={c === cat} onPress={() => setCat(c)} />
        ))}
      </View>

      {/* List */}
      <FlatList
        data={filtered}
        keyExtractor={(item) => item.id}
        contentContainerStyle={{ paddingTop: 12, paddingBottom: 90 }}
        renderItem={({ item }) => (
          <Pressable
            onPress={() =>
              router.push({
                pathname: "/(tabs)/details",
                params: {
                  id: item.id, title: item.title, lat: item.lat,
                  lng: item.lng
                },
              })
            }
          >
            <EventCard
              item={item}
              onRegister={() => {
                console.log("Register tapped:", item.title);
              }}
            />
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

      {/* Floating Map button (left for you to integrate) */}
      <TouchableOpacity
        className="absolute bottom-6 right-6 bg-green-600 rounded-full w-16 h-16 items-center justify-center shadow-lg"
        onPress={() => setModalVisible(true)}
        activeOpacity={0.8}
      >
        <Ionicons name="add" size={30} color="#fff" />
      </TouchableOpacity>
      <Modal
        visible={modalVisible}
        animationType="slide"
        transparent
        onRequestClose={() => setModalVisible(false)}
      >
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-green-50 rounded-t-3xl p-6 shadow-lg">
            <Text className="text-xl font-bold text-green-800 mb-4">
              🌿 Add New Event
            </Text>

            {/* Event Title */}
            <TextInput
              placeholder="Event title"
              className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
              placeholderTextColor="#888"
            />

            {/* Event Date */}
            <TextInput
              placeholder="Date (e.g. 29 Aug 2025)"
              className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
              placeholderTextColor="#888"
            />

            {/* Event Location */}
            <View className="flex-row items-center bg-white rounded-xl border border-green-200 px-4 py-3 mb-4">
              <TextInput
                value={location}
                placeholder="Fetching location..."
                className="flex-1 text-gray-700"
                placeholderTextColor="#888"
                editable={false}
              />
              <Pressable
                className="ml-2 px-3 py-1 bg-green-600 rounded-lg"
                onPress={getLocation}
              >
                <Text className="text-white font-semibold">
                  {loading ? "..." : "Use GPS"}
                </Text>
              </Pressable>
            </View>

            {/* Buttons */}
            <View className="flex-row justify-between">
              <Pressable
                className="bg-gray-200 px-5 py-3 rounded-xl"
                onPress={() => setModalVisible(false)}
              >
                <Text className="text-gray-700 font-semibold">Cancel</Text>
              </Pressable>

              <Pressable
                className="bg-green-600 px-5 py-3 rounded-xl shadow-md"
                onPress={() => {
                  // handle add event logic
                  console.log("Event added!");
                  setModalVisible(false);
                }}
              >
                <Text className="text-white font-semibold">Add Event</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>

  );
}
