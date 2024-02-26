import { createSlice } from '@reduxjs/toolkit';

import { RootState } from '../../app/store.ts';
import { fetchArtists } from './artistsThunks.ts';
import { Artist } from '../../types';
interface ArtistsState {
  items: Artist[];
  fetching: boolean;
}

const initialState: ArtistsState = {
  items: [],
  fetching: false,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.fetching = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetching = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;
export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsFetching = (state: RootState) =>
  state.artists.fetching;
export const selectArtistById = (state: RootState, artistId: string) =>
  state.artists.items.find((artist) => artist._id === artistId);
