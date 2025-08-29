import React, { useEffect } from "react";
import { View, Text, SafeAreaView } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function SplashScreen() {
  const router = useRouter();

  useEffect(() => {
    // Auto redirect after 2.5s
    const timer = setTimeout(() => {
      router.replace("/sign-in"); // change to your login/signup page
    }, 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-green-600 justify-center items-center">
      {/* Logo */}
      <View className="bg-green-100 rounded-full p-6 shadow-lg">
        <Ionicons name="leaf-outline" size={72} color="#15803d" />
      </View>

      {/* App Title */}
      <Text className="text-3xl font-bold text-white mt-6">NatureLink</Text>

      {/* Tagline */}
      <Text className="text-green-100 text-base mt-2 text-center px-10">
        Bringing People and Nature Together 🌍
      </Text>
    </SafeAreaView>
  );
}
