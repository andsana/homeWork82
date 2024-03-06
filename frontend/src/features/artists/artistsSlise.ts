import { createSlice } from '@reduxjs/toolkit';
import { fetchArtists } from './artistsThunks.ts';
import { Artist } from '../../types';
import { RootState } from '../../app/store.ts';
interface ArtistsState {
  items: Artist[];
  item: Artist | null;
  fetchLoading: boolean;
}

const initialState: ArtistsState = {
  items: [],
  item: null,
  fetchLoading: false,
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
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsLoading = (state: RootState) =>
  state.artists.fetchLoading;
export const selectArtistById = (state: RootState, artistId: string) =>
  state.artists.items.find((artist) => artist._id === artistId);
