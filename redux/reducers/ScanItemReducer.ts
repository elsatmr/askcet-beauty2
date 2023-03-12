import { createReducer } from '@reduxjs/toolkit';
import { IScanItem } from '../../utils/types';
import { fetchScannedItemSearch } from '../actions/ScanItemActions';

interface ScanItemState {
  isLoading: boolean;
  item: IScanItem;
}

export const initialScanItemState: ScanItemState = {
  isLoading: false,
  item: {} as IScanItem,
};

export const ScanItemReducer = createReducer(
  initialScanItemState,
  (builder) => {
    builder.addCase(fetchScannedItemSearch.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchScannedItemSearch.fulfilled, (state, action) => {
      state.item = action.payload;
      state.isLoading = false;
    });
  }
);
