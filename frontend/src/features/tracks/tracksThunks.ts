import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../../../../Projects/music-app/frontend/src/axiosApi';
import { Track } from '../../../../../Projects/music-app/frontend/src/types';

export const fetchTracks = createAsyncThunk(
  'tracks/fetchAll',
  async (albumId?: string) => {
    let url = '/tracks';

    if (albumId) {
      url += `?album=${albumId}`;
    }

    const response = await axiosApi.get<Track[]>(url);
    return response.data;
  },
);
