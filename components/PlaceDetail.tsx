import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Image } from "expo-image";
import { Place } from "@/types/places";
import Colors from "@/constants/Colors";
import { getCityFromPlace, getPhotoUrl } from "@/api/places";
import MapView, {
  PROVIDER_GOOGLE,
  PROVIDER_DEFAULT,
  Marker,
} from "react-native-maps";

interface PlaceDetailProps {
  selectedPlace: Place;
}

export const PlaceDetail = ({ selectedPlace }: PlaceDetailProps) => {
  const isOpen = selectedPlace.business_status === "OPERATIONAL";
  const photoUrl = selectedPlace.photos?.[0]?.photo_reference
    ? getPhotoUrl(selectedPlace.photos[0].photo_reference)
    : null;
  const city = getCityFromPlace(selectedPlace);

  return (
    <ScrollView style={styles.detailContainer} showsVerticalScrollIndicator={false}>
      <View style={styles.handleIndicatorContainer}>
        <View style={styles.handleIndicatorStyle} />
      </View>

        <Image
          source={{ uri: photoUrl }}
          style={styles.detailImage}
          contentFit="cover"
        />

        <View style={styles.mainContent}>
          <View style={styles.headerRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {isOpen ? "Open" : "Closed"}
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color={Colors.subText} />
              <Text style={styles.location}>{city.city}</Text>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.detailTitle}>{selectedPlace.name}</Text>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Ionicons name="bookmark" size={24} color={Colors.background} />
            </TouchableOpacity>
          </View>

          <View style={styles.ratingContainer}>
            {[1, 2, 3, 4, 5].map((star, index) => (
              <Ionicons
                key={index}
                name={
                  index < Math.floor(selectedPlace.rating)
                    ? "star"
                    : "star-outline"
                }
                size={20}
                color="#FFC107"
              />
            ))}
            <Text style={styles.rating}>
              {selectedPlace.rating}
            </Text>

            <Text style={{
              color: Colors.primary,
              fontSize: 16,
              fontFamily: "Avenir-Medium",
            }}>
              ({selectedPlace.user_ratings_total} Reviews)
            </Text>
          </View>

          <View style={styles.mapPreview}>
            <MapView
              style={{
                width: "100%",
                height: "100%",
                overflow: "hidden",
              }}
              initialRegion={{
                latitude: selectedPlace.geometry.location.lat,
                longitude: selectedPlace.geometry.location.lng,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              provider={
                Platform.OS === "android" ? PROVIDER_GOOGLE : PROVIDER_DEFAULT
              }
            >
              <Marker
                coordinate={{
                  latitude: selectedPlace.geometry.location.lat,
                  longitude: selectedPlace.geometry.location.lng,
                }}
                title={selectedPlace.name}
                description={selectedPlace.formatted_address}
              />
            </MapView>
          </View>

          <DescriptionSection selectedPlace={selectedPlace} />

          <View style={styles.buttonContainer}>
            <TouchableOpacity style={styles.menuButton}>
              <Text style={styles.buttonText}>View Menu</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.callButton}>
              <Ionicons name="call" size={20} color="white" />
            </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

interface DescriptionSectionProps {
  selectedPlace: Place;
}

const DescriptionSection = ({ selectedPlace }: DescriptionSectionProps) => {
  const isRestaurant = selectedPlace.types?.includes("restaurant");
  const isPriceAvailable = selectedPlace.price_level !== undefined;

  const getPriceLevel = (level?: number) => {
    if (!level) return "";
    return "💰".repeat(level);
  };

  return (
    <View style={styles.descriptionSection}>
      <Text style={styles.sectionTitle}>Description</Text>

      <View style={styles.descriptionContent}>
        {isPriceAvailable && (
          <View style={styles.priceContainer}>
            <Text style={styles.priceLevel}>
              {getPriceLevel(selectedPlace.price_level)}
            </Text>
            <Text style={styles.priceText}>
              {selectedPlace.price_level === 1
                ? "Budget"
                : selectedPlace.price_level === 2
                ? "Moderate"
                : selectedPlace.price_level === 3
                ? "Expensive"
                : "Very Expensive"}
            </Text>
          </View>
        )}

        <Text style={styles.description}>
          {isRestaurant
            ? "Experience unique flavors in a cozy atmosphere. Fresh ingredients and quality service make every visit special."
            : "Discover this amazing spot offering a unique experience in its category. Quality service in a comfortable environment."}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
  },
  handleIndicatorContainer: {
    position: "absolute",
    zIndex: 101,
    width: "100%",
    alignItems: "center",
    paddingTop: 8,
  },
  handleIndicatorStyle: {
    width: 40,
    height: 4,
    backgroundColor: Colors.subText,
    borderRadius: 2,
  },
  mainContent: {
    padding: 16,
    gap: 16,
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 12,
    marginTop: 16,
  },
  statusBadge: {
    backgroundColor: "#90D67F",
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  statusText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Avenir-Medium",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  location: {
    color: Colors.subText,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  detailTitle: {
    fontSize: 32,
    fontFamily: "Avenir-Black",
    color: Colors.text,
    flex: 1,
  },
  bookmarkButton: {
    backgroundColor: Colors.primary,
    padding: 12,
    borderRadius: 12,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
    gap: 4,
  },
  rating: {
    marginLeft: 8,
    color: Colors.subText,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
  },
  mapPreview: {
    height: 120,
    backgroundColor: "#f0f0f0",
    borderRadius: 12,
    marginVertical: 16,
    overflow: "hidden",
  },
  descriptionSection: {
    gap: 12,
  },
  descriptionContent: {
    gap: 16,
    paddingBottom: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: "Avenir-Medium",
    color: Colors.text,
  },
  description: {
    fontSize: 16,
    color: Colors.subText,
    lineHeight: 24,
    fontFamily: "Avenir-Medium",
  },
  priceContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },
  priceLevel: {
    fontSize: 16,
  },
  priceText: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: "Avenir-Medium",
  },
  detailImage: {
    width: "100%",
    height: 240,
    borderBottomLeftRadius: 25,
    borderBottomRightRadius: 25,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
  },
  menuButton: {
    flex: 1,
    backgroundColor: "#F37B5A",
    padding: 18,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  callButton: {
    backgroundColor: "#3C3C3C",
    padding: 18,
    borderRadius: 16,
    aspectRatio: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    fontWeight: "500",
  },
});