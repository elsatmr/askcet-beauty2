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
  ActivityIndicator,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import BackButton from '../../components/BackButton/BackButton';
import ColorblindFilterBottomBar from '../../components/ColorblindFilterBottomBar/ColorblindFilterBottomBar';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import ScannerBottomWindow from '../../components/ScannerBottomWindow/ScannerBottomWindow';
import { EvilIcons } from '@expo/vector-icons';
import { styles } from './CameraScreenStyle';
import { fetchScannedItemSearch } from '../../redux/actions/ScanItemActions';
import AudioSearch from '../../components/AudioSearch/AudioSearch';
import { setOriginalImageBase64Action } from '../../redux/actions/ColorblindActions';
import LoadingScreen from '../../components/LoadingScreen/LoadingScreen';

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = React.useRef<Camera>(null);
  const [colorBlindFilterOn, setColorBlindFilterOn] =
    React.useState<boolean>(false);
  const [scannerFeature, setScannerFeature] = React.useState<boolean>(false);
  const [imageBase64, setImageBase64] = React.useState<string>('');
  const scanItemReducer = useAppSelector((state) => state.ScanItemReducer);

  const imageBase64Shown: string = useAppSelector(
    (state) => state.ColorblindReducer.convertedImage64
  );

  const colorBlindFilterState = useAppSelector(
    (state) => state.ColorblindReducer
  );

  useEffect(() => {
    scanItemReducer.isFailed && setScannerFeature(false);
  }, [scanItemReducer.isFailed]);
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
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      dispatch(setOriginalImageBase64Action(photo!.base64!));
      setImageBase64(photo!.base64!);
      setColorBlindFilterOn(true);
    }
    setColorBlindFilterOn(true);
  };

  const scanPicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync({ base64: true });
      dispatch(fetchScannedItemSearch(photo!.base64!));
      setScannerFeature(true);
    }
  };

  const handleBackButtonPress = () => {
    setColorBlindFilterOn(false);
    dispatch(setOriginalImageBase64Action(''));
  };

  return (
    <View style={styles.container}>
      {imageBase64Shown != '' ? (
        <Image
          source={{ uri: 'data:image/png;base64,' + imageBase64Shown }}
          style={{
            flex: 1,
          }}
        />
      ) : (
        <Camera style={styles.camera} type={type} ref={cameraRef} />
      )}
      {imageBase64Shown != '' && (
        <View style={styles.backButtonContainer}>
          <BackButton onBackButtonPressed={handleBackButtonPress} />
        </View>
      )}
      {!colorBlindFilterOn && (
        <View
          style={[
            scannerFeature ? styles.buttonContainerUp : styles.buttonContainer,
          ]}
        >
          <TouchableOpacity
            style={[
              colorBlindFilterOn
                ? styles.activeSmallButton
                : styles.smallButton,
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
          <AudioSearch />
        </View>
      )}
      {colorBlindFilterOn && (
        <ColorblindFilterBottomBar ogImage64={imageBase64} />
      )}
      {colorBlindFilterState.isLoading && <LoadingScreen />}
      {scannerFeature && !scanItemReducer.isLoading && (
        <View style={styles.searchResultItemScrollViewContainer}>
          <ScrollView
            horizontal={true}
            style={styles.searchResultScrollView}
            contentContainerStyle={{
              width: `${100 * scanItemReducer.items.length}%`,
            }}
            showsHorizontalScrollIndicator={false}
            scrollEventThrottle={200}
            decelerationRate="fast"
            pagingEnabled
          >
            {scanItemReducer.items.map((item) => {
              return (
                <ScannerBottomWindow
                  key={item.name}
                  b64={item.image}
                  item={item}
                />
              );
            })}
          </ScrollView>
        </View>
      )}
      {scannerFeature && scanItemReducer.isLoading && (
        <View style={styles.searchResultItemScrollViewContainer}>
          <View style={styles.scannerLoadingContainer}>
            <ActivityIndicator />
          </View>
        </View>
      )}
    </View>
  );
};

export default CameraScreen;
