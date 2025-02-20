import { Animated } from "react-native";
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

const keyExtractor = (item: string) => item;

export default function PlaceScreen() {
  const sheetRef = useRef<BottomSheet>(null);
  const detailSheetRef = useRef<BottomSheet>(null);

  const data = useMemo(
    () =>
      Array(10)
        .fill(0)
        .map((_, index) => `index-${index}`),
    [],
  );
  const snapPoints = useMemo(() => ["35%", "50%", "75%"], []);
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
    [],
  );

  const renderItem = useCallback(
    ({ item, index }: { item: string; index: number }) => (
      <PlaceListItem
        item={item}
        index={index}
        scrollY={scrollY}
        onPress={handlePlacePress}
      />
    ),
    [scrollY, handlePlacePress],
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
      >
        <SearchBar />
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
        ref={detailSheetRef}
        snapPoints={detailSnapPoints}
        enablePanDownToClose
        backdropComponent={renderBackdrop}
        index={-1}
        enableDynamicSizing={false}
      >
        <PlaceDetail selectedPlace={selectedPlace} />
      </BottomSheet>
    </GestureHandlerRootView>
  );
}


