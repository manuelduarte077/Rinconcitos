import { View, StyleSheet } from 'react-native';
import React from 'react';
import { Shimmer } from './Shimmer';
import Colors from '@/constants/Colors';

export const ShimmerPlaceItem = () => {
  return (
    <View style={styles.itemContainer}>
      <Shimmer width={110} height={110} style={styles.image} />
      <View style={styles.content}>
        <Shimmer width={200} height={20} style={styles.title} />
        <Shimmer width={150} height={16} style={styles.rating} />
        <Shimmer width={180} height={16} style={styles.location} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    flexDirection: 'row',
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
  image: {
    borderRadius: 12,
  },
  content: {
    flex: 1,
    marginLeft: 12,
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    borderRadius: 4,
  },
  rating: {
    borderRadius: 4,
  },
  location: {
    borderRadius: 4,
  },
}); 