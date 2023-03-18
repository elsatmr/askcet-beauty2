import React from 'react';
import {
  View,
  StyleSheet,
  Image,
  Text,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import BackButton from '../../components/BackButton/BackButton';
import CartButton from '../../components/CartButton/CartButton';
import SearchBar from '../../components/SearchBar/SearchBar';
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

  const handleDetailsViewPress = () => {
    dispatch(changePage(AppStateEnum.DetailsScreen));
  };
  return (
    <View style={styles.container}>
      <View style={styles.topPart}>
        <BackButton onBackButtonPressed={handleBackButtonPress} />
        <CartButton />
      </View>
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
      {/* <View
        style={{
          width: '100%',
          flexDirection: 'row',
          aspectRatio: 0.5,
          height: '50%',
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
          }}
          source={require('../../assets/mock-palette.png')}
        />
      </View> */}
      <View style={styles.itemDetailNavContainer}>
        <View style={styles.itemDetailParentNav}>
          <TouchableOpacity
            style={styles.itemDetailNav}
            onPress={handleDetailsViewPress}
          >
            <Text style={styles.textStyle}>Details</Text>
            <AntDesign name="arrowright" size={18} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.itemDetailParentNav}>
          <View style={styles.itemDetailNav}>
            <Text style={styles.textStyle}>How To Use</Text>
            <AntDesign name="arrowright" size={18} color="black" />
          </View>
        </View>
        <View style={styles.lastItemDetailParentNav}>
          <View style={styles.lastItemDetailNav}>
            <Text style={styles.textStyle}>Ingredients</Text>
            <AntDesign name="arrowright" size={18} color="black" />
          </View>
        </View>
      </View>
      <TouchableOpacity style={styles.addBagButton}>
        <Text style={styles.addBagText}>Add To Bag</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: '5%',
  },
  topPart: {
    justifyContent: 'space-between',
    flexDirection: 'row',
    height: '10%',
    top: '10%',
  },
  itemNameRatingContainer: {
    marginTop: '5%',
    flexDirection: 'row',
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingTop: '3%',
    width: screenWidth * 0.2,
  },
  itemNameContainer: {
    width: screenWidth * 0.8,
  },
  textStyle: {
    fontFamily: 'Optima-Medium',
    fontSize: 20,
    flexWrap: 'wrap',
  },
  itemDetailParentNav: {
    height: '30%',
    justifyContent: 'center',
    borderTopWidth: 1,
  },
  lastItemDetailParentNav: {
    height: '30%',
    justifyContent: 'center',
    borderBottomWidth: 1,
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
  addBagButton: {
    justifyContent: 'center',
    color: 'white',
    backgroundColor: 'black',
    height: '5%',
    borderRadius: 10,
  },
  addBagText: {
    color: 'white',
    fontFamily: 'Helvetica',
    fontSize: 16,
    flexWrap: 'wrap',
    textAlign: 'center',
  },
  itemDetailNavContainer: {
    height: '30%',
    marginTop: '15%',
    // flex: 1,
  },
  imageParentContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

export default ItemScreen;
