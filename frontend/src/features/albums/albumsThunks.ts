import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album, AlbumMutation } from '../../types';
import { RootState } from '../../app/store.ts';
import { isAxiosError } from 'axios';

export const fetchAlbums = createAsyncThunk('albums/fetchAll', async (artisId?: string) => {
  let url = '/albums';

  if (artisId) {
    url += `?artis=${artisId}`;
  }

  const response = await axiosApi.get<Album[]>(url);
  return response.data;
});

export const createAlbum = createAsyncThunk<null, AlbumMutation>(
  'albums/create',
  async (albumMutation, { getState, rejectWithValue }) => {
    const token = (getState() as RootState).users.user?.token;

    if (!token) {
      return rejectWithValue({ error: 'User is not authenticated' });
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      const formData = new FormData();
      const keys = Object.keys(albumMutation) as (keyof AlbumMutation)[];
      keys.forEach((key) => {
        const value = albumMutation[key];

        if (value !== null) {
          if (key === 'isPublished') {
            formData.append(key, value ? 'true' : 'false');
          } else {
            if (typeof value !== 'boolean') {
              formData.append(key, value);
            }
          }
        }
        console.log('formdata', formData);
      });

      const response = await axiosApi.post('/albums', formData, config);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);
