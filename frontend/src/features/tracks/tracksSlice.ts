import { Track } from '../../types';
import { fetchOneTrack, fetchTracks } from './tracksThunks.ts';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store.ts';

interface TracksState {
  items: Track[];
  item: Track | null;
  fetching: boolean;
  fetchOneLoading: boolean;
}

const initialState: TracksState = {
  items: [],
  item: null,
  fetching: false,
  fetchOneLoading: false,
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

    builder.addCase(fetchOneTrack.pending, (state) => {
      state.fetchOneLoading = true;
    });
    builder.addCase(fetchOneTrack.fulfilled, (state, { payload: track }) => {
      state.fetchOneLoading = false;
      state.item = track;
    });
    builder.addCase(fetchOneTrack.rejected, (state) => {
      state.fetchOneLoading = false;
    });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksFetching = (state: RootState) => state.tracks.fetching;
export const selectTrack = (state: RootState) => state.tracks.item;
export const selectTrackLoading = (state: RootState) => state.tracks.fetchOneLoading;
