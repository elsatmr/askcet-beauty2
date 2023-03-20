import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import { IScanItem } from '../../utils/types';
import axios from 'axios';

export const fetchScannedItemSearch = createAsyncThunk(
  'ScanItemReducer/FetchScannedItemSearch',
  async (image64: string) => {
    try {
      const { data } = await axios.post(
        `http://192.168.0.8:8000/ocr-search`,
        { image: image64 },
        { headers: { 'Content-Type': 'application/json' }, timeout: 10000 }
      );
      const item = data.result;
      const res: IScanItem = {
        name: item.name,
        rating: item.rating,
        size: item.size,
        price: item.price,
        details: item.details_summarized,
        ingredients: '\u2022' + item.ingredients.split(',').join('\n\u2022'),
        howTo: item.how_to_use_summarized,
        image: item.image_url,
      };
      return [res];
    } catch (err) {
      throw new Error('unable to get data');
    }
  }
);

export const setScannedItemSearch = createAction<IScanItem>(
  'SET_SCANNED_ITEM_SEARCH_ACTION'
);

export const setScannerFeatureOn = createAction<boolean>(
  'SET_SCANNED_FEATURE_ON_ACTION'
);

export const setAudioSearchResult = createAction<IScanItem>(
  'SET_AUDIO_SEARCH_ACTION'
);

export const setAudioSearchLoading = createAction<boolean>(
  'SET_AUDIO_SEARCH_LOADING_ACTION'
);
