import { createSlice } from '@reduxjs/toolkit';
import { GlobalError, TracksHistory } from '../../types';
import { addTrackToHistory, fetchTrackHistory } from './TracksHistoryThunks.ts';
import { RootState } from '../../app/store.ts';

interface TracksState {
  items: TracksHistory[];
  addingTrackId: string | null;
  addTrackToHistoryLoading: boolean;
  addTrackToHistoryError: GlobalError | null;
  fetchTrackToHistoryLoading: boolean;
  fetchTrackToHistoryError: GlobalError | null;
}

const initialState: TracksState = {
  items: [],
  addingTrackId: null,
  addTrackToHistoryLoading: false,
  addTrackToHistoryError: null,
  fetchTrackToHistoryLoading: false,
  fetchTrackToHistoryError: null,
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

      .addCase(fetchTrackHistory.pending, (state) => {
        state.fetchTrackToHistoryLoading = true;
        state.fetchTrackToHistoryError = null;
      })
      .addCase(
        fetchTrackHistory.fulfilled,
        (state, { payload: tracksHistory }) => {
          state.fetchTrackToHistoryLoading = false;
          state.items = tracksHistory;
        },
      )
      .addCase(fetchTrackHistory.rejected, (state, { payload: error }) => {
        state.fetchTrackToHistoryLoading = false;
        state.fetchTrackToHistoryError = error || null;
      });
  },
});
export const tracksHistoryReducer = tracksHistorySlice.reducer;
export const selectAddingTrackId = (state: RootState) =>
  state.tracksHistory.addingTrackId;
