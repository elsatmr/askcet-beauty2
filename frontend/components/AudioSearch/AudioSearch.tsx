import React from 'react';
import { FontAwesome } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { styles } from './AudioSearchStyle';
import { Audio } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import { IScanItem } from '../../utils/types';
import { useAppDispatch } from '../../redux/hooks';
import {
  setAudioSearchLoading,
  setAudioSearchResult,
} from '../../redux/actions/ScanItemActions';

const AudioSearch = () => {
  const [recording, setRecording] = React.useState<Audio.Recording>();
  const [isRecording, setIsRecording] = React.useState<boolean>(false);
  const dispatch = useAppDispatch();

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
    dispatch(setAudioSearchLoading(true));
    setRecording(undefined);
    await recording!.stopAndUnloadAsync();
    await Audio.setAudioModeAsync({
      allowsRecordingIOS: false,
    });
    postRecording();
    const uri = recording!.getURI();

    console.log('Recording stopped and stored at', uri);
  };

  const postRecording = async () => {
    try {
      const response = await FileSystem.uploadAsync(
        `http://192.168.0.8:8000/speech-to-text-search`,
        recording!.getURI()!
      );
      const item = JSON.parse(response.body).result;
      const res: IScanItem = {
        name: item.name,
        rating: item.rating,
        size: item.size,
        price: item.price,
        details: item.details_summarized,
        ingredients: '\u2022' + item.ingredients.split(',').join('\n\u2022'),
        howTo: item.how_to_use_summarized,
        image: item.image_url,
      };
      dispatch(setAudioSearchResult(res));
    } catch (err) {
      console.error(err);
    }
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
function getDurationFormatted(durationMillis: any): never {
  throw new Error('Function not implemented.');
}

function setRecording(undefined: undefined) {
  throw new Error('Function not implemented.');
}

function setIsRecording(arg0: boolean) {
  throw new Error('Function not implemented.');
}

function startRecording() {
  throw new Error('Function not implemented.');
}

function stopRecording() {
  throw new Error('Function not implemented.');
}
