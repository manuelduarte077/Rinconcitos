import { View, Text, StyleSheet } from "react-native";
import React from "react";
import { Marker, Callout } from "react-native-maps";
import { Ionicons } from "@expo/vector-icons";
import { Place } from "@/types/places";
import Colors from "@/constants/Colors";

interface CustomMarkerProps {
  place: Place;
  onMarkerPress: (place: Place) => void;
  onCalloutPress: (place: Place) => void;
  selectedPlaceId: string | null;
}

export const CustomMarker = ({
  place,
  onMarkerPress,
  onCalloutPress,
  selectedPlaceId,
}: CustomMarkerProps) => {
  const isSelected = selectedPlaceId === place.place_id;
  const isOpen = place.business_status === "OPERATIONAL";


  return (
    <Marker
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
      onPress={() => onMarkerPress(place)}
    >
      <View
        style={[
          styles.markerContainer,
          isSelected && styles.markerContainerPressed,
        ]}
      >
        <View style={styles.markerOuterRing}>
          <View style={styles.markerInnerRing}>
            <View
              style={[
                { backgroundColor: isOpen ? Colors.primary : Colors.subText },
              ]}
            />
          </View>
        </View>
      </View>

      <Callout tooltip onPress={() => onCalloutPress(place)}>
        <View style={styles.calloutContainer}>
          <View style={styles.calloutHeader}>
            <Text style={styles.calloutTitle} numberOfLines={1}>
              {place.name}
            </Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.background} />
              <Text style={styles.rating}>{place.rating}</Text>
            </View>
          </View>
          <View style={styles.statusContainer}>
            <Text style={styles.statusText}>{isOpen ? "Open" : "Closed"}</Text>
          </View>
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: "center",
    justifyContent: "center",
    width: 48,
    height: 48,
  },
  markerOuterRing: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: Colors.primary,
    opacity: 0.7,
    alignItems: "center",
    justifyContent: "center",
  },
  markerInnerRing: {
    width: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: Colors.background,
    opacity: 0.8,
    alignItems: "center",
    justifyContent: "center",
  },
  markerContainerPressed: {
    transform: [{ scale: 1.1 }],
  },
  calloutContainer: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    padding: 12,
    minWidth: 140,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutHeader: {
    marginBottom: 8,
  },
  calloutTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.background,
    fontFamily: "Avenir-Medium",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontSize: 16,
    color: Colors.background,
    fontFamily: "Avenir-Medium",
    fontWeight: "500",
  },
  statusContainer: {
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 6,
  },
  statusText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: "Avenir-Bold",
    textAlign: "center",
  },
});
