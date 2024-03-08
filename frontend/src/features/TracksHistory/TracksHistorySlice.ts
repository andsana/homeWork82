import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, TrackHistory } from '../../types';
import { addTrackToHistory, fetchTracksHistory } from './TracksHistoryThunks.ts';
import { RootState } from '../../app/store.ts';

interface TracksState {
  items: TrackHistory[];
  addingTrackId: string | null;
  addTrackToHistoryLoading: boolean;
  addTrackToHistoryError: GlobalError | null;
  trackHistoryFetching: boolean;
  fetchTrackHistoryError: GlobalError | null;
}

const initialState: TracksState = {
  items: [],
  addingTrackId: null,
  addTrackToHistoryLoading: false,
  addTrackToHistoryError: null,
  trackHistoryFetching: false,
  fetchTrackHistoryError: null,
};

export const tracksHistorySlice = createSlice({
  name: 'tracksHistory',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addTrackToHistory.pending, (state, action) => {
        state.addingTrackId = action.meta.arg.trackId;
        state.addTrackToHistoryError = null;
        state.addTrackToHistoryLoading = true;
      })
      .addCase(addTrackToHistory.fulfilled, (state) => {
        state.addingTrackId = null;
        state.addTrackToHistoryLoading = false;
      })
      .addCase(addTrackToHistory.rejected, (state, { payload: error }) => {
        state.addingTrackId = null;
        state.addTrackToHistoryLoading = false;
        state.addTrackToHistoryError = error || null;
      })

      .addCase(fetchTracksHistory.pending, (state) => {
        state.trackHistoryFetching = true;
        state.fetchTrackHistoryError = null;
      })
      .addCase(fetchTracksHistory.fulfilled, (state, { payload: tracksHistory }) => {
        state.trackHistoryFetching = false;
        state.items = tracksHistory;
      })
      .addCase(fetchTracksHistory.rejected, (state, { payload: error }) => {
        state.trackHistoryFetching = false;
        state.fetchTrackHistoryError = error || null;
      });
  },
});
export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const selectAddingTrackId = (state: RootState) => state.tracksHistory.addingTrackId;
export const selectTracksHistory = (state: RootState) => state.tracksHistory.items;
export const selectTrackFetching = (state: RootState) => state.tracksHistory.trackHistoryFetching;
