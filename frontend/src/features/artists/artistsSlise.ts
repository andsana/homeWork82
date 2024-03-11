import { createSlice } from '@reduxjs/toolkit';
import { deleteArtist, fetchArtists, toggleArtistPublishStatus } from './artistsThunks.ts';
import { Artist } from '../../types';
import { RootState } from '../../app/store.ts';

interface ArtistsState {
  items: Artist[];
  item: Artist | null;
  fetchLoading: boolean;
  deleteLoading: false | string;
  toggleArtistPublishStatusLoading: false | string;
}

const initialState: ArtistsState = {
  items: [],
  item: null,
  fetchLoading: false,
  deleteLoading: false,
  toggleArtistPublishStatusLoading: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.fetchLoading = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      })

      .addCase(deleteArtist.pending, (state, { meta }) => {
        state.deleteLoading = meta.arg;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.deleteLoading = false;
      })

      .addCase(toggleArtistPublishStatus.pending, (state, { meta }) => {
        state.toggleArtistPublishStatusLoading = meta.arg;
      })
      .addCase(toggleArtistPublishStatus.fulfilled, (state) => {
        state.toggleArtistPublishStatusLoading = false;
      })
      .addCase(toggleArtistPublishStatus.rejected, (state) => {
        state.toggleArtistPublishStatusLoading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsLoading = (state: RootState) => state.artists.fetchLoading;
export const selectArtistById = (state: RootState, artistId: string) =>
  state.artists.items.find((artist) => artist._id === artistId);
export const selectDeleteLoading = (state: RootState) => state.artists.deleteLoading;

export const selectToggleArtistPublishStatusLoading = (state: RootState) =>
  state.artists.toggleArtistPublishStatusLoading;
