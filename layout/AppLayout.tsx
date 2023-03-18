import React from 'react';
import { AppState } from 'react-native/types';
import { useAppSelector } from '../redux/hooks';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import ItemScreen from '../screens/ItemScreen/ItemScreen';
import { AppStateEnum } from '../utils/enums';
import { View } from 'react-native';
import DetailsScreen from '../screens/DetailsScreen/DetailsScreen';

const AppLayout = () => {
  const appState: AppStateEnum = useAppSelector(
    (state) => state.AppReducer.page
  );
  return (
    <>
      {appState == AppStateEnum.CameraScreen && <CameraScreen />}
      {appState == AppStateEnum.ItemScreen && <ItemScreen />}
      {appState == AppStateEnum.DetailsScreen && <DetailsScreen />}
    </>
  );
};

export default AppLayout;
