import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";

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
  buttonBase: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.8)",
  },
  title: {
    fontSize: 20,
    fontWeight: "600",
    color: "#000",
    textShadowColor: "rgba(255, 255, 255, 0.5)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 3,
  },
});
