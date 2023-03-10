import React from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather, Entypo } from '@expo/vector-icons';
import { FontAwesome } from '@expo/vector-icons';

const SearchBar = () => {
  const [searchPhrase, setSearchPhrase] = React.useState<string>('');
  return (
    <View style={styles.searchBarContainer}>
      <View style={styles.searchBar}>
        <Feather
          name="search"
          size={18}
          color="black"
          style={styles.searchIcon}
        />
        <TextInput
          style={styles.input}
          placeholder="Search"
          value={searchPhrase}
          onChangeText={setSearchPhrase}
          // onFocus={() => {
          //   setClicked(true);
          // }}
        />
      </View>
      <TouchableOpacity style={styles.voiceSearch}>
        <FontAwesome name="microphone" size={18} color="black" />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  searchBarContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    width: '85%',
    position: 'absolute',
    top: '10%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    borderRadius: 40,
    borderColor: 'white',
    borderWidth: 1,
  },
  searchBar: {
    flexDirection: 'row',
  },
  voiceSearch: {
    borderWidth: 1,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    width: 30,
    height: 30,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderRadius: 40,
    margin: '3%',
  },
  searchIcon: {
    marginLeft: '15%',
  },
  input: {
    marginLeft: '15%',
  },
});

export default SearchBar;
