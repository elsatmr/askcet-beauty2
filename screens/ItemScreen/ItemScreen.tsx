import React from 'react';
import { View, StyleSheet } from 'react-native';
import SearchBar from '../../components/SearchBar/SearchBar';

const ItemScreen = () => {
  return (
    <View style={styles.container}>
      <SearchBar />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'row',
    backgroundColor: 'red',
  },
});

export default ItemScreen;
