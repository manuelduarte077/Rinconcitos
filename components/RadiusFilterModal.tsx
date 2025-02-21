import { View, Text, Modal, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons } from "@expo/vector-icons";
import Colors from '@/constants/Colors';
import { useState } from 'react';

interface RadiusFilterModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectRadius: (radius: number) => void;
  currentRadius: number;
}

const radiusOptions = [
  { label: '500 m', value: 500 },
  { label: '2 km', value: 2000 },
  { label: '5 km', value: 5000 },
  { label: '10 km', value: 10000 },
  { label: '20 km', value: 20000 },
  { label: '50 km', value: 50000 },
];

export const RadiusFilterModal = ({ 
  visible, 
  onClose, 
  onSelectRadius,
  currentRadius 
}: RadiusFilterModalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={styles.modalContent}>
          <View style={styles.header}>
            <Text style={styles.title}>Search Radius</Text>
            <TouchableOpacity onPress={onClose}>
              <Ionicons name="close" size={24} color={Colors.text} />
            </TouchableOpacity>
          </View>
          
          {radiusOptions.map((option) => (
            <TouchableOpacity
              key={option.value}
              style={[
                styles.option,
                currentRadius === option.value && styles.selectedOption
              ]}
              onPress={() => {
                onSelectRadius(option.value);
                onClose();
              }}
            >
              <Text style={[
                styles.optionText,
                currentRadius === option.value && styles.selectedOptionText
              ]}>
                {option.label}
              </Text>
              {currentRadius === option.value && (
                <Ionicons name="checkmark" size={24} color={Colors.background} />
              )}
            </TouchableOpacity>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: Colors.background,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    padding: 24,
    width: '100%',
    maxWidth: '100%',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  title: {
    fontSize: 22,
    fontFamily: 'Avenir-Medium',
    color: Colors.text,
    letterSpacing: -0.5,
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 16,
    borderRadius: 16,
    marginVertical: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.03)',
  },
  selectedOption: {
    backgroundColor: Colors.primary,
  },
  optionText: {
    fontSize: 17,
    fontFamily: 'Avenir-Medium',
    color: Colors.text,
  },
  selectedOptionText: {
    color: Colors.background,
  },
}); 