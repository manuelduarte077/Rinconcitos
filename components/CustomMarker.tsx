import { View, Text, Pressable, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { Marker, Callout } from 'react-native-maps';
import { Image } from 'expo-image';
import { Ionicons } from "@expo/vector-icons";
import { Place } from '@/types/places';
import Colors from '@/constants/Colors';
import { getPhotoUrl } from '@/api/places';

interface CustomMarkerProps {
  place: Place;
  onMarkerPress: (place: Place) => void;
  onCalloutPress: (place: Place) => void;
}

export const CustomMarker = ({ place, onMarkerPress, onCalloutPress }: CustomMarkerProps) => {
  const [isPressed, setIsPressed] = useState(false);
  const isOpen = place.business_status === "OPERATIONAL";
  const photoUrl = place.photos?.[0]?.photo_reference 
    ? getPhotoUrl(place.photos[0].photo_reference)
    : null;

  return (
    <Marker
      coordinate={{
        latitude: place.geometry.location.lat,
        longitude: place.geometry.location.lng,
      }}
      onPress={() => {
        setIsPressed(true);
        onMarkerPress(place);
      }}
    >
      <View style={[
        styles.markerContainer,
        isPressed && styles.markerContainerPressed
      ]}>
        <View style={styles.marker}>
          <Ionicons 
            name="location" 
            size={40} 
            color={isOpen ? Colors.primary : Colors.subText} 
          />
        </View>
      </View>

      <Callout
        tooltip
        onPress={() => onCalloutPress(place)}
      >
        <View style={styles.calloutContainer}>
          {photoUrl && (
            <Image
              source={{ uri: photoUrl }}
              style={styles.calloutImage}
              contentFit="cover"
            />
          )}
          <View style={styles.calloutContent}>
            <Text style={styles.calloutTitle} numberOfLines={1}>
              {place.name}
            </Text>
            
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color={Colors.star} />
              <Text style={styles.rating}>{place.rating}</Text>
              <Text style={styles.reviews}>
                ({place.user_ratings_total})
              </Text>
            </View>

            <View style={[
              styles.statusBadge,
              { backgroundColor: isOpen ? Colors.backgroundIcon : Colors.primary }
            ]}>
              <Text style={styles.statusText}>
                {isOpen ? 'ABIERTO' : 'CERRADO'}
              </Text>
            </View>
          </View>
          
          <View style={styles.calloutArrow} />
        </View>
      </Callout>
    </Marker>
  );
};

const styles = StyleSheet.create({
  markerContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  markerContainerPressed: {
    transform: [{scale: 1.1}],
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  calloutContainer: {
    width: 200,
    backgroundColor: Colors.background,
    borderRadius: 8,
    padding: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  calloutImage: {
    width: '100%',
    height: 100,
    borderRadius: 8,
    marginBottom: 8,
  },
  calloutContent: {
    alignItems: 'center',
    gap: 4,
  },
  calloutTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text,
    fontFamily: "Avenir-Medium",
  },
  ratingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  rating: {
    fontSize: 14,
    color: Colors.text,
    fontFamily: "Avenir-Medium",
  },
  reviews: {
    fontSize: 12,
    color: Colors.subText,
    fontFamily: "Avenir-Medium",
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    marginTop: 4,
  },
  statusText: {
    fontSize: 12,
    color: Colors.background,
    fontFamily: "Avenir-Medium",
  },
  calloutArrow: {
    width: 0,
    height: 0,
    backgroundColor: 'transparent',
    borderStyle: 'solid',
    borderLeftWidth: 8,
    borderRightWidth: 8,
    borderTopWidth: 8,
    borderLeftColor: 'transparent',
    borderRightColor: 'transparent',
    borderTopColor: Colors.background,
    alignSelf: 'center',
    marginTop: 8,
  },
}); 