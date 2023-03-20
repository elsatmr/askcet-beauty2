import React from 'react';
import {
  ScrollView,
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import { useAppDispatch } from '../../redux/hooks';
import { Slider } from '@miblanchard/react-native-slider';
import { AntDesign } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { changePage } from '../../redux/actions/AppActions';
import { AppStateEnum } from '../../utils/enums';
import * as Speech from 'expo-speech';
import { styles } from './ProductSectionStyle';
import TtsButton from '../../components/TtsButton/TtsButton';

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
            <TtsButton mainText={mainText} />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ProductSectionScreen;
