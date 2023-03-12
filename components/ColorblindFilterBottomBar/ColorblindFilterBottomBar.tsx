import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const ColorblindFilterBottomBar = () => {
  return (
    <View style={styles.colorBlindFilterContainer}>
      <TouchableOpacity>
        <View style={styles.colorBlindFilterIconContainer}>
          <Ionicons
            name="eye"
            size={24}
            color="black"
            style={{ textAlign: 'center' }}
          />
          <Text style={{ textAlign: 'center' }}>Normal</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.colorBlindFilterIconContainer}>
          <Ionicons
            name="eye-off"
            size={24}
            color="#BB6464"
            style={{ textAlign: 'center' }}
          />
          <Text style={{ textAlign: 'center' }}>Protanopia</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.colorBlindFilterIconContainer}>
          <Ionicons
            name="eye-off"
            size={24}
            color="#90A17D"
            style={{ textAlign: 'center' }}
          />
          <Text style={{ textAlign: 'center' }}>Deuteranopia</Text>
        </View>
      </TouchableOpacity>
      <TouchableOpacity>
        <View style={styles.colorBlindFilterIconContainer}>
          <Ionicons
            name="eye-off"
            size={24}
            color="#7895B2"
            style={{ textAlign: 'center' }}
          />
          <Text style={{ textAlign: 'center' }}>Tritanopia</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  colorBlindFilterContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    width: '100%',
    height: '12%',
    backgroundColor: 'white',
    paddingBottom: '5%',
  },
  colorBlindFilterIconContainer: {
    margin: '3%',
  },
});

export default ColorblindFilterBottomBar;
