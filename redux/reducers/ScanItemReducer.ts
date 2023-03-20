import { createReducer } from '@reduxjs/toolkit';
import { IScanItem } from '../../utils/types';
import {
  fetchScannedItemSearch,
  setAudioSearchLoading,
  setAudioSearchResult,
  setScannedItemSearch,
  setScannerFeatureOn,
} from '../actions/ScanItemActions';

interface ScanItemState {
  isLoading: boolean;
  isFailed: boolean;
  items: IScanItem[];
  scannerFeatureOn: boolean;
  isAudioLoading: boolean;
}

export const initialScanItemState: ScanItemState = {
  isLoading: false,
  isFailed: false,
  items: [{} as IScanItem],
  scannerFeatureOn: false,
  isAudioLoading: false,
};

export const ScanItemReducer = createReducer(
  initialScanItemState,
  (builder) => {
    builder.addCase(fetchScannedItemSearch.pending, (state, action) => {
      state.isLoading = true;
      state.isFailed = false;
    });
    builder.addCase(fetchScannedItemSearch.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchScannedItemSearch.rejected, (state, action) => {
      state.isLoading = false;
      state.isFailed = true;
      state.scannerFeatureOn = false;
    });
    builder.addCase(setScannedItemSearch, (state, action) => {
      state.items = [];
      state.items.push(action.payload);
    });
    builder.addCase(setScannerFeatureOn, (state, action) => {
      state.scannerFeatureOn = action.payload;
    });
    builder.addCase(setAudioSearchResult, (state, action) => {
      state.items = [action.payload];
      state.isAudioLoading = false;
      state.scannerFeatureOn = true;
    });
    builder.addCase(setAudioSearchLoading, (state, action) => {
      state.isAudioLoading = true;
    });
  }
);
