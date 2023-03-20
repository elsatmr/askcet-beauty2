import React from 'react';
import { AppState } from 'react-native/types';
import { useAppSelector } from '../redux/hooks';
import CameraScreen from '../screens/CameraScreen/CameraScreen';
import ItemScreen from '../screens/ItemScreen/ItemScreen';
import { AppStateEnum } from '../utils/enums';
import { View } from 'react-native';
import DetailsScreen from '../screens/ProductSectionScreen/ProductSectionScreen';
import ProductSectionScreen from '../screens/ProductSectionScreen/ProductSectionScreen';

const AppLayout = () => {
  const appState: AppStateEnum = useAppSelector(
    (state) => state.AppReducer.page
  );
  const itemState = useAppSelector((state) => state.ScanItemReducer.items[0]);
  return (
    <>
      {appState == AppStateEnum.CameraScreen && <CameraScreen />}
      {appState == AppStateEnum.ItemScreen && <ItemScreen />}
      {appState == AppStateEnum.DetailsScreen && (
        <ProductSectionScreen
          headerText={'Details'}
          mainText={itemState.details}
        />
      )}
      {appState == AppStateEnum.HowToUseScreen && (
        <ProductSectionScreen
          headerText={'How To Use'}
          mainText={itemState.howTo}
        />
      )}
      {appState == AppStateEnum.IngredientsScreen && (
        <ProductSectionScreen
          headerText={'Ingredients'}
          mainText={itemState.ingredients}
        />
      )}
    </>
  );
};

export default AppLayout;
