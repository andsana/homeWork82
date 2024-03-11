import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi.ts';
import { Artist, ArtistMutation, GlobalError } from '../../types';
import { RootState } from '../../app/store.ts';
import axios, { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<
  Artist[],
  void,
  { state: RootState; rejectValue: GlobalError }
>('artists/fetchAll', async (_, { getState, rejectWithValue }) => {
  const token = getState().users.user?.token;

  if (!token) {
    return rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    const response = await axiosApi.get('/artists', {
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

export const createArtist = createAsyncThunk<null, ArtistMutation>(
  'artists/create',
  async (artistMutation, { getState, rejectWithValue }) => {
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
      const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
      keys.forEach((key) => {
        const value = artistMutation[key];

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

      const response = await axiosApi.post('/artists', formData, config);
      return response.data;
    } catch (e) {
      if (isAxiosError(e) && e.response) {
        return rejectWithValue(e.response.data);
      }
      throw e;
    }
  },
);

// export const updateArtist = createAsyncThunk<void, UpdateArtistArg>(
//   'artists/update',
//   async ({ artistId, artistMutation }) => {
//     const formData = new FormData();
//     const keys = Object.keys(artistMutation) as (keyof ArtistMutation)[];
//     keys.forEach((key) => {
//       const value = artistMutation[key];
//
//       if (value !== null) {
//         if (typeof value === 'boolean') {
//           formData.append(key, value ? 'true' : 'false');
//         } else {
//           if (typeof value !== 'boolean') {
//             formData.append(key, value);
//           }
//         }
//       }
//     });
//
//     return axiosApi.patch(`/artists/${artistId}`, formData);
//   },
// );

export const deleteArtist = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: GlobalError }
>('artists/delete', async (artistId, thunkAPI) => {
  const token = thunkAPI.getState().users.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.delete(`/artists/${artistId}`, {
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

export const toggleArtistPublishStatus = createAsyncThunk<
  void,
  string,
  { state: RootState; rejectValue: GlobalError }
>('artists/togglePublishStatus', async (artistId, thunkAPI) => {
  const token = thunkAPI.getState().users.user?.token;

  if (!token) {
    return thunkAPI.rejectWithValue({ error: 'User is not authenticated' });
  }

  try {
    await axiosApi.patch(
      `/artists/${artistId}/togglePublished`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    thunkAPI.dispatch(fetchArtists());
  } catch (e) {
    if (axios.isAxiosError(e) && e.response) {
      return thunkAPI.rejectWithValue(e.response.data);
    }
    throw e;
  }
});
