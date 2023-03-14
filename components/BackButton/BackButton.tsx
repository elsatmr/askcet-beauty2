import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props {
  onBackButtonPressed: () => void;
}

const BackButton = ({ onBackButtonPressed }: Props) => {
  return (
    <View>
      <TouchableOpacity onPress={onBackButtonPressed}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
