import {
  Animated,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Place } from "@/types/places";
import Colors from "@/constants/Colors";

interface PlaceListItemProps {
  item: Place;
  index: number;
  scrollY: Animated.Value;
  onPress: (item: Place["place_id"]) => void;
}

export const PlaceListItem = ({
  item,
  index,
  scrollY,
  onPress,
}: PlaceListItemProps) => {
  const scale = scrollY.interpolate({
    inputRange: [-1, 0, 100 * index, 100 * (index + 2)],
    outputRange: [1, 1, 1, 0.8],
  });

  return (
    <Pressable onPress={() => onPress(item.place_id)}>
      <Animated.View style={[styles.itemContainer, { transform: [{ scale }] }]}>
        <View style={styles.placeImage}>
          <Image
            source={require("@/assets/images/icon.png")}
            style={styles.placeImage}
          />
        </View>
        <View style={styles.placeInfo}>
          <Text style={styles.placeName}>{item.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={16} color={Colors.star} />
            <Text style={styles.rating}>{item.rating}</Text>
            <Text style={styles.reviews}>
              • {item.user_ratings_total} Reviews
            </Text>
          </View>

          {item.business_status === "OPEN" && (
            <View style={styles.locationContainer}>
              <View
                style={[
                  styles.statusBadge,
                  {
                    backgroundColor:
                      item.business_status === "OPEN"
                        ? Colors.backgroundIcon
                        : Colors.primary,
                  },
                ]}
              >
                <Text style={styles.statusText}>{item.business_status}</Text>
              </View>
              <Ionicons name="location" size={14} color={Colors.primary} />
              <Text style={styles.location}>{item.formatted_address}</Text>
            </View>
          )}
        </View>
      </Animated.View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: Colors.background,
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: Colors.subText,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
  },
  placeImage: {
    width: 110,
    height: 110,
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
    color: Colors.text,
    fontFamily: "Avenir-Medium",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
    gap: 4,
  },
  rating: {
    fontWeight: "500",
    color: Colors.star,
  },
  reviews: {
    color: Colors.subText,
    fontFamily: "Avenir-Medium",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    color: Colors.subText,
    fontFamily: "Avenir-Medium",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  statusText: {
    color: Colors.background,
    fontWeight: "500",
    fontFamily: "Avenir-Medium",
  },
});
