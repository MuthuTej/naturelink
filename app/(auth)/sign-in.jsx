import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, Image } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";

export default function NatureScreen() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-4 py-4 pt-12">
        <TouchableOpacity>
          <Ionicons name="leaf-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">NatureLink</Text>
        <View className="w-6" />
      </View>

      {/* Main Card */}
      <View className="flex-1 bg-green-100 rounded-t-3xl mt-8 px-6 py-8">
        {/* Welcome */}
        <View className="mb-8 items-center">
          <Ionicons name="sunny-outline" size={64} color="#22c55e" />
          <Text className="text-3xl font-bold text-green-800 mt-4">Welcome to NatureLink</Text>
          <Text className="text-green-700 text-sm mt-2 text-center leading-relaxed">
            Breathe in freshness, feel the green, and stay connected with nature.
          </Text>
        </View>

        {/* Example Input */}
        <View className="mb-6">
          <Text className="text-green-900 font-medium mb-2">UserName</Text>
          <TextInput
            className="bg-green-200 rounded-lg px-4 py-4 text-green-900"
            placeholder="Enter your username"
            placeholderTextColor="#4d7c0f"
          />
        </View>

        {/* Example Password with Eye */}
        <View className="mb-4">
          <Text className="text-green-900 font-medium mb-2">Password</Text>
          <View className="bg-green-200 rounded-lg px-4 py-4 flex flex-row items-center justify-between">
            <TextInput
              className="flex-1 text-green-900"
              placeholder="••••••••••••"
              placeholderTextColor="#4d7c0f"
              secureTextEntry={!showPassword}
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#166534"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600 text-sm">Don’t have an account? </Text>
            <TouchableOpacity onPress={() => router.push('/sign-up')}>
              <Text className="text-green-700 text-sm font-semibold">Sign Up</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Nature Button */}
        <TouchableOpacity onPress={() => router.push('(tabs)/Menu')} className="w-full bg-green-600 py-4 rounded-full shadow-lg" >
          <Text className="text-white font-bold text-lg text-center">
            Explore Nature
          </Text>
        </TouchableOpacity>

        {/* Extra Decorations */}
        <View className="mt-10 flex-row justify-around">
          <Ionicons name="leaf-outline" size={40} color="#15803d" />
          <Ionicons name="flower-outline" size={40} color="#65a30d" />
          <Ionicons name="water-outline" size={40} color="#10b981" />
          <Ionicons name="earth-outline" size={40} color="#047857" />
        </View>
      </View>
    </SafeAreaView>
  );
}
