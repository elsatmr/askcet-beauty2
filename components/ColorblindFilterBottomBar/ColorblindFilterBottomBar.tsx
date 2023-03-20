import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import {
  daltonizeImage,
  setOriginalImageBase64Action,
} from '../../redux/actions/ColorblindActions';
import { ColorBlindType } from '../../utils/enums';

interface Props {
  ogImage64: string;
}

const ColorblindFilterBottomBar = ({ ogImage64 }: Props) => {
  const dispatch = useAppDispatch();

  const dispatchDeuteranopia = () => {
    dispatch(
      daltonizeImage({ image64: ogImage64, type: ColorBlindType.Deuteranopia })
    );
  };

  const dispatchProtanopia = () => {
    dispatch(
      daltonizeImage({ image64: ogImage64, type: ColorBlindType.Protanopia })
    );
  };

  const dispatchTritanopia = () => {
    dispatch(
      daltonizeImage({ image64: ogImage64, type: ColorBlindType.Tritanopia })
    );
  };

  const resetOriginal = () => {
    dispatch(setOriginalImageBase64Action(ogImage64));
  };

  return (
    <View style={styles.colorBlindFilterContainer}>
      <TouchableOpacity onPress={resetOriginal}>
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
      <TouchableOpacity onPress={dispatchProtanopia}>
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
      <TouchableOpacity onPress={dispatchDeuteranopia}>
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
      <TouchableOpacity onPress={dispatchTritanopia}>
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
  );
};

const styles = StyleSheet.create({
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
});

export default ColorblindFilterBottomBar;
