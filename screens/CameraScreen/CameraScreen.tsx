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

const CameraScreen = () => {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const cameraRef = React.useRef<Camera>(null);
  const [imageUri, setImageUri] = React.useState<string>('');

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

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  const takePicture = async () => {
    if (cameraRef.current) {
      const photo = await cameraRef.current.takePictureAsync();
      setImageUri(photo.uri);
    }
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
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.smallButton} onPress={takePicture}>
          <Ionicons name="eye-outline" size={24} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.bigButton} onPress={takePicture}>
          <MaterialCommunityIcons name="scan-helper" size={20} color="black" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.smallButton} onPress={takePicture}>
          <Feather name="shopping-bag" size={24} color="black" />
        </TouchableOpacity>
      </View>

      {/* </Camera> */}
    </View>
  );
};

export default CameraScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: '10%',
    width: '100%',
  },
  smallButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 80,
    height: 80,
    backgroundColor: '#fff',
    borderRadius: 40,
    margin: '3%',
    opacity: 0.6,
  },
  bigButton: {
    borderWidth: 1,
    borderColor: 'rgba(0,0,0,0.2)',
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 50,
    margin: '3%',
    opacity: 0.7,
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
});
