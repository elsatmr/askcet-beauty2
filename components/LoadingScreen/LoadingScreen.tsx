import React from 'react';
import { ActivityIndicator, View, StyleSheet, Dimensions } from 'react-native';

const screenWidth = Dimensions.get('window').width;
const screenHeight = Dimensions.get('window').height;

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} />
    </View>
  );
};

export default LoadingScreen;

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    width: screenWidth,
    height: screenHeight,
    justifyContent: 'center',
    backgroundColor: 'rgba(7,10,1,0.7)',
  },
});
