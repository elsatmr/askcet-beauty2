import React, { useEffect } from 'react';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useState } from 'react';
import {
  Button,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Image,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar/SearchBar';
import BackButton from '../../components/BackButton/BackButton';
import ColorblindFilterBottomBar from '../../components/ColorblindFilterBottomBar/ColorblindFilterBottomBar';
import { useAppDispatch } from '../../redux/hooks';
import { changePage } from '../../redux/actions/AppActions';
import { AppStateEnum } from '../../utils/enums';
import ScannerBottomWindow from '../../components/ScannerBottomWindow/ScannerBottomWindow';
import { EvilIcons } from '@expo/vector-icons';

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = React.useRef<Camera>(null);
  const [imageUri, setImageUri] = React.useState<string>('');
  const [colorBlindFilterOn, setColorBlindFilterOn] =
    React.useState<boolean>(false);
  const [scannerFeature, setScannerFeature] = React.useState<boolean>(false);
  const [imageBase64, setImageBase64] = React.useState<string>('');

  const dispatch = useAppDispatch();
  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: 'center' }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const handleColorBlindFilterPress = async () => {
    setScannerFeature(false);
    await takePicture();
    setColorBlindFilterOn(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      console.log('photo uri', photo.uri);
      setImageUri(photo.uri);
    }
  };

  const scanPicture = async () => {
    if (cameraRef.current) {
      const photo: CameraCapturedPicture =
        await cameraRef.current.takePictureAsync({ base64: true });
      setImageBase64(photo.base64!);
      setScannerFeature(true);
    }
  };

  const handleBackButtonPress = () => {
    setColorBlindFilterOn(false);
    setImageUri('');
  };

  const navigateToItemPage = () => {
    dispatch(changePage(AppStateEnum.ItemScreen));
  };

  return (
    <View style={styles.container}>
      {imageUri != '' ? (
        <Image
          source={{ uri: imageUri }}
          style={{
            width: '100%',
            height: '100%',
          }}
        />
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef} />
      )}
      {imageUri != '' ? (
        <BackButton onBackButtonPressed={handleBackButtonPress} />
      ) : (
        <SearchBar />
      )}
      <View
        style={[
          scannerFeature ? styles.buttonContainerUp : styles.buttonContainer,
        ]}
      >
        <TouchableOpacity
          style={[
            colorBlindFilterOn ? styles.activeSmallButton : styles.smallButton,
          ]}
          onPress={handleColorBlindFilterPress}
        >
          <Ionicons
            name="eye-outline"
            size={24}
            color={colorBlindFilterOn ? 'white' : 'black'}
          />
        </TouchableOpacity>
        {!scannerFeature ? (
          <TouchableOpacity style={styles.bigButton} onPress={scanPicture}>
            <MaterialCommunityIcons
              name="scan-helper"
              size={20}
              color="black"
            />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.bigButton}
            onPress={() => {
              setScannerFeature(false);
            }}
          >
            <EvilIcons name="close" size={20} color="black" />
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.smallButton}>
          <Feather name="shopping-bag" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {colorBlindFilterOn && <ColorblindFilterBottomBar />}
      {scannerFeature && <ScannerBottomWindow b64={imageBase64} />}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '13%',
    width: '100%',
  },
  buttonContainerUp: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '30%',
    width: '100%',
  },
  smallButton: {
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
  activeSmallButton: {
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: 'black',
    borderRadius: 40,
    margin: '3%',
    opacity: 0.6,
  },
  bigButton: {
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: '3%',
  },
});
