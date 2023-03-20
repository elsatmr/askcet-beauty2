import { createReducer } from '@reduxjs/toolkit';
import { AppStateEnum } from '../../utils/enums';
import { changePage, setBackTo } from '../actions/AppActions';

interface AppState {
  page: AppStateEnum;
  daltonizedImage: string;
  backTo: AppStateEnum;
}

export const initialAppState: AppState = {
  page: AppStateEnum.CameraScreen,
  daltonizedImage: '',
  backTo: AppStateEnum.CameraScreen,
};

export const AppReducer = createReducer(initialAppState, (builder) => {
  builder.addCase(changePage, (state, action) => {
    state.page = action.payload.page;
  });
  builder.addCase(setBackTo, (state, action) => {
    state.backTo = action.payload;
  });
});
