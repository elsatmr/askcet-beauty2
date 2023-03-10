import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';

interface Props {
  onBackButtonPressed: () => void;
}

const BackButton = ({ onBackButtonPressed }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={onBackButtonPressed}>
        <Ionicons name="arrow-back" size={35} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: '8%',
    left: '8%',
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 40,
  },
});

export default BackButton;
