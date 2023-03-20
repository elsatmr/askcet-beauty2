import { createReducer } from '@reduxjs/toolkit';
import { IScanItem } from '../../utils/types';
import {
  fetchScannedItemSearch,
  setScannedItemSearch,
} from '../actions/ScanItemActions';

interface ScanItemState {
  isLoading: boolean;
  isFailed: boolean;
  items: IScanItem[];
}

export const initialScanItemState: ScanItemState = {
  isLoading: false,
  isFailed: false,
  items: [{} as IScanItem],
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
    });
    builder.addCase(setScannedItemSearch, (state, action) => {
      state.items = [];
      state.items.push(action.payload);
    });
  }
);
