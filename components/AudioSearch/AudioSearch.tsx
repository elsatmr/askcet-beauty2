import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { styles } from './AudioSearchStyle';
import { Audio } from 'expo-av';

const AudioSearch = () => {
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [isRecording, setIsRecording] = React.useState<boolean>(false);

  const startRecording = async () => {
    try {
      console.log('Requesting permissions..');
      await Audio.requestPermissionsAsync();
      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      console.log('Starting recording..');
      const { recording } = await Audio.Recording.createAsync(
        Audio.RecordingOptionsPresets.HIGH_QUALITY
      );
      setRecording(recording);
      console.log('Recording started');
    } catch (err) {
      console.error('Failed to start recording', err);
    }
  };

  const stopRecording = async () => {
    console.log('Stopping recording..');
    setRecording(undefined);
    await recording!.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    const uri = recording!.getURI();
    console.log('Recording stopped and stored at', uri);
  };

  const resetRecording = () => {
    setRecording(undefined);
  };

  const handleOnPressIn = () => {
    resetRecording();
    setIsRecording(true);
    startRecording();
  };

  const handleOnPressOut = () => {
    stopRecording();
    setIsRecording(false);
  };
  return (
    <TouchableOpacity
      style={
        isRecording
          ? [
              {
                borderWidth: 1,
                borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                backgroundColor: 'red',
                borderRadius: 40,
                margin: '3%',
                opacity: 0.6,
              },
            ]
          : [
              {
                borderWidth: 1,
                borderColor: '#fff',
                alignItems: 'center',
                justifyContent: 'center',
                width: 80,
                height: 80,
                backgroundColor: '#fff',
                borderRadius: 40,
                margin: '3%',
                opacity: 0.6,
              },
            ]
      }
      onPressIn={handleOnPressIn}
      onPressOut={handleOnPressOut}
    >
      <FontAwesome name="microphone" size={18} color="black" />
    </TouchableOpacity>
  );
};

export default AudioSearch;
