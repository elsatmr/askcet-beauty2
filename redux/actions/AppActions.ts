import { createAction } from '@reduxjs/toolkit';
import { AppStateEnum } from '../../utils/enums';

export const changePage = createAction('CHANGE_PAGE', (page: AppStateEnum) => {
  return {
    payload: {
      page: page,
    },
  };
});
