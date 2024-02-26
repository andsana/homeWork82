import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { Album } from '../../types';

export const fetchAlbums = createAsyncThunk(
  'albums/fetchAll',
  async (artistId?: string) => {
    let url = '/albums';

    if (artistId) {
      url += `?artist=${artistId}`;
    }

    const response = await axiosApi.get<Album[]>(url);
    return response.data;
  },
);
