import {
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ScrollView,
  Animated,
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
  const slideAnim = React.useRef(new Animated.Value(0)).current;
  const fadeAnim = React.useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.parallel([
      Animated.spring(slideAnim, {
        toValue: 1,
        useNativeDriver: true,
        tension: 50,
        friction: 7,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 400,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const isOpen = selectedPlace.business_status === "OPERATIONAL";
  const photoUrl = selectedPlace.photos?.[0]?.photo_reference
    ? getPhotoUrl(selectedPlace.photos[0].photo_reference)
    : null;
  const city = getCityFromPlace(selectedPlace);

  return (
    <Animated.View
      style={[
        styles.container,
        {
          transform: [
            {
              translateY: slideAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [300, 0],
              }),
            },
          ],
          opacity: fadeAnim,
        },
      ]}
    >
      <View style={styles.handleIndicatorContainer}>
        <View style={styles.handleIndicatorStyle} />
      </View>
      <Image
        source={{ uri: photoUrl }}
        style={styles.detailImage}
        contentFit="cover"
      />
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollViewContent}
        showsVerticalScrollIndicator={false}
        bounces={Platform.OS === "ios"}
        nestedScrollEnabled={true}
        automaticallyAdjustContentInsets={true}
      >
        <View style={styles.mainContent}>
          <View style={styles.headerRow}>
            <View style={styles.statusBadge}>
              <Text style={styles.statusText}>
                {isOpen ? "Open" : "Closed"}
              </Text>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={16} color={Colors.primary} />
              <Text numberOfLines={2} style={styles.location}>
                {city.city}
              </Text>
            </View>
          </View>

          <View style={styles.titleContainer}>
            <Text style={styles.detailTitle}>{selectedPlace.name}</Text>
            <TouchableOpacity style={styles.bookmarkButton}>
              <Ionicons name="bookmark" size={28} color={Colors.background} />
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
            <Text style={styles.rating}>{selectedPlace.rating}</Text>

            <Text
              style={{
                color: Colors.primary,
                fontSize: 16,
                fontFamily: "Avenir-Medium",
              }}
            >
              ({selectedPlace.user_ratings_total} Reviews)
            </Text>
          </View>

          <View style={styles.mapPreview}>
            <MapView
              userInterfaceStyle="light"
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
          </View>
        </View>
      </ScrollView>
    </Animated.View>
  );
};

interface DescriptionSectionProps {
  selectedPlace: Place;
}

const DescriptionSection = ({ selectedPlace }: DescriptionSectionProps) => {
  const isRestaurant = selectedPlace.types?.includes("restaurant");

  const getPriceLevel = (level?: number) => {
    if (!level) return "";
    return "💰".repeat(level);
  };

  return (
    <View style={styles.descriptionSection}>
      <Text style={styles.sectionTitle}>Description</Text>

      <View style={styles.descriptionContent}>
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
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  scrollView: {
    flex: 1,
  },
  scrollViewContent: {
    flexGrow: 1,
    borderRadius: 25,
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
    borderRadius: 12,
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
    flex: 1,
  },
  location: {
    color: Colors.subText,
    fontSize: 16,
    fontFamily: "Avenir-Medium",
    flexShrink: 1,
  },
  titleContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 8,
  },
  detailTitle: {
    fontSize: 24,
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
    paddingBottom: 16,
  },
  menuButton: {
    flex: 1,
    backgroundColor: "#F37B5A",
    padding: 18,
    borderRadius: 16,
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
