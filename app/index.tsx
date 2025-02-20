import { Animated, View } from "react-native";
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

const keyExtractor = (item: Place) => item.place_id;

export default function PlaceScreen() {
  const safeArea = useSafeAreaInsets();

  const sheetRef = useRef<BottomSheet>(null);
  const detailSheetRef = useRef<BottomSheet>(null);

  const data = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => ({
          place_id: `index-${index}`,
          name: `Place ${index}`,
          formatted_address: `Address ${index}`,
          business_status: "OPEN",
          rating: 4.5,
          user_ratings_total: 100,
          utc_offset_minutes: 0,
          types: ["restaurant"],
          icon: "https://maps.gstatic.com/mapfiles/place_api/icons/restaurant-71.png",
          geometry: {
            location: {
              lat: 12.13282,
              lng: -86.2504,
            },
          },
        })),
    []
  );
  const snapPoints = useMemo(() => ["50%", "75%"], []);
  const scrollY = useRef(new Animated.Value(0)).current;

  const [keyboardVisible, setKeyboardVisible] = React.useState(false);

  const [selectedPlace, setSelectedPlace] = useState<string | null>(null);
  const detailSnapPoints = useMemo(() => ["90%"], []);

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

  const handlePlacePress = useCallback((item: string) => {
    setSelectedPlace(item);
    detailSheetRef.current?.snapToIndex(0);
  }, []);

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
        onPress={handlePlacePress}
      />
    ),
    [scrollY, handlePlacePress]
  );

  return (
    <GestureHandlerRootView>
      <StatusBar style="dark" />
      <MapView
        style={{
          flex: 1,
        }}
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
        backgroundStyle={{
          backgroundColor: Colors.backgroundSecondary,
        }}
        handleComponent={() => <SearchBar />}
      >
        <BottomSheetFlashList
          data={data}
          keyExtractor={keyExtractor}
          renderItem={renderItem}
          estimatedItemSize={43.3}
          showsVerticalScrollIndicator={false}
          ListFooterComponentStyle={{ marginBottom: 30 }}
        />
      </BottomSheet>
      <BottomSheet
        handleIndicatorStyle={{ display: "none" }}
        ref={detailSheetRef}
        snapPoints={detailSnapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        index={-1}
        enableDynamicSizing={false}
        handleComponent={() => <View style={{ height: 0 }} />}
      >
        <PlaceDetail
          selectedPlace={
            selectedPlace
              ? data.find((item) => item.place_id === selectedPlace) ?? null  
              : null
          }
        />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}
