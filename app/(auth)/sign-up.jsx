import React, { useState } from "react"
import { 
  View, 
  Text, 
  TextInput, 
  TouchableOpacity, 
  SafeAreaView, 
  Alert, 
  ActivityIndicator, 
  KeyboardAvoidingView, 
  ScrollView, 
  Platform, 
  Keyboard, 
  TouchableWithoutFeedback 
} from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { useRouter } from "expo-router"

export default function NatureSignUp() {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)

  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [phone, setPhone] = useState("")
  const [address, setAddress] = useState("")

  const [loading, setLoading] = useState(false)

  const router = useRouter()

  const handleSignUp = async () => {
    if (!name || !email || !password || !confirmPassword || !phone || !address) {
      Alert.alert("Error", "Please fill all fields")
      return
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match")
      return
    }

    try {
      setLoading(true)
      const response = await fetch(
        "https://naturelink-production.up.railway.app/api/auth/signup",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, password, phone, address }),
        }
      );
      

      const data = await response.json()
      setLoading(false)

      if (response.ok && data.success) {
        Alert.alert("Success", data.message)
        router.push("/sign-in")
      } else {
        Alert.alert("Sign Up Failed", data.message || "Something went wrong")
      }
    } catch (error) {
      setLoading(false)
      Alert.alert("Error", "Could not connect to server")
    }
  }

  return (
    <SafeAreaView className="flex-1 bg-green-500">
      <KeyboardAvoidingView 
        behavior={Platform.OS === "ios" ? "padding" : "height"} 
        style={{ flex: 1 }}
      >
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <ScrollView 
            contentContainerStyle={{ flexGrow: 1 }} 
            keyboardShouldPersistTaps="handled"
          >
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

              {/* Username */}
              <View className="mb-6">
                <Text className="text-green-900 font-medium mb-2">User Name</Text>
                <TextInput
                  className="bg-green-200 rounded-lg px-4 py-4 text-green-900"
                  placeholder="Enter your username"
                  placeholderTextColor="#4d7c0f"
                  value={name}
                  onChangeText={setName}
                />
              </View>

              {/* Email */}
              <View className="mb-6">
                <Text className="text-green-900 font-medium mb-2">Email</Text>
                <TextInput
                  className="bg-green-200 rounded-lg px-4 py-4 text-green-900"
                  placeholder="Enter your email"
                  placeholderTextColor="#4d7c0f"
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                />
              </View>

              {/* Phone */}
              <View className="mb-6">
                <Text className="text-green-900 font-medium mb-2">Phone Number</Text>
                <TextInput
                  className="bg-green-200 rounded-lg px-4 py-4 text-green-900"
                  placeholder="+1234567890"
                  placeholderTextColor="#4d7c0f"
                  value={phone}
                  onChangeText={setPhone}
                  keyboardType="phone-pad"
                />
              </View>

              {/* Address */}
              <View className="mb-6">
                <Text className="text-green-900 font-medium mb-2">Address</Text>
                <TextInput
                  className="bg-green-200 rounded-lg px-4 py-4 text-green-900"
                  placeholder="123 Main St, City, State"
                  placeholderTextColor="#4d7c0f"
                  value={address}
                  onChangeText={setAddress}
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
                    value={password}
                    onChangeText={setPassword}
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
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
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
                  <Text className="text-gray-600 text-sm">Already have an account? </Text>
                  <TouchableOpacity onPress={() => router.push('/sign-in')}>
                    <Text className="text-green-700 text-sm font-semibold">Log in</Text>
                  </TouchableOpacity>
                </View>
              </View>

              {/* Sign Up Button */}
              <TouchableOpacity 
                className="w-full bg-green-600 py-4 rounded-full shadow-lg" 
                onPress={handleSignUp}
                disabled={loading}
              >
                {loading ? (
                  <ActivityIndicator color="white" />
                ) : (
                  <Text className="text-white font-bold text-lg text-center">
                    Explore Nature
                  </Text>
                )}
              </TouchableOpacity>

              {/* Extra Nature Icons */}
              <View className="mt-10 flex-row justify-around">
                <Ionicons name="leaf-outline" size={40} color="#15803d" />
                <Ionicons name="flower-outline" size={40} color="#65a30d" />
                <Ionicons name="earth-outline" size={40} color="#047857" />
                <Ionicons name="water-outline" size={40} color="#10b981" />
              </View>
            </View>
          </ScrollView>
        </TouchableWithoutFeedback>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
