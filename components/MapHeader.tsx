import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from 'expo-linear-gradient';
import Colors from "@/constants/Colors";

interface MapHeaderProps {
  onMenuPress?: () => void;
  onProfilePress?: () => void;
}

export default function MapHeader({
  onMenuPress,
  onProfilePress,
}: MapHeaderProps) {
  const insets = useSafeAreaInsets();

  return (
    <View style={[styles.container, { paddingTop: insets.top + 10 }]}>
      <LinearGradient
        colors={['rgba(0,0,0,0.4)', 'transparent']}
        style={styles.gradient}
      />
      <TouchableOpacity style={styles.buttonBase} onPress={onMenuPress}>
        <AntDesign name="menu-fold" size={22} color="#000000" />
      </TouchableOpacity>

      <Text style={styles.title}>Rincóncitos</Text>

      <TouchableOpacity style={styles.buttonBase} onPress={onProfilePress}>
        <AntDesign name="user" size={22} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
    zIndex: 1000,
  },
  gradient: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '150%',
    zIndex: -1,
  },
  buttonBase: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: Colors.light.text,
    },
});
