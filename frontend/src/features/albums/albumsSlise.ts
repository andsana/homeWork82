import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createAlbum, fetchAlbums } from './albumsThunks';
import { Album } from '../../types';

interface AlbumsState {
  items: Album[];
  fetching: boolean;
  createAlbumLoading: boolean;
}

const initialState: AlbumsState = {
  items: [],
  fetching: false,
  createAlbumLoading: false,
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
      })

      .addCase(createAlbum.pending, (state) => {
        state.createAlbumLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createAlbumLoading = false;
      })
      .addCase(createAlbum.rejected, (state) => {
        state.createAlbumLoading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetching;
export const selectAlbum = (state: RootState, albumId: string) =>
  state.albums.items.find((album) => album._id === albumId);
export const selectAlbumCreating = (state: RootState) => state.albums.createAlbumLoading;
