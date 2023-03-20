import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IScanItem } from '../../utils/types';

export const addToCartAction = createAction<IScanItem>('ADD_TO_CART_ACTION');

export const deleteFromCartAction = createAction<IScanItem>(
  'DELETE_FROM_CART_ACTION'
);
