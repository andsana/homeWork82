import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchAlbums } from './albumsThunks';
import { Album } from '../../types';

interface AlbumsState {
  items: Album[];
  fetching: boolean;
}

const initialState: AlbumsState = {
  items: [],
  fetching: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.fetching = false;
        state.items = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.fetching = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetching;
