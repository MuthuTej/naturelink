import React, { useState } from "react";
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    ScrollView,
} from "react-native";
import * as Location from "expo-location";

export default function AddEventModal({ token, onClose }) {
    const [loading, setLoading] = useState(false);

    // Event fields
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("Wildlife Safari");
    const [date, setDate] = useState("");
    const [locationName, setLocationName] = useState(""); // name only
    const [coords, setCoords] = useState({ latitude: "", longitude: "" }); // coordinates input
    const [maxParticipants, setMaxParticipants] = useState("20");
    const [price, setPrice] = useState("150");
    const [duration, setDuration] = useState("8");
    const [difficulty, setDifficulty] = useState("Moderate");
    const [requirements, setRequirements] = useState(
        "Comfortable walking shoes, Water bottle"
    );
    const [highlights, setHighlights] = useState("Lion sightings, Sunset views");
    const [organizerName, setOrganizerName] = useState("Eco Tours Ltd");
    const [organizerContact, setOrganizerContact] = useState("+1234567890");
    const [organizerEmail, setOrganizerEmail] = useState("info@ecotours.com");
    const [imageUrl, setImageUrl] = useState("https://example.com/image1.jpg");
    const [imageAlt, setImageAlt] = useState("Safari landscape");

    const getLocation = async () => {
        try {
            setLoading(true);
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status !== "granted") {
                Alert.alert("Permission Denied", "Location access is required.");
                return;
            }
            const loc = await Location.getCurrentPositionAsync({});
            setCoords({
                latitude: loc.coords.latitude.toString(),
                longitude: loc.coords.longitude.toString(),
            });
        } catch (error) {
            console.error(error);
            Alert.alert("Error", "Could not fetch location.");
        } finally {
            setLoading(false);
        }
    };

    const handleAddEvent = async () => {
        if (!title || !date || !locationName || !coords.latitude || !coords.longitude) {
            Alert.alert("Missing Fields", "Please fill all required fields.");
            return;
        }

        const payload = {
            title,
            description,
            category,
            date: new Date(date).toISOString(),
            location: locationName, // just the name
            coordinates: {
                latitude: parseFloat(coords.latitude),
                longitude: parseFloat(coords.longitude),
            },
            images: [{ url: imageUrl, alt: imageAlt }],
            maxParticipants: parseInt(maxParticipants),
            price: parseFloat(price),
            duration: parseInt(duration),
            difficulty,
            requirements: requirements.split(",").map((r) => r.trim()),
            highlights: highlights.split(",").map((h) => h.trim()),
            organizer: {
                name: organizerName,
                contact: organizerContact,
                email: organizerEmail,
            },
        };

        try {
            const res = await fetch(
                "https://naturelink-production.up.railway.app/api/admin/events",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify(payload),
                }
            );

            if (!res.ok) {
                const err = await res.json();
                throw new Error(err.message || "Failed to add event");
            }

            Alert.alert("Success", "Event added successfully!");
            onClose?.();
        } catch (error) {
            console.error(error);
            Alert.alert("Error", error.message);
        }
    };

    return (
        <View className="flex-1 bg-black/40 justify-end ">
            <ScrollView className="bg-green-50 rounded-t-3xl p-6 shadow-lg max-h-[90%]">
                <Text className="text-xl font-bold text-green-800 mb-4">
                    🌿 Add New Event
                </Text>

                {/* Title */}
                <Text className="text-green-800 font-semibold mb-1">Event Title</Text>
                <TextInput
                    value={title}
                    onChangeText={setTitle}
                    placeholder="Enter the event title"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Description */}
                <Text className="text-green-800 font-semibold mb-1">Description</Text>
                <TextInput
                    value={description}
                    onChangeText={setDescription}
                    placeholder="Brief description of the event"
                    multiline
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Category */}
                <Text className="text-green-800 font-semibold mb-1">Category</Text>
                <TextInput
                    value={category}
                    onChangeText={setCategory}
                    placeholder="E.g. Wildlife Safari"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Date */}
                <Text className="text-green-800 font-semibold mb-1">Date</Text>
                <TextInput
                    value={date}
                    onChangeText={setDate}
                    placeholder="YYYY-MM-DD"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Location Name */}
                <Text className="text-green-800 font-semibold mb-1">Location Name</Text>
                <TextInput
                    value={locationName}
                    onChangeText={setLocationName}
                    placeholder="Enter location name (e.g. Serengeti National Park)"
                    className="bg-white rounded-xl px-4 py-3 mb-4 border border-green-200"
                />

                {/* Coordinates */}
                {/* Coordinates */}
                <Text className="text-green-800 font-semibold mb-1">Coordinates</Text>
                <View className="flex-row items-center mb-4">
                    <TextInput
                        value={coords.latitude}
                        onChangeText={(lat) => setCoords({ ...coords, latitude: lat })}
                        placeholder="Latitude"
                        keyboardType="numeric"
                        className="flex-1 bg-white rounded-xl px-4 py-3 border border-green-200 mr-2"
                    />
                    <TextInput
                        value={coords.longitude}
                        onChangeText={(lng) => setCoords({ ...coords, longitude: lng })}
                        placeholder="Longitude"
                        keyboardType="numeric"
                        className="flex-1 bg-white rounded-xl px-4 py-3 border border-green-200"
                    />
                    <Pressable
                        className="ml-2 px-3 py-1 bg-green-600 rounded-lg"
                        onPress={getLocation}
                    >
                        <Text className="text-white font-semibold">{loading ? "..." : "GPS"}</Text>
                    </Pressable>
                </View>

                {/* Max Participants */}
                <Text className="text-green-800 font-semibold mb-1">
                    Max Participants
                </Text>
                <TextInput
                    value={maxParticipants}
                    onChangeText={setMaxParticipants}
                    placeholder="Enter maximum participants allowed"
                    keyboardType="numeric"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Price */}
                <Text className="text-green-800 font-semibold mb-1">Price</Text>
                <TextInput
                    value={price}
                    onChangeText={setPrice}
                    placeholder="Enter price in USD"
                    keyboardType="numeric"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Duration */}
                <Text className="text-green-800 font-semibold mb-1">Duration</Text>
                <TextInput
                    value={duration}
                    onChangeText={setDuration}
                    placeholder="Duration in hours"
                    keyboardType="numeric"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Difficulty */}
                <Text className="text-green-800 font-semibold mb-1">Difficulty</Text>
                <TextInput
                    value={difficulty}
                    onChangeText={setDifficulty}
                    placeholder="Easy, Moderate, Hard"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Requirements */}
                <Text className="text-green-800 font-semibold mb-1">Requirements</Text>
                <TextInput
                    value={requirements}
                    onChangeText={setRequirements}
                    placeholder="Comma separated requirements"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Highlights */}
                <Text className="text-green-800 font-semibold mb-1">Highlights</Text>
                <TextInput
                    value={highlights}
                    onChangeText={setHighlights}
                    placeholder="Comma separated highlights"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Organizer Name */}
                <Text className="text-green-800 font-semibold mb-1">
                    Organizer Name
                </Text>
                <TextInput
                    value={organizerName}
                    onChangeText={setOrganizerName}
                    placeholder="Enter organizer name"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Organizer Contact */}
                <Text className="text-green-800 font-semibold mb-1">
                    Organizer Contact
                </Text>
                <TextInput
                    value={organizerContact}
                    onChangeText={setOrganizerContact}
                    placeholder="Enter contact number"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Organizer Email */}
                <Text className="text-green-800 font-semibold mb-1">
                    Organizer Email
                </Text>
                <TextInput
                    value={organizerEmail}
                    onChangeText={setOrganizerEmail}
                    placeholder="Enter contact email"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Image URL */}
                <Text className="text-green-800 font-semibold mb-1">Image URL</Text>
                <TextInput
                    value={imageUrl}
                    onChangeText={setImageUrl}
                    placeholder="Enter image URL"
                    className="bg-white rounded-xl px-4 py-3 mb-3 border border-green-200"
                />

                {/* Image Alt Text */}
                <Text className="text-green-800 font-semibold mb-1">
                    Image Alt Text
                </Text>
                <TextInput
                    value={imageAlt}
                    onChangeText={setImageAlt}
                    placeholder="Enter image description"
                    className="bg-white rounded-xl px-4 py-3 mb-5 border border-green-200"
                />

                {/* Buttons */}
                <View className="flex-row justify-between pb-10">
                    <Pressable
                        className="bg-gray-200 px-5 py-3 rounded-xl"
                        onPress={onClose}
                    >
                        <Text className="text-gray-700 font-semibold">Cancel</Text>
                    </Pressable>

                    <Pressable
                        className="bg-green-600 px-5 py-3 rounded-xl shadow-md"
                        onPress={handleAddEvent}
                    >
                        <Text className="text-white font-semibold">Add Event</Text>
                    </Pressable>
                </View>
            </ScrollView>
        </View>
    );
}
