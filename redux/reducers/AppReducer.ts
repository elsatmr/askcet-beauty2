import { createReducer } from '@reduxjs/toolkit';
import { AppStateEnum } from '../../utils/enums';
import { changePage } from '../actions/AppActions';

interface AppState {
  page: AppStateEnum;
  daltonizedImage: string;
}

export const initialAppState: AppState = {
  page: AppStateEnum.CameraScreen,
  daltonizedImage: '',
};

export const AppReducer = createReducer(initialAppState, (builder) => {
  builder.addCase(changePage, (state, action) => {
    state.page = action.payload.page;
  });
});
