import React from 'react';
import { AppState } from 'react-native/types';
import { useAppSelector } from '../redux/hooks';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import ItemScreen from '../screens/ItemScreen/ItemScreen';
import { AppStateEnum } from '../utils/enums';
import { View } from 'react-native';

const AppLayout = () => {
  const appState: AppStateEnum = useAppSelector(
    (state) => state.AppReducer.page
  );
  return (
    <>
      {appState == AppStateEnum.CameraScreen && <CameraScreen />}
      {appState == AppStateEnum.ItemScreen && <ItemScreen />}
    </>
  );
};

export default AppLayout;
