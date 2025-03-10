import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Platform,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import React from "react";
import AntDesign from "@expo/vector-icons/AntDesign";
import { LinearGradient } from "expo-linear-gradient";
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
        colors={["rgba(0,0,0,0.6)", "transparent"]}
        style={styles.gradient}
      />
      <TouchableOpacity style={styles.buttonBase} onPress={onMenuPress}>
        <AntDesign name="menu-fold" size={22} color="#000000" />
      </TouchableOpacity>

      <View style={styles.titleContainer}>
        <Text style={styles.title}>Rinconcitos</Text>
      </View>

      <TouchableOpacity style={styles.buttonBase} onPress={onProfilePress}>
        <AntDesign name="user" size={22} color="#000000" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    top: Platform.OS === "ios" ? 10 : 0,
    left: 0,
    right: 0,
    backgroundColor: "transparent",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingBottom: 10,
  },
  gradient: {
    position: "absolute",
    left: 0,
    right: 0,
    top: 0,
    height: "200%",
    zIndex: -1,
  },
  buttonBase: {
    padding: 10,
    borderRadius: 25,
    backgroundColor: "rgba(255, 255, 255, 0.9)",
  },
  titleContainer: {
    position: "relative",
    alignItems: "center",
  },
  title: {
    fontSize: 22,
    color: Colors.text,
    fontFamily: "Avenir-Medium",
    fontWeight: "black",
  },
});
