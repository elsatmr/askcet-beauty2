import React from 'react';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';

interface Props {
  mainText: string;
}

const TtsButton = ({ mainText }: Props) => {
  const handleTtsPress = () => {
    Speech.speak(mainText);
  };
  return (
    <View style={styles.voiceOverContainer}>
      <TouchableOpacity style={styles.voiceOverButton} onPress={handleTtsPress}>
        <MaterialIcons name="record-voice-over" size={24} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default TtsButton;

const styles = StyleSheet.create({
  voiceOverContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  voiceOverButton: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    backgroundColor: 'black',
    borderRadius: 50,
    margin: '3%',
  },
});
