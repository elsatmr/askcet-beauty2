import { createAction } from '@reduxjs/toolkit';
import { AppStateEnum } from '../../utils/enums';

export const changePage = createAction('CHANGE_PAGE', (page: AppStateEnum) => {
  return {
    payload: {
      page: page,
    },
  };
});

export const setBackTo = createAction<AppStateEnum>('SET_BACK_TO_ACTION');
