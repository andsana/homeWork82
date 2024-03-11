import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { GlobalError, Track } from '../../types';
import { RootState } from '../../app/store.ts';
import axios from 'axios';

export const fetchTracks = createAsyncThunk<
  Track[],
  string | undefined,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>('tracks/fetchAll', async (albumId, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;

  if (!token) {
    return rejectWithValue({ error: 'User is not authenticated' });
  }

  let url = '/tracks';

  if (albumId) {
    url += `?album=${albumId}`;
  }

  try {
    const response = await axiosApi.get<Track[]>(url, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const fetchOneTrack = createAsyncThunk<Track, string>(
  'tracks/fetchOneTrack',
  async (trackId) => {
    const response = await axiosApi.get<Track | null>(`/tracks/${trackId}`); // возвращает либо Track либо null
    const track = response.data;

    if (track === null) {
      throw new Error('Not found');
    }
    return track;
  },
);
