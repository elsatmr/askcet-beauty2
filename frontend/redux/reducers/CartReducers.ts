import { createReducer } from '@reduxjs/toolkit';
import { IScanItem } from '../../utils/types';
import { addToCartAction, deleteFromCartAction } from '../actions/CartActions';

interface ICartState {
  cartItems: IScanItem[];
}

export const initialCartState: ICartState = {
  cartItems: [],
};

export const CartReducer = createReducer(initialCartState, (builder) => {
  builder.addCase(addToCartAction, (state, action) => {
    state.cartItems.push(action.payload);
  });
  builder.addCase(deleteFromCartAction, (state, action) => {
    state.cartItems = state.cartItems.filter((item) => item !== action.payload);
  });
});
