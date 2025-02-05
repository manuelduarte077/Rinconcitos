import { StyleSheet } from "react-native";
import React from "react";
import Colors from "@/constants/Colors";
import MapView from "react-native-maps";

export default function PlaceScreen() {
  return (
    <MapView
      style={styles.container}
      showsUserLocation={true}
      region={{
        latitude: 12.13282,
        longitude: -86.2504,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
        zoom: 13,
      }}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.light.background,
  },
});
