import React, { useEffect } from 'react';
import { Camera, CameraCapturedPicture, CameraType } from 'expo-camera';
import { useState } from 'react';
import {
  Button,
  Text,
  TouchableOpacity,
  View,
  Image,
  ScrollView,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import SearchBar from '../../components/SearchBar/SearchBar';
import BackButton from '../../components/BackButton/BackButton';
import ColorblindFilterBottomBar from '../../components/ColorblindFilterBottomBar/ColorblindFilterBottomBar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changePage } from '../../redux/actions/AppActions';
import { AppStateEnum } from '../../utils/enums';
import ScannerBottomWindow from '../../components/ScannerBottomWindow/ScannerBottomWindow';
import { EvilIcons } from '@expo/vector-icons';
import { styles } from './CameraScreenStyle';
import { FontAwesome } from '@expo/vector-icons';
import { fetchScannedItemSearch } from '../../redux/actions/ScanItemActions';

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = React.useRef<Camera>(null);
  const [imageUri, setImageUri] = React.useState<string>('');
  const [colorBlindFilterOn, setColorBlindFilterOn] =
    React.useState<boolean>(false);
  const [scannerFeature, setScannerFeature] = React.useState<boolean>(false);
  const [imageBase64, setImageBase64] = React.useState<string>('');
  const scannedItemSearchState = useAppSelector(
    (state) => state.ScanItemReducer.items
  );

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
      dispatch(fetchScannedItemSearch(imageBase64));
      setScannerFeature(true);
    }
  };

  const handleBackButtonPress = () => {
    setColorBlindFilterOn(false);
    setImageUri('');
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
      {imageUri != '' && (
        <View style={styles.backButtonContainer}>
          <BackButton onBackButtonPressed={handleBackButtonPress} />
        </View>
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
          <FontAwesome name="microphone" size={18} color="black" />
          <Feather name="shopping-bag" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {colorBlindFilterOn && <ColorblindFilterBottomBar />}
      {scannerFeature && (
        <View style={styles.searchResultItemScrollViewContainer}>
          <ScrollView
            horizontal={true}
            style={styles.searchResultScrollView}
            contentContainerStyle={{
              width: `${100 * scannedItemSearchState.length}%`,
            }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
          >
            {scannedItemSearchState.map((item) => {
              return (
                <ScannerBottomWindow key={item} b64={item.image} item={item} />
              );
            })}
          </ScrollView>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
