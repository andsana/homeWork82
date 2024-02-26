import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApi from '../../axiosApi.ts';
import { Artist } from '../../types';
export const fetchArtists = createAsyncThunk('artists/fetchAll', async () => {
  const response = await axiosApi.get<Artist[]>('/artists');
  return response.data;
});
