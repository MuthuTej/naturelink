// tabs/_layout.tsx
import { Tabs } from 'expo-router'
import React, { useRef } from 'react'
import { Ionicons } from '@expo/vector-icons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#7c3aed',
        tabBarInactiveTintColor: '#9ca3af',
        tabBarStyle: {
          backgroundColor: '#ffffff',
          borderTopWidth: 1,
          borderTopColor: '#e5e7eb',
          height: 70,
          paddingTop: 7,
        },
        tabBarShowLabel: false,
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="Menu"
        options={{
          title: 'Menu',
          tabBarIcon: () => (
            <MaterialCommunityIcons name="leaf" color="#166534" size={30} />
          ),
        }}
      />

      <Tabs.Screen
        name="Orders"
        options={{
          title: 'Orders',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="map-outline" color="#166534" size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="History"
        options={{
          title: 'History',
          tabBarIcon: ({ color }) => (
            <MaterialCommunityIcons name="check-decagram-outline" color="#166534" size={30} />
          ),
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" color="#166534" size={30} />
          ),
        }}
      />
         <Tabs.Screen
        name="details"
        options={{
          href: null,        // 👈 hides it from bottom tabs

        }}
      />
    </Tabs>
  );
}