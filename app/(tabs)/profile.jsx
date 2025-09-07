import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  Alert,
  ActivityIndicator,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

export default function ProfilePage() {
  const [token, setToken] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  // Load token on mount and fetch user profile
  useEffect(() => {
    const loadProfile = async () => {
      try {
        const savedToken = await AsyncStorage.getItem("authToken");
        if (!savedToken) {
          router.replace("(auth)/sign-in");
          return;
        }
        setToken(savedToken);

        // Fetch profile
        const response = await fetch(
          "https://naturelink-production.up.railway.app/api/user/profile",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${savedToken}`,
            },
          }
        );

        const data = await response.json();
        if (data.success) {
          setUser(data.data.user);
        } else {
          Alert.alert("Error", data.message || "Failed to fetch profile");
        }
      } catch (error) {
        console.error("Profile fetch error:", error);
        Alert.alert("Error", "Something went wrong while fetching profile");
      } finally {
        setLoading(false);
      }
    };

    loadProfile();
  }, []);

  const handleLogout = async () => {
    try {
      const response = await fetch(
        "https://naturelink-production.up.railway.app/api/auth/logout",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await response.json();

      if (data.success) {
        await AsyncStorage.removeItem("authToken");
        Alert.alert("Success", data.message);
        router.replace("(auth)/sign-in");
      } else {
        Alert.alert("Error", data.message || "Logout failed");
      }
    } catch (error) {
      console.error("Logout error:", error);
      Alert.alert("Error", "Something went wrong during logout");
    }
  };

  if (loading) {
    return (
      <View className="flex-1 justify-center items-center bg-green-50">
        <ActivityIndicator size="large" color="#166534" />
      </View>
    );
  }

  return (
    <ScrollView className="flex-1 bg-green-50">
      {/* Header */}
      <View className="bg-green-600 pt-14 pb-6 px-6 rounded-b-3xl shadow-lg">
        <View className="items-center">
          <Image
            source={{
              uri: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png", // static image
            }}
            className="w-28 h-28 rounded-full border-4 border-green-200"
          />
          <Text className="text-white text-2xl font-bold mt-3">
            {user?.name || "Guest User"}
          </Text>
          <Text className="text-green-100 text-sm">{user?.email}</Text>
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

        {/* Logout Button */}
        <TouchableOpacity
          onPress={handleLogout}
          className="flex-row items-center bg-white p-4 rounded-2xl shadow-md"
        >
          <Ionicons name="log-out-outline" size={24} color="#dc2626" />
          <Text className="ml-3 text-red-600 font-semibold">Logout</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
