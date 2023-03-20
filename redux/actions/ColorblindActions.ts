import { createAction, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const daltonizeImage = createAsyncThunk<
  string,
  {
    image64: string;
    type: string;
  }
>('AppReducer/DaltonizeImage', async ({ image64, type }) => {
  const { data } = await axios.post(
    `http://192.168.0.8:8000/daltonize/${type}`,
    { image: image64 },
    { headers: { 'Content-Type': 'application/json' } }
  );
  return data;
});

export const setOriginalImageBase64Action = createAction<string>(
  'SET_ORIGINAL_IMAGE_BASE64_ACTION'
);
