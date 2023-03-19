import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IScanItem } from '../../utils/types';

export const fetchScannedItemSearch = createAsyncThunk(
  'ScanItemReducer/FetchScannedItemSearch',
  async () => {
    const item: IScanItem = {
      name: 'Double Wear Stay-in-Place Foundation',
      rating: 4.5,
      size: '1 oz/ 30 mL',
      price: 43.0,
      details:
        'This 24-hour liquid foundation provides a matte finish and full coverage.' +
        "It's suitable for combination and oily skin and free of fragrance. It comes in over 55 shades with cool- neutral- " +
        'and warm undertones to suit all skin tones. It is oil-free and oil-controlling- and lasts in hot and humid weather.' +
        'It is an Allure Best of Beauty award winner.',
      ingredients: '',
      howTo: '',
    };
    return item;
  }
);
