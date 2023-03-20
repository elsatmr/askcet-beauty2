import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View, StyleSheet } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { changePage, setBackTo } from '../../redux/actions/AppActions';
import { AppStateEnum } from '../../utils/enums';

interface Props {
  backTo: AppStateEnum;
}

const CartButton = ({ backTo }: Props) => {
  const dispatch = useAppDispatch();
  const onPress = () => {
    dispatch(changePage(AppStateEnum.CartScreen));
    dispatch(setBackTo(backTo));
  };
  return (
    <View>
      <TouchableOpacity style={styles.buttonStyle} onPress={onPress}>
        <Feather name="shopping-bag" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;

const styles = StyleSheet.create({
  buttonStyle: {},
});
