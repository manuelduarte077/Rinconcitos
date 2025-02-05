import { Animated, Pressable, StyleSheet, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';

interface PlaceListItemProps {
  item: string;
  index: number;
  scrollY: Animated.Value;
  onPress: (item: string) => void;
}

export const PlaceListItem = ({ item, index, scrollY, onPress }: PlaceListItemProps) => {
  const scale = scrollY.interpolate({
    inputRange: [-1, 0, 100 * index, 100 * (index + 2)],
    outputRange: [1, 1, 1, 0.8],
  });

  return (
    <Pressable onPress={() => onPress(item)}>
      <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
        <View style={styles.placeImage}>
          <Text>🏪</Text>
        </View>
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>Place {item}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color="#FFA41C" />
            <Text style={styles.rating}>4.6</Text>
            <Text style={styles.reviews}>• 120 Reviews</Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={14} color="#666" />
            <Text style={styles.location}>USA</Text>
          </View>
        </View>
        <View
          style={[
            styles.statusBadge,
            { backgroundColor: index % 2 === 0 ? "#4CAF50" : "#FF5252" },
          ]}
        >
          <Text style={styles.statusText}>
            {index % 2 === 0 ? "Open" : "Closed"}
          </Text>
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeImage: {
    width: 70,
    height: 70,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  placeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  placeName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  rating: {
    fontWeight: "500",
  },
  reviews: {
    color: "#666",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    color: "#666",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontWeight: "500",
  },
}); 