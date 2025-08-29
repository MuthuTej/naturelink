import React from "react";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import * as Progress from "react-native-progress";

const registeredEvents = [
  {
    id: "1",
    title: "🌳 Tree Plantation Drive",
    date: "2025-09-10",
    location: "Central Park",
    progress: 1, // 100%
    status: "Completed",
    image:       "https://ecobravo.co.uk/cdn/shop/articles/10_Surprising_Eco-Friendly_Activities_2100x.jpg?v=1596013082",
  },
  {
    id: "2",
    title: "🏖️ Beach Cleanup",
    date: "2025-09-15",
    location: "Ocean Beach",
    progress: 0.6, // 60%
    status: "Ongoing",
    image:      "https://runwildmychild.com/wp-content/uploads/2023/04/LeaReynoldsPhotography2023-3.jpg",

  },
  {
    id: "3",
    title: "🏃 Eco Awareness Marathon",
    date: "2025-09-20",
    location: "City Square",
    progress: 0.3, // 30%
    status: "Upcoming",
    image:       "https://runwildmychild.com/wp-content/uploads/2023/04/earth-day1-1.jpg",

  },
];

const EventStatusCard = ({ event }) => (
  <View className="bg-white rounded-2xl mx-4 mb-6 shadow-lg overflow-hidden">
    {/* Event Image */}
    <Image
      source={{ uri: event.image }}
      className="w-full h-40"
      resizeMode="cover"
    />

    {/* Card Content */}
    <View className="p-4">
      <Text className="text-lg font-bold text-green-800">{event.title}</Text>
      <Text className="text-green-700 mt-1">📅 {event.date}</Text>
      <Text className="text-green-700">📍 {event.location}</Text>

      {/* Progress Bar */}
      <View className="mt-3">
        <Progress.Bar
          progress={event.progress}
          width={null}
          height={12}
          color="#16a34a"
          unfilledColor="#bbf7d0"
          borderWidth={0}
          borderRadius={20}
        />
        <View className="flex-row justify-between mt-1">
          <Text className="text-green-700 text-sm">
            {Math.round(event.progress * 100)}%
          </Text>
          <Text
            className={`text-sm font-semibold ${
              event.status === "Completed"
                ? "text-green-700"
                : event.status === "Ongoing"
                ? "text-yellow-600"
                : "text-gray-500"
            }`}
          >
            {event.status}
          </Text>
        </View>
      </View>

      {/* Action Button */}
      <TouchableOpacity className="bg-green-600 mt-4 py-2 rounded-full">
        <Text className="text-white text-center font-semibold">
          View Details
        </Text>
      </TouchableOpacity>
    </View>
  </View>
);

export default function RegisteredEventsTab() {
  return (
    <View className="flex-1 ">
      {/* Header */}
      <View className="bg-green-600 rounded-b-2xl shadow-md">
      {/* Safe Area Padding */}
      <View className="flex-row items-center justify-between px-5 pt-12 pb-4">
        {/* Left Icon (Optional back button) */}
        <Ionicons name="arrow-back" size={24} color="white" />

        {/* Title */}
        <Text className="text-white text-lg font-bold">
          My Registered Events
        </Text>

        {/* Right Icon */}
        <Ionicons name="leaf" size={26} color="white" />
      </View>
    </View>

      {/* Events List */}
      <FlatList
        data={registeredEvents}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <EventStatusCard event={item} />}
        contentContainerStyle={{ paddingVertical: 16 }}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}
