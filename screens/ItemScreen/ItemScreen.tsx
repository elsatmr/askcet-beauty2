import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
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

const screenWidth = Dimensions.get('window').width;

const ItemScreen = () => {
  const dispatch = useAppDispatch();
  const handleBackButtonPress = () => {
    dispatch(changePage(AppStateEnum.CameraScreen));
  };
  const item = useAppSelector((state) => state.ScanItemReducer.item);

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
          <CartButton />
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
                  source={require('../../assets/fondee.jpg')}
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
                  <View style={styles.itemDetailParentNav}>
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
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    margin: '5%',
    marginBottom: 0,
  },
  insidePadding: {
    flex: 1,
  },
  topPart: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: '3%',
    flex: 0.05,
  },
  mainPart: {
    flex: 1,
  },
  mainPartChild: {
    flex: 1,
    overflow: 'scroll',
    // backgroundColor: 'green',
  },
  itemNameRatingContainer: {
    marginTop: '5%',
    flexDirection: 'row',
  },
  ratingContainer: {
    flex: 0.2,
    flexDirection: 'row',
    paddingTop: '3%',
    justifyContent: 'flex-end',
  },
  itemNameContainer: {
    flex: 1,
  },
  textStyle: {
    fontFamily: 'Optima-Medium',
    fontSize: 20,
    flexWrap: 'wrap',
    lineHeight: 25,
  },
  itemDetailParentNav: {
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  itemDetailNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  lastItemDetailNav: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  priceSizeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '5%',
  },
  itemDetailNavContainer: {
    marginTop: '15%',
  },
  imageParentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  productSectionTextStyle: {
    paddingTop: '10%',
    paddingBottom: '10%',
    fontFamily: 'Optima-Medium',
    fontSize: 20,
    flexWrap: 'wrap',
    lineHeight: 25,
  },
  rightArrowContainer: {
    justifyContent: 'center',
  },
});

export default ItemScreen;
