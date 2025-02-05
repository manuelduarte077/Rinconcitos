import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Animated,
  Platform,
} from "react-native";
import React, { useCallback, useMemo, useRef } from "react";
import MapView from "react-native-maps";
import MapHeader from "../components/MapHeader";
import { StatusBar } from "expo-status-bar";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetView,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons";
import { Keyboard } from "react-native";

const keyExtractor = (item: string) => item;

export default function PlaceScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const data = useMemo(
    () =>
      Array(50)
        .fill(0)
        .map((_, index) => `index-${index}`),
    []
  );
  const snapPoints = useMemo(() => ["35%", "50%", "75%"], []);

  const scrollY = useRef(new Animated.Value(0)).current;

  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  React.useEffect(() => {
    const keyboardWillShow = Keyboard.addListener("keyboardWillShow", () => {
      setKeyboardVisible(true);
      sheetRef.current?.snapToIndex(2);
    });

    const keyboardWillHide = Keyboard.addListener("keyboardWillHide", () => {
      setKeyboardVisible(false);
    });

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => {
      const scale = scrollY.interpolate({
        inputRange: [-1, 0, 100 * index, 100 * (index + 2)],
        outputRange: [1, 1, 1, 0.8],
      });

      return (
        <Animated.View
          key={item}
          style={[styles.itemContainer, { transform: [{ scale }] }]}
        >
          <View style={styles.placeImage}>
            <Text>🏪</Text>
          </View>
          <View style={styles.placeInfo}>
            <Text style={styles.placeName}>Place {item}</Text>
            <View style={styles.ratingContainer}>
              <Ionicons name="star" size={16} color="#FFA41C" />
              <Text style={styles.rating}>4.6</Text>
              <Text style={styles.reviews}>• 120 Reviews</Text>
            </View>
            <View style={styles.locationContainer}>
              <Ionicons name="location" size={14} color="#666" />
              <Text style={styles.location}>USA</Text>
            </View>
          </View>
          <View
            style={[
              styles.statusBadge,
              { backgroundColor: index % 2 === 0 ? "#4CAF50" : "#FF5252" },
            ]}
          >
            <Text style={styles.statusText}>
              {index % 2 === 0 ? "Open" : "Closed"}
            </Text>
          </View>
        </Animated.View>
      );
    },
    [scrollY]
  );

  return (
    <GestureHandlerRootView style={styles.container}>
      <StatusBar style="dark" />
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
      <MapHeader onMenuPress={() => {}} onProfilePress={() => {}} />

      <BottomSheet
        handleIndicatorStyle={{ display: "none" }}
        ref={sheetRef}
        snapPoints={snapPoints}
        enableDynamicSizing={false}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
      >
        <BottomSheetView style={styles.searchContainer}>
          <View style={styles.searchBar}>
            <Ionicons name="search" size={20} color="#666" />
            <TextInput placeholder="Search" style={styles.searchInput} />
          </View>
          <View style={styles.filterButton}>
            <Ionicons name="options" size={20} color="#fff" />
          </View>
        </BottomSheetView>

        <BottomSheetFlashList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={43.3}
          showsVerticalScrollIndicator={false}
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    backgroundColor: "white",
  },
  itemContainer: {
    flexDirection: "row",
    padding: 12,
    backgroundColor: "white",
    marginHorizontal: 16,
    marginVertical: 8,
    borderRadius: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3.84,
    elevation: 5,
  },
  placeImage: {
    width: 70,
    height: 70,
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  placeInfo: {
    flex: 1,
    marginLeft: 12,
    justifyContent: "center",
  },
  placeName: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 4,
  },
  ratingContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 4,
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
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    alignSelf: "flex-start",
  },
  statusText: {
    color: "white",
    fontWeight: "500",
  },
  searchContainer: {
    flexDirection: "row",
    padding: 16,
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
    borderRadius: 12,
    paddingHorizontal: 12,
    gap: 8,
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
  },
  filterButton: {
    width: 44,
    height: 44,
    backgroundColor: "#FF6B6B",
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
});
