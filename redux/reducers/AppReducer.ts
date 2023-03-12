import { createReducer } from '@reduxjs/toolkit';
import { AppStateEnum } from '../../utils/enums';
import { changePage } from '../actions/AppActions';

interface AppState {
  page: AppStateEnum;
}

export const initialAppState: AppState = {
  page: AppStateEnum.CameraScreen,
};

export const AppReducer = createReducer(initialAppState, (builder) => {
  builder.addCase(changePage, (state, action) => {
    state.page = action.payload.page;
    console.log(state.page);
  });
});
