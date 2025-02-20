import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React from 'react';

export const SearchBar = () => {
  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={20} color="#666" />
        <TextInput placeholder="Search" style={styles.searchInput} />
      </View>
      <View style={styles.filterButton}>
        <Ionicons name="options" size={20} color="#fff" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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