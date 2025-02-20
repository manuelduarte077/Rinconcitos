import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { Image } from 'expo-image';
import { Place } from '@/types/places';


interface PlaceDetailProps {
  selectedPlace: Place | null;
}

export const PlaceDetail = ({ selectedPlace }: PlaceDetailProps) => {

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <View style={styles.handleIndicatorContainer}>
          <View style={styles.handleIndicatorStyle} />
        </View>

        <Image
          source={{ uri: selectedPlace?.icon }}
          style={styles.detailImage}
          contentFit="cover"
        />
        <View style={styles.detailInfo}>
          <Text style={styles.detailTitle}>{selectedPlace?.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFA41C" />
            <Text style={styles.rating}>{selectedPlace?.rating}</Text>
            <Text style={styles.reviews}>• {selectedPlace?.user_ratings_total} Reviews</Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.location}>{selectedPlace?.formatted_address}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.detailContent}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          {selectedPlace?.business_status}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    zIndex: 100,
    flex: 1,
  },
  handleIndicatorContainer: {
    position: 'absolute',
    zIndex: 101,
    width: '100%',
    alignItems: 'center',
    paddingTop: 8,
  },
  handleIndicatorStyle: {
    width: 40,
    height: 4,
    backgroundColor: "#E0E0E0",
    borderRadius: 2,
  },
  detailHeader: {
    marginBottom: 20,
  },
  detailImage: {
    width: '100%',
    height: 320,
    borderRadius: 12,
    marginBottom: 16,
  },
  detailInfo: {
    gap: 8,
    paddingHorizontal: 16,
  },
  detailTitle: {
    fontSize: 24,
    fontFamily: "Avenir-Medium",
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },
  rating: {
    fontFamily: "Avenir-Medium",
  },
  reviews: {
    color: "#666",
    fontFamily: "Avenir-Medium",
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4, 
  },
  location: {
    color: "#666",
    fontFamily: "Avenir-Medium",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
    fontFamily: "Avenir-Medium",
  },
  detailContent: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
    fontFamily: "Avenir-Medium",
  },
}); 