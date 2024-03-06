import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosApi from '../../axiosApi.ts';
import { Artist } from '../../types';
export const fetchArtists = createAsyncThunk('artists/fetchAll', async () => {
  const response = await axiosApi.get<Artist[]>('/artists');
  return response.data;
});

export const fetchOneArtist = createAsyncThunk<Artist, string>(
  'artists/fetchOneArtist',
  async (artistId) => {
    const response = await axiosApi.get<Artist | null>(`/artists/${artistId}`);
    const artist = response.data;

    if (artist === null) {
      throw new Error('Not found');
    }
    return artist;
  },
);
