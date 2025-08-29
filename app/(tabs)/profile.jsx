import React from "react";
import { View, Text, Image, TouchableOpacity, ScrollView } from "react-native";
import { Ionicons } from "@expo/vector-icons";

export default function ProfilePage() {
  return (
    <ScrollView className="flex-1 bg-green-50">
      {/* Header */}
      <View className="bg-green-600 pt-14 pb-6 px-6 rounded-b-3xl shadow-lg">
        <View className="items-center">
          <Image
            source={{
              uri: "https://randomuser.me/api/portraits/women/68.jpg",
            }}
            className="w-28 h-28 rounded-full border-4 border-green-200"
          />
          <Text className="text-white text-2xl font-bold mt-3">
            Meenakshi Muthuraj
          </Text>
          <Text className="text-green-100 text-sm">
            🌱 Eco Enthusiast | Volunteer | Nature Lover
          </Text>
        </View>
      </View>

      {/* Stats Section */}
      <View className="flex-row justify-around mt-6 px-6">
        <View className="items-center bg-white px-4 py-3 rounded-2xl shadow-md">
          <Text className="text-lg font-bold text-green-700">12</Text>
          <Text className="text-green-600 text-sm">Registered</Text>
        </View>
        <View className="items-center bg-white px-4 py-3 rounded-2xl shadow-md">
          <Text className="text-lg font-bold text-green-700">7</Text>
          <Text className="text-green-600 text-sm">Completed</Text>
        </View>
        <View className="items-center bg-white px-4 py-3 rounded-2xl shadow-md">
          <Text className="text-lg font-bold text-green-700">3</Text>
          <Text className="text-green-600 text-sm">Ongoing</Text>
        </View>
      </View>

      {/* Quick Actions */}
      <View className="mt-8 px-6 space-y-4">
        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl shadow-md">
          <Ionicons name="person-circle-outline" size={24} color="#166534" />
          <Text className="ml-3 text-green-800 font-semibold">Edit Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl shadow-md">
          <Ionicons name="settings-outline" size={24} color="#166534" />
          <Text className="ml-3 text-green-800 font-semibold">Settings</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl shadow-md">
          <Ionicons name="leaf-outline" size={24} color="#166534" />
          <Text className="ml-3 text-green-800 font-semibold">
            My Eco Badges
          </Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row items-center bg-white p-4 rounded-2xl shadow-md">
          <Ionicons name="log-out-outline" size={24} color="#dc2626" />
          <Text className="ml-3 text-red-600 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
