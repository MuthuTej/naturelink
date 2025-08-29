import React, { useState } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { Picker } from '@react-native-picker/picker'
import { useRouter } from "expo-router";

export default function NatureSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [selectedRestaurant, setSelectedRestaurant] = useState("")
  const router = useRouter();

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      {/* Header */}
      <View className="flex flex-row items-center justify-between px-4 py-4 pt-12">
        <TouchableOpacity>
          <Ionicons name="leaf-outline" size={24} color="white" />
        </TouchableOpacity>
        <Text className="text-white text-lg font-semibold">NatureLink Sign Up</Text>
        <View className="w-6" />
      </View>

      {/* Main Card */}
      <View className="flex-1 bg-green-100 rounded-t-3xl mt-8 px-6 py-8">
        {/* Title */}
        <View className="mb-8 items-center">
          <Ionicons name="flower-outline" size={64} color="#22c55e" />
          <Text className="text-2xl font-bold text-green-800 mt-4">Join the Green World</Text>
          <Text className="text-green-700 text-sm text-center mt-2 leading-relaxed">
            Sign up to explore the beauty of nature and stay close to the earth 🌱
          </Text>
        </View>

        {/* Email Dropdown */}
        <View className="mb-6">
          <Text className="text-green-900 font-medium mb-2">UserName</Text>
          <TextInput
            className="bg-green-200 rounded-lg px-4 py-4 text-green-900"
            placeholder="Enter your username"
            placeholderTextColor="#4d7c0f"
          />
        </View>

        {/* Password */}
        <View className="mb-6">
          <Text className="text-green-900 font-medium mb-2">Password</Text>
          <View className="bg-green-200 rounded-lg px-4 py-4 flex flex-row items-center justify-between">
            <TextInput
              secureTextEntry={!showPassword}
              placeholder="********"
              placeholderTextColor="#166534"
              className="flex-1 text-green-900 tracking-widest"
            />
            <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
              <Ionicons
                name={showPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#166534"
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Confirm Password */}
        <View className="mb-12">
          <Text className="text-green-900 font-medium mb-2">Confirm Password</Text>
          <View className="bg-green-200 rounded-lg px-4 py-4 flex flex-row items-center justify-between">
            <TextInput
              secureTextEntry={!showConfirmPassword}
              placeholder="********"
              placeholderTextColor="#166534"
              className="flex-1 text-green-900 tracking-widest"
            />
            <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}>
              <Ionicons
                name={showConfirmPassword ? "eye-outline" : "eye-off-outline"}
                size={22}
                color="#166534"
              />
            </TouchableOpacity>
          </View>
          <View className="mt-6 flex-row justify-center">
            <Text className="text-gray-600 text-sm">Alredy having a account ? </Text>
            <TouchableOpacity onPress={() => router.push('/sign-in')}>
              <Text className="text-green-700 text-sm font-semibold">Log in</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* Sign Up Button */}
        <TouchableOpacity className="w-full bg-green-600 py-4 rounded-full shadow-lg" onPress={() => router.push('/sign-in')}>
          <Text className="text-white font-bold text-lg text-center">
            Explore Nature
          </Text>
        </TouchableOpacity>

        {/* Extra Nature Icons */}
        <View className="mt-10 flex-row justify-around">
          <Ionicons name="leaf-outline" size={40} color="#15803d" />
          <Ionicons name="flower-outline" size={40} color="#65a30d" />
          <Ionicons name="earth-outline" size={40} color="#047857" />
          <Ionicons name="water-outline" size={40} color="#10b981" />
        </View>
      </View>
    </SafeAreaView>
  )
}
