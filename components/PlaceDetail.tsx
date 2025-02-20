import { StyleSheet, Text, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';
import { Image } from 'expo-image';
import { Place } from '@/types/places';
import Colors from '@/constants/Colors';
import { getPhotoUrl } from '@/api/places';


interface PlaceDetailProps {
  selectedPlace: Place;
}

export const PlaceDetail = ({ selectedPlace }: PlaceDetailProps) => {
  const isOpen = selectedPlace.business_status === "OPERATIONAL";
  const photoUrl = selectedPlace.photos?.[0]?.photo_reference 
    ? getPhotoUrl(selectedPlace.photos[0].photo_reference)
    : null;

  return (
    <View style={styles.detailContainer}>
      <View style={styles.detailHeader}>
        <View style={styles.handleIndicatorContainer}>
          <View style={styles.handleIndicatorStyle} />
        </View>

        <Image
          source={{ uri: photoUrl }}
          style={styles.detailImage}
          contentFit="cover"
        />
        <View style={styles.detailInfo}>
          <Text style={styles.detailTitle}>{selectedPlace.name}</Text>
          <View style={styles.ratingContainer}>
            <Ionicons name="star" size={20} color="#FFA41C" />
            <Text style={styles.rating}>{selectedPlace.rating}</Text>
            <Text style={styles.reviews}>• {selectedPlace.user_ratings_total} Reviews</Text>
          </View>
          <View style={styles.locationContainer}>
            <Ionicons name="location" size={16} color="#666" />
            <Text style={styles.location}>{selectedPlace.formatted_address}</Text>
          </View>
        </View>
      </View>
      
      <View style={styles.statusContainer}>
        <View style={[
          styles.statusBadge,
          { backgroundColor: isOpen ? Colors.backgroundIcon : Colors.primary }
        ]}>
          <Text style={styles.statusText}>
            {isOpen ? 'ABIERTO' : 'CERRADO'}
          </Text>
        </View>
      </View>

      <View style={styles.detailContent}>
        <Text style={styles.sectionTitle}>Información</Text>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Dirección:</Text>
          <Text style={styles.infoText}>{selectedPlace.formatted_address}</Text>
        </View>
        <View style={styles.infoContainer}>
          <Text style={styles.infoLabel}>Tipo:</Text>
          <Text style={styles.infoText}>
            {selectedPlace.types?.join(', ')}
          </Text>
        </View>
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
    backgroundColor: Colors.subText,
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
    color: Colors.subText,
    lineHeight: 24,
    fontFamily: "Avenir-Medium",
  },
  statusContainer: {
    marginBottom: 20,
    alignItems: 'center',
  },
  statusBadge: {
    padding: 8,
    borderRadius: 8,
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.background,
    fontFamily: "Avenir-Medium",
  },
  infoContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  infoLabel: {
    fontSize: 16,
    fontWeight: '600',
    marginRight: 8,
    fontFamily: "Avenir-Medium",
  },
  infoText: {
    fontSize: 16,
    fontFamily: "Avenir-Medium",
  },
}); 