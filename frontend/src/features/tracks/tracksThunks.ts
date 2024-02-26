import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Track } from '../../types';

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
