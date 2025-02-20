import { StyleSheet, TextInput, View } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import React, { useState } from 'react';
import Colors from '@/constants/Colors';

interface SearchBarProps {
  onSearch: (query: string) => void;
}

export const SearchBar = ({ onSearch }: SearchBarProps) => {
  const [searchText, setSearchText] = useState('');

  const handleSearch = () => {
    if (searchText.trim()) {
      onSearch(searchText);
    }
  };

  return (
    <View style={styles.searchContainer}>
      <View style={styles.searchBar}>
        <Ionicons name="search" size={28} color={Colors.primary} />
        <View style={styles.divider} />
        <TextInput 
          placeholder="Buscar lugares cercanos" 
          style={styles.searchInput}
          value={searchText}
          onChangeText={setSearchText}
          onSubmitEditing={handleSearch}
          returnKeyType="search"
        />
      </View>
      <View style={styles.filterButton}>
        <Ionicons name="options" size={28} color={Colors.tint} />
      </View>
    </View>
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
  },
  searchInput: {
    flex: 1,
    height: 44,
    fontSize: 16,
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