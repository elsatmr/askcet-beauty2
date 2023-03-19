import React from 'react';
import CartButton from '../../components/CartButton/CartButton';
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { Slider } from '@miblanchard/react-native-slider';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { changePage } from '../../redux/actions/AppActions';
import { AppStateEnum } from '../../utils/enums';
import * as Speech from 'expo-speech';

interface Props {
  headerText: string;
  mainText: string;
}

const ProductSectionScreen = ({ headerText, mainText }: Props) => {
  const dispatch = useAppDispatch();
  const handleBackButtonPress = () => {
    dispatch(changePage(AppStateEnum.ItemScreen));
  };
  const [fontSize, setFontSize] = React.useState<number>(16);
  const handleSliderChange = (newValue: number[]) => {
    setFontSize(newValue[0]);
  };

  const handleTtsPress = () => {
    Speech.speak(mainText);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insidePadding}>
        <View style={styles.topPart}>
          <AntDesign
            name="arrowleft"
            size={24}
            color="black"
            onPress={handleBackButtonPress}
          />
          <Text style={styles.headerStyle}>{headerText}</Text>
        </View>
        <ScrollView style={styles.textContainer}>
          <Text
            style={{
              fontSize: fontSize,
              fontFamily: 'Optima-Medium',
              lineHeight: 30,
              marginTop: '5%',
              overflow: 'scroll',
            }}
          >
            {mainText}
          </Text>
        </ScrollView>
        <View style={styles.sliderIconParentContainer}>
          <View style={styles.sliderIconContainer}>
            <View style={styles.sliderContainer}>
              <Slider
                value={fontSize}
                step={1}
                minimumValue={16}
                maximumValue={32}
                onValueChange={(newValue) => {
                  handleSliderChange(newValue);
                }}
              />
            </View>
            <View style={styles.voiceOverContainer}>
              <TouchableOpacity
                style={styles.voiceOverButton}
                onPress={handleTtsPress}
              >
                <MaterialIcons
                  name="record-voice-over"
                  size={24}
                  color="white"
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    margin: '5%',
  },
  insidePadding: {
    flex: 1,
  },
  topPart: {
    // backgroundColor: 'red',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: '3%',
    flex: 0.05,
  },
  textContainer: {
    // backgroundColor: 'green',
    flex: 1,
  },
  headerStyle: {
    fontSize: 21,
    fontFamily: 'Optima-Medium',
  },
  sliderIconParentContainer: {
    flex: 0.12,
    // backgroundColor: 'yellow',
    // justifyContent: 'flex-end',
  },
  sliderIconContainer: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    // backgroundColor: 'yellow',
  },
  sliderContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  voiceOverContainer: {
    // backgroundColor: 'red',
    flex: 1,
    justifyContent: 'flex-end',
    flexDirection: 'row',
  },
  voiceOverButton: {
    borderWidth: 1,
    borderColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
    width: 75,
    height: 75,
    backgroundColor: 'black',
    borderRadius: 50,
    margin: '3%',
  },
});

export default ProductSectionScreen;
