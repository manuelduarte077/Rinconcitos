import { Animated, View, StyleSheet, Platform } from "react-native";
import React, { useCallback, useMemo, useRef, useState } from "react";
import MapView from "react-native-maps";
import MapHeader from "../components/MapHeader";
import { StatusBar } from "expo-status-bar";
import BottomSheet, {
  BottomSheetFlashList,
  BottomSheetBackdrop,
} from "@gorhom/bottom-sheet";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Keyboard } from "react-native";
import { PlaceListItem } from "../components/PlaceListItem";
import { SearchBar } from "../components/SearchBar";
import { PlaceDetail } from "../components/PlaceDetail";
import Colors from "@/constants/Colors";
import { Place } from "@/types/places";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "../hooks/useLocation";
import { getNearbyPlaces, searchPlacesByQuery } from "../api/places";
import { ShimmerPlaceItem } from '@/components/ShimmerPlaceItem';
import { CustomMarker } from '@/components/CustomMarker';

const keyExtractor = (item: Place) => item.place_id;

export default function PlaceScreen() {
  const safeArea = useSafeAreaInsets();

  const sheetRef = useRef<BottomSheet>(null);
  const detailSheetRef = useRef<BottomSheet>(null);

  const { location, errorMsg, isLoading: locationLoading } = useLocation();
  const [searchQuery, setSearchQuery] = useState<string>("");

  const { data: nearbyPlaces = [], isLoading: nearbyPlacesLoading } = useQuery({
    queryKey: ["nearby-places", location?.latitude, location?.longitude],
    queryFn: () =>
      location
        ? getNearbyPlaces(location.latitude, location.longitude)
        : Promise.resolve([]),
    enabled: !!location && !searchQuery,
  });

  const { data: searchResults = [], isLoading: searchLoading } = useQuery({
    queryKey: ["search-places", searchQuery, location?.latitude, location?.longitude],
    queryFn: () =>
      location && searchQuery
        ? searchPlacesByQuery(searchQuery, location.latitude, location.longitude)
        : Promise.resolve([]),
    enabled: !!location && !!searchQuery,
  });

  const places = searchQuery ? searchResults : nearbyPlaces;

  const snapPoints = useMemo(() => ["45%", "50%", "75%"], []);
  const detailSnapPoints = useMemo(() => ["95%"], []);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);

  const mapRef = useRef<MapView>(null);

  React.useEffect(() => {
    const keyboardWillShow = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillShow" : "keyboardDidShow",
      () => {
        setKeyboardVisible(true);
        sheetRef.current?.snapToIndex(2);
      }
    );

    const keyboardWillHide = Keyboard.addListener(
      Platform.OS === "ios" ? "keyboardWillHide" : "keyboardDidHide",
      () => {
        setKeyboardVisible(false);
        sheetRef.current?.snapToIndex(1);
      }
    );

    return () => {
      keyboardWillShow.remove();
      keyboardWillHide.remove();
    };
  }, []);

  const handlePlacePress = useCallback((place: Place) => {
    setSelectedPlace(place);
    detailSheetRef.current?.snapToIndex(0);
  }, []);

  const handleMarkerPress = (place: Place) => {
    mapRef.current?.animateToRegion({
      latitude: place.geometry.location.lat,
      longitude: place.geometry.location.lng,
      latitudeDelta: 0.005,
      longitudeDelta: 0.005,
    });
  };

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        disappearsOnIndex={-1}
        appearsOnIndex={0}
        opacity={0.5}
      />
    ),
    []
  );

  const renderItem = useCallback(
    ({ item, index }: { item: Place; index: number }) => (
      <PlaceListItem
        item={item}
        index={index}
        scrollY={scrollY}
        onPress={() => handlePlacePress(item)}
      />
    ),
    [scrollY, handlePlacePress]
  );

  const renderLoadingState = () => {
    return Array(5).fill(0).map((_, index) => (
      <ShimmerPlaceItem key={index} />
    ));
  };

  const renderMarkers = () => {
    return places?.map((place) => (
      <CustomMarker
        key={place.place_id}
        place={place}
        onMarkerPress={handleMarkerPress}
        onCalloutPress={handlePlacePress}
      />
    ));
  };

  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <StatusBar style="dark" />
      <MapView
        ref={mapRef}
        style={{ flex: 1 }}
        showsUserLocation={true}
        region={{
          latitude: location?.latitude ?? 12.13282,
          longitude: location?.longitude ?? -86.2504,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        }}
        mapType="hybrid"
        showsTraffic={true}
      >
        {renderMarkers()}
      </MapView>
      <MapHeader onMenuPress={() => {}} onProfilePress={() => {}} />

      <BottomSheet
        handleStyle={{ display: "none" }}
        enableOverDrag={false}
        enablePanDownToClose={false}
        ref={sheetRef}
        snapPoints={snapPoints}
        index={0}
        enableDynamicSizing={false}
        keyboardBehavior="extend"
        keyboardBlurBehavior="restore"
        android_keyboardInputMode="adjustResize"
        backgroundStyle={{
          backgroundColor: Colors.backgroundSecondary,
        }}
      >
        <SearchBar
          onSearch={(query) => {
            setSearchQuery(query);
          }}
        />
        <View style={styles.listContainer}>
          {nearbyPlacesLoading || searchLoading ? (
            renderLoadingState()
          ) : (
            <BottomSheetFlashList
              data={places}
              keyExtractor={keyExtractor}
              renderItem={renderItem}
              estimatedItemSize={100}
              showsVerticalScrollIndicator={false}
              contentContainerStyle={styles.listContentContainer}
            />
          )}
        </View>
      </BottomSheet>

      <BottomSheet
        ref={detailSheetRef}
        snapPoints={detailSnapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        index={-1}
        enableDynamicSizing={false}
        handleComponent={() => <View style={{ height: 0 }} />}
      >
        {selectedPlace && <PlaceDetail selectedPlace={selectedPlace} />}
      </BottomSheet>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    height: "100%",
    minHeight: 400,
  },
  listContentContainer: {
    paddingBottom: 30,
  },
  markerContainer: {
    alignItems: 'center',
    width: 150,
  },
  markerImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.background,
  },
  markerBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    marginTop: 4,
    maxWidth: '100%',
  },
  markerName: {
    color: Colors.background,
    fontSize: 12,
    fontFamily: "Avenir-Medium",
    textAlign: 'center',
  },
});
