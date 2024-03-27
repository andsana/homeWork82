import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album, AlbumMutation, GlobalError } from '../../types';
import { RootState } from '../../app/store.ts';
import axios, { isAxiosError } from 'axios';
import { fetchArtists } from '../artists/artistsThunks.ts';

export const fetchAlbums = createAsyncThunk<
  Album[],
  string | undefined,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>('albums/fetchAll', async (artistId, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;
  let headers = {};

  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }

  let url = '/albums';
  if (artistId) {
    url += `?artist=${artistId}`;
  }

  try {
    const response = await axiosApi.get<Album[]>(url, { headers });

    return response.data;
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const fetchOneAlbum = createAsyncThunk<
  Album,
  string,
  {
    state: RootState;
  }
>('albums/fetchOneAlbum', async (albumId, { getState }) => {
  const token = getState().users.user?.token;
  let headers = {};

  if (token) {
    headers = { Authorization: `Bearer ${token}` };
  }

  const response = await axiosApi.get<Album | null>(`/albums/${albumId}`, { headers });
  const album = response.data;

  if (album === null) {
    throw new Error('Not found');
  }
  return album;
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

export const deleteAlbum = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>('albums/delete', async (albumsId, thunkAPI) => {
  const token = thunkAPI.getState().users.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.delete(`/albums/${albumsId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    thunkAPI.dispatch(fetchArtists());
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
    throw e;
  }
});

export const toggleAlbumPublishStatus = createAsyncThunk<
  void,
  string,
  {
    state: RootState;
    rejectValue: GlobalError;
  }
>('albums/togglePublishStatus', async (albumsId, thunkAPI) => {
  const token = thunkAPI.getState().users.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.patch(
      `/albums/${albumsId}/togglePublished`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    thunkAPI.dispatch(fetchAlbums());
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
    throw e;
  }
});
