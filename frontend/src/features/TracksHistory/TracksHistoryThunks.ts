import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RootState } from '../../app/store';
import { isAxiosError } from 'axios';
import { GlobalError, TrackHistory } from '../../types';

export const addTrackToHistory = createAsyncThunk<
  void,
  { trackId: string },
  { state: RootState; rejectValue: GlobalError }
>('tracksHistory/add', async ({ trackId }, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;

  if (!token) {
    return rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.post(
      '/track-history',
      { track: trackId },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const fetchTracksHistory = createAsyncThunk<
  TrackHistory[],
  void,
  { state: RootState; rejectValue: GlobalError }
>('tracksHistory/fetch', async (_, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;

  if (!token) {
    return rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    const response = await axiosApi.get('/track-history', {
      headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
  } catch (e) {
    if (isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});
