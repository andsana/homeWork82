import { configureStore } from '@reduxjs/toolkit';
import { artistsReducer } from '../features/artists/artistsSlise.ts';
import { albumsReducer } from '../features/albums/albumsSlise.ts';

export const store = configureStore({
  reducer: {
    artists: artistsReducer,
    albums: albumsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
