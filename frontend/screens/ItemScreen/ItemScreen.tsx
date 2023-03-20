import React from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import CartButton from '../../components/CartButton/CartButton';
import { changePage } from '../../redux/actions/AppActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { AppStateEnum } from '../../utils/enums';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { styles } from './ItemScreenStyle';
import TtsButton from '../../components/TtsButton/TtsButton';

const ItemScreen = () => {
  const dispatch = useAppDispatch();
  const handleBackButtonPress = () => {
    dispatch(changePage(AppStateEnum.CameraScreen));
  };
  const item = useAppSelector((state) => state.ScanItemReducer.items)[0];

  const handleProductSectionPress = (pageToGo: AppStateEnum) => {
    dispatch(changePage(pageToGo));
  };

  const productSections = [
    { Details: AppStateEnum.DetailsScreen },
    { 'How To Use': AppStateEnum.HowToUseScreen },
    { Ingredients: AppStateEnum.IngredientsScreen },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.insidePadding}>
        <View style={styles.topPart}>
          <BackButton onBackButtonPressed={handleBackButtonPress} />
          <CartButton backTo={AppStateEnum.ItemScreen} />
        </View>
        <ScrollView style={styles.mainPart}>
          <View style={styles.mainPartChild}>
            <View style={styles.imageParentContainer}>
              <View
                style={{
                  width: '75%',
                  flexDirection: 'row',
                  justifyContent: 'center',
                }}
              >
                <Image
                  style={{
                    flex: 1,
                    width: undefined,
                    height: undefined,
                    aspectRatio: 1,
                    borderRadius: 10,
                  }}
                  source={{
                    uri: item.image,
                  }}
                />
              </View>
            </View>
            <View style={styles.itemNameRatingContainer}>
              <View style={styles.itemNameContainer}>
                <Text style={styles.textStyle}>{item.name}</Text>
              </View>
              <View style={styles.ratingContainer}>
                <Text style={styles.textStyle}>{item.rating} </Text>
                <MaterialIcons name="star-rate" size={18} color="black" />
              </View>
            </View>
            <View style={styles.priceSizeContainer}>
              <Text style={styles.textStyle}>{item.size}</Text>
              <Text style={styles.textStyle}>
                {'$'}
                {item.price}
              </Text>
            </View>
            <View style={styles.itemDetailNavContainer}>
              {productSections.map((item: object) => {
                return (
                  <View
                    style={styles.itemDetailParentNav}
                    key={Object.keys(item)[0]}
                  >
                    <TouchableOpacity
                      style={styles.itemDetailNav}
                      onPress={() => {
                        handleProductSectionPress(Object.values(item)[0]);
                      }}
                    >
                      <Text style={styles.productSectionTextStyle}>
                        {Object.keys(item)[0]}
                      </Text>
                      <View style={styles.rightArrowContainer}>
                        <AntDesign name="arrowright" size={18} color="black" />
                      </View>
                    </TouchableOpacity>
                  </View>
                );
              })}
            </View>
          </View>
        </ScrollView>
        <View style={styles.footer}>
          <TtsButton
            mainText={
              'Item Name: ' +
              item.name +
              ', Item Rating: ' +
              item.rating +
              ', Item Price: ' +
              item.price +
              'dollars, Item Size: ' +
              item.size
            }
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default ItemScreen;
