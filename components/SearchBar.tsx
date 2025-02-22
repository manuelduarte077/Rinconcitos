import { StyleSheet, TextInput, TouchableOpacity, View, Animated } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import React, { useState, useRef } from "react";
import Colors from "@/constants/Colors";
import { FadeInView } from "@/components/FadeInView";

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  onFilterPress: () => void;
}

export const SearchBar = ({
  onSearch,
  placeholder = "Buscar lugares cercanos",
  onFilterPress,
}: SearchBarProps) => {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handleFocus = () => {
    setIsFocused(true);
    Animated.spring(scaleAnim, {
      toValue: 1.02,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.spring(scaleAnim, {
      toValue: 1,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  return (
    <FadeInView duration={500} delay={200}>
      <View style={styles.searchContainer}>
        <Animated.View 
          style={[
            styles.searchBar,
            { transform: [{ scale: scaleAnim }] }
          ]}
        >
          <Ionicons name="search" size={28} color={Colors.primary} />
          <View style={styles.divider} />
          <TextInput
            placeholder={placeholder}
            style={styles.searchInput}
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            onFocus={handleFocus}
            onBlur={handleBlur}
            returnKeyType="search"
          />
        </Animated.View>
        <TouchableOpacity
          activeOpacity={0.8}
          onPress={onFilterPress}
          style={styles.filterButton}
        >
          <Ionicons name="options-outline" size={28} color={Colors.tint} />
        </TouchableOpacity>
      </View>
    </FadeInView>
  );
};

const styles = StyleSheet.create({
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 18,
    gap: 12,
    backgroundColor: Colors.background,
    borderRadius: 18,
  },
  searchBar: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: Colors.secondary,
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 2,
    gap: 8,
    borderWidth: 1,
    borderColor: Colors.subText,
    fontFamily: "Avenir-Medium",
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
    color: Colors.text,
    fontFamily: "Avenir-Medium",
  },
  filterButton: {
    width: 48,
    height: 48,
    backgroundColor: Colors.primary,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  divider: {
    width: 2,
    height: 26,
    backgroundColor: Colors.subText,
  },
});
