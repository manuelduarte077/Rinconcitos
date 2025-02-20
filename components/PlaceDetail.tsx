import { StyleSheet, Text, View, Image } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';

interface PlaceDetailProps {
  selectedPlace: string | null;
}

export const PlaceDetail = ({ selectedPlace }: PlaceDetailProps) => {
  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <Image
          source={{ uri: 'https://picsum.photos/400/200' }}
          style={styles.detailImage}
        />
        <View style={styles.detailInfo}>
          <Text style={styles.detailTitle}>Place {selectedPlace}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFA41C" />
            <Text style={styles.rating}>4.6</Text>
            <Text style={styles.reviews}>• 120 Reviews</Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.location}>USA</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.detailContent}>
        <Text style={styles.sectionTitle}>Description</Text>
        <Text style={styles.description}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do 
          eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  detailContainer: {
    flex: 1,
    padding: 16,
    zIndex: 100,
  },
  detailHeader: {
    marginBottom: 20,
  },
  detailImage: {
    width: '100%',
    height: 200,
    borderRadius: 16,
    marginBottom: 16,
  },
  detailInfo: {
    gap: 8,
  },
  detailTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 8,
  },
  detailContent: {
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
}); 