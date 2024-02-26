import { Track } from '../../types';
import { fetchTracks } from './tracksThunks.ts';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface TracksState {
  items: Track[];
  fetching: boolean;
}

const initialState: TracksState = {
  items: [],
  fetching: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetching = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetching = false;
        state.items = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetching = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksFetching = (state: RootState) => state.tracks.fetching;
