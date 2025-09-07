import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";
import AsyncStorage from "@react-native-async-storage/async-storage";

const EventStatusCard = ({ event }) => (
  <View className="bg-white rounded-2xl mx-4 mb-6 shadow-lg overflow-hidden">
    {/* Event Image */}
    <Image
      source={{ uri: event?.images?.[0]?.url }}
      className="w-full h-40"
      resizeMode="cover"
    />

    {/* Card Content */}
    <View className="p-4">
      <Text className="text-lg font-bold text-green-800">{event.title}</Text>
      <Text className="text-green-700 mt-1">
        📅 {new Date(event.date).toDateString()}
      </Text>
      <Text className="text-green-700">📍 {event.location}</Text>

      {/* Progress Bar */}
      <View className="mt-3">
        <Progress.Bar
          progress={event.progress ?? 0}
          width={null}
          height={12}
          color="#16a34a"
          unfilledColor="#bbf7d0"
          borderWidth={0}
          borderRadius={20}
        />
        <View className="flex-row justify-between mt-1">
          <Text className="text-green-700 text-sm">
            {Math.round((event.progress ?? 0) * 100)}%
          </Text>
          <Text
            className={`text-sm font-semibold ${
              event.status === "completed"
                ? "text-green-700"
                : event.status === "ongoing"
                ? "text-yellow-600"
                : "text-gray-500"
            }`}
          >
            {event.status}
          </Text>
        </View>
      </View>

      {/* Action Button */}
      {/* <TouchableOpacity className="bg-green-600 mt-4 py-2 rounded-full">
        <Text className="text-white text-center font-semibold">
          View Details
        </Text>
      </TouchableOpacity> */}
    </View>
  </View>
);

export default function RegisteredEventsTab() {
  const [registrations, setRegistrations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRegistrations = async () => {
    try {
      const token = await AsyncStorage.getItem("authToken"); // adjust if you store with another key
      if (!token) {
        console.warn("No token found in AsyncStorage");
        return;
      }

      const res = await fetch(
        "https://naturelink-production.up.railway.app/api/events/user/registrations?page=1&limit=10",
        {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

      const json = await res.json();
      if (json.success) {
        setRegistrations(json.data.registrations);
      } else {
        console.error("Failed to fetch:", json);
      }
    } catch (error) {
      console.error("Error fetching registrations:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRegistrations();
  }, []);

  return (
    <View className="flex-1 ">
      {/* Header */}
      <View className="bg-green-600 rounded-b-2xl shadow-md">
        <View className="flex-row items-center justify-between px-5 pt-12 pb-4">
          <Ionicons name="arrow-back" size={24} color="white" />
          <Text className="text-white text-lg font-bold">
            My Registered Events
          </Text>
          <Ionicons name="leaf" size={26} color="white" />
        </View>
      </View>

      {/* Events List */}
      {loading ? (
        <ActivityIndicator
          size="large"
          color="#16a34a"
          style={{ marginTop: 20 }}
        />
      ) : (
        <FlatList
          data={registrations}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => <EventStatusCard event={item.event} />}
          contentContainerStyle={{ paddingVertical: 16 }}
          showsVerticalScrollIndicator={false}
          ListEmptyComponent={
            <Text className="text-center text-gray-500 mt-10">
              No registered events yet.
            </Text>
          }
        />
      )}
    </View>
  );
}
