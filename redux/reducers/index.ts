import { AppReducer } from './AppReducer';
import { ColorblindReducer } from './ColorblindReducers';
import { ScanItemReducer } from './ScanItemReducer';

export const rootReducer = {
  reducer: {
    AppReducer,
    ScanItemReducer,
    ColorblindReducer,
  },
};
