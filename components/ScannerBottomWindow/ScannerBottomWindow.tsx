import React, { useEffect } from 'react';
import {
  View,
  Image,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import { fetchScannedItemSearch } from '../../redux/actions/ScanItemActions';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { MaterialIcons } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { changePage } from '../../redux/actions/AppActions';
import { AppStateEnum } from '../../utils/enums';

interface Props {
  b64: string;
}

const screenWidth = Dimensions.get('window').width;

const ScannerBottomWindow = ({ b64 }: Props) => {
  const dispatch = useAppDispatch();
  const scannedItemState = useAppSelector(
    (state) => state.ScanItemReducer.item
  );
  useEffect(() => {
    dispatch(fetchScannedItemSearch());
  }, []);

  const handleArrowPress = () => {
    dispatch(changePage(AppStateEnum.ItemScreen));
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleArrowPress}>
      <View style={{ height: '100%' }}>
        <Image
          resizeMode="contain"
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
      <View style={styles.textParentContainer}>
        <View style={styles.textChildContainer}>
          <View>
            <Text style={{ fontFamily: 'Optima-Medium', flexWrap: 'wrap' }}>
              {scannedItemState.name}
            </Text>
          </View>
          <View style={styles.ratingContainer}>
            <Text style={{ fontFamily: 'Optima-Medium' }}>
              {scannedItemState.rating}{' '}
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
    flexDirection: 'row',
    position: 'absolute',
    bottom: '13%',
    height: '15%',
    alignItems: 'center',
    width: screenWidth * 0.8,
  },
  textParentContainer: {
    height: '80%',
    backgroundColor: 'rgba(255,255,255,0.6)',
    justifyContent: 'center',
    borderBottomRightRadius: 20,
    borderTopRightRadius: 20,
    flex: 1,
    padding: '3%',
  },
  textChildContainer: {
    // backgroundColor: 'red',
  },
  ratingContainer: {
    flexDirection: 'row',
    paddingTop: '3%',
  },
});

export default ScannerBottomWindow;
