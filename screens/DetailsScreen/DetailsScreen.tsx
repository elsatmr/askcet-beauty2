import React from 'react';
import CartButton from '../../components/CartButton/CartButton';
import { ScrollView, View, Text, StyleSheet } from 'react-native';
import { useAppSelector } from '../../redux/hooks';
import { Slider } from '@miblanchard/react-native-slider';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';

const DetailsScreen = () => {
  const itemState = useAppSelector((state) => state.ScanItemReducer.item);
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <AntDesign name="arrowleft" size={24} color="black" />
        <Text style={styles.headerStyle}>Details</Text>
      </View>
      <View>
        <Text style={styles.textStyles}>{itemState.details}</Text>
      </View>
      <View style={styles.sliderIconParentContainer}>
        <View style={styles.sliderIconContainer}>
          <View>
            <Slider />
          </View>
          <MaterialIcons name="record-voice-over" size={24} color="black" />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: '5%',
  },
  topPart: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    paddingTop: '15%',
    alignContent: 'center',
  },
  textStyles: {
    fontSize: 16,
    fontFamily: 'Optima-Medium',
    lineHeight: 25,
    marginTop: '5%',
  },
  headerStyle: {
    fontSize: 21,
    fontFamily: 'Optima-Medium',
  },
  sliderIconParentContainer: {
    height: '60%',
    justifyContent: 'flex-end',
  },
  sliderIconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  sliderContainer: {
    width: '50%',
  },
});

export default DetailsScreen;
