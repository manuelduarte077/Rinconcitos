import { View, Animated, StyleProp, ViewStyle } from 'react-native';
import React, { useEffect, useRef } from 'react';
import { LinearGradient } from 'expo-linear-gradient';

interface ShimmerProps {
  width: number | string;
  height: number;
  style?: StyleProp<ViewStyle>;
}

export const Shimmer = ({ width, height, style }: ShimmerProps) => {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [typeof width === 'number' ? -width : -100, typeof width === 'number' ? width : 100],
  });

  return (
    <View style={[{ width: width as number, height, backgroundColor: '#E0E0E0', overflow: 'hidden' }, style]}>
      <Animated.View
        style={{
          width: '100%',
          height: '100%',
          transform: [{ translateX }],
        }}
      >
        <LinearGradient
          colors={['#E0E0E0', '#F5F5F5', '#E0E0E0']}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 0 }}
          style={{ width: '100%', height: '100%' }}
        />
      </Animated.View>
    </View>
  );
};