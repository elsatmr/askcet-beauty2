import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import {
  fetchScannedItemSearch,
  setScannedItemSearch,
} from '../../redux/actions/ScanItemActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { changePage } from '../../redux/actions/AppActions';
import { AppStateEnum } from '../../utils/enums';
import { IScanItem } from '../../utils/types';

interface Props {
  b64: string;
  item: IScanItem;
}

const screenWidth = Dimensions.get('window').width;

const ScannerBottomWindow = ({ b64, item }: Props) => {
  const dispatch = useAppDispatch();
  const handleArrowPress = () => {
    dispatch(changePage(AppStateEnum.ItemScreen));
    dispatch(setScannedItemSearch(item));
  };
  return (
    <TouchableOpacity style={styles.container} onPress={handleArrowPress}>
      <View
        style={{
          height: '100%',
          backgroundColor: 'rgba(255,255,255,0.6)',
          borderBottomLeftRadius: 20,
          borderTopLeftRadius: 20,
        }}
      >
        <Image
          resizeMode="contain"
          style={{
            flex: 1,
            width: undefined,
            height: undefined,
            aspectRatio: 1,
            borderRadius: 10,
          }}
          source={{ uri: item.image }}
        />
      </View>
      <View style={styles.textParentContainer}>
        <View style={styles.textChildContainer}>
          <View>
            <Text
              style={{
                fontFamily: 'Optima-Medium',
                flexWrap: 'wrap',
                fontSize: 16,
              }}
            >
              {item.name}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={{ fontFamily: 'Optima-Medium', fontSize: 16 }}>
              {item.rating}
            </Text>
            <MaterialIcons name="star-rate" size={14} color="black" />
          </View>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'flex-end',
              paddingRight: '5%',
            }}
          >
            <AntDesign name="arrowright" size={18} color="black" />
          </View>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
  },
  textParentContainer: {
    height: '100%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
  },
  textChildContainer: {
    // backgroundColor: 'red',
    marginLeft: '5%',
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingTop: '3%',
  },
});

export default ScannerBottomWindow;
