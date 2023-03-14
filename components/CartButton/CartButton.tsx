import React from 'react';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity, View } from 'react-native';

interface Props {
  buttonStyle?: object;
}

const CartButton = ({ buttonStyle }: Props) => {
  return (
    <View>
      <TouchableOpacity style={buttonStyle}>
        <Feather name="shopping-bag" size={24} color="black" />
      </TouchableOpacity>
    </View>
  );
};

export default CartButton;
