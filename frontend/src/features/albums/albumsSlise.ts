import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { createAlbum, deleteAlbum, fetchAlbums, toggleAlbumPublishStatus } from './albumsThunks';
import { Album } from '../../types';

interface AlbumsState {
  items: Album[];
  fetching: boolean;
  createAlbumLoading: boolean;
  deleteAlbumLoading: false | string;
  toggleAlbumPublishStatusLoading: false | string;
}

const initialState: AlbumsState = {
  items: [],
  fetching: false,
  createAlbumLoading: false,
  deleteAlbumLoading: false,
  toggleAlbumPublishStatusLoading: false,
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
      })

      .addCase(deleteAlbum.pending, (state, { meta }) => {
        state.deleteAlbumLoading = meta.arg;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deleteAlbumLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.deleteAlbumLoading = false;
      })

      .addCase(toggleAlbumPublishStatus.pending, (state, { meta }) => {
        state.toggleAlbumPublishStatusLoading = meta.arg;
      })
      .addCase(toggleAlbumPublishStatus.fulfilled, (state) => {
        state.toggleAlbumPublishStatusLoading = false;
      })
      .addCase(toggleAlbumPublishStatus.rejected, (state) => {
        state.toggleAlbumPublishStatusLoading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsFetching = (state: RootState) => state.albums.fetching;
export const selectAlbum = (state: RootState, albumId: string) =>
  state.albums.items.find((album) => album._id === albumId);
export const selectAlbumCreating = (state: RootState) => state.albums.createAlbumLoading;
export const selectDeleteAlbumLoading = (state: RootState) => state.albums.deleteAlbumLoading;

export const selectToggleAlbumPublishStatusLoading = (state: RootState) =>
  state.albums.toggleAlbumPublishStatusLoading;
