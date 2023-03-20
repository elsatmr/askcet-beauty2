import React from 'react';
import {
  SafeAreaView,
  ScrollView,
  Slider,
  TouchableOpacity,
  View,
  Text,
} from 'react-native';
import { styles } from './CartScreenStyles';
import { AntDesign } from '@expo/vector-icons';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changePage } from '../../redux/actions/AppActions';
import TtsButton from '../../components/TtsButton/TtsButton';
import { AppStateEnum } from '../../utils/enums';

const CartScreen = () => {
  const dispatch = useAppDispatch();
  const backTo = useAppSelector((state) => state.AppReducer.backTo);
  const handleBackButtonPress = () => {
    dispatch(changePage(backTo));
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
          <Text style={styles.headerStyle}>Cart</Text>
        </View>
        <ScrollView style={styles.textContainer}></ScrollView>
        <TouchableOpacity style={styles.sliderIconParentContainer}>
          <Text style={styles.textStyle}>Checkout</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default CartScreen;
