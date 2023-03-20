import { createReducer } from '@reduxjs/toolkit';
import {
  daltonizeImage,
  setOriginalImageBase64Action,
} from '../actions/ColorblindActions';

interface ColorBlindState {
  isLoading: boolean;
  convertedImage64: string;
}

export const initialColorBlindReducerState: ColorBlindState = {
  isLoading: false,
  convertedImage64: '',
};

export const ColorblindReducer = createReducer(
  initialColorBlindReducerState,
  (builder) => {
    builder.addCase(daltonizeImage.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(daltonizeImage.fulfilled, (state, action) => {
      state.isLoading = false;
      state.convertedImage64 = action.payload;
    });
    builder.addCase(setOriginalImageBase64Action, (state, action) => {
      state.convertedImage64 = action.payload;
    });
  }
);
