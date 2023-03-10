import React from 'react';
import { Camera, CameraType } from 'expo-camera';
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

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = React.useRef<Camera>(null);
  const [imageUri, setImageUri] = React.useState<string>('');
  const [colorBlindFilterOn, setColorBlindFilterOn] =
    React.useState<boolean>(false);

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
    await takePicture();
    setColorBlindFilterOn(true);
  };

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
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
      {imageUri != '' ? (
        <BackButton onBackButtonPressed={handleBackButtonPress} />
      ) : (
        <SearchBar />
      )}
      <View style={styles.buttonContainer}>
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
        <TouchableOpacity style={styles.bigButton}>
          <MaterialCommunityIcons name="scan-helper" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton}>
          <Feather name="shopping-bag" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {colorBlindFilterOn && (
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
      )}
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
  searchBarContainer: {
    backgroundColor: 'red',
    // position: 'absolute',
    // top: '10%',
  },
});
