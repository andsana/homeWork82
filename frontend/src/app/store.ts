import { combineReducers, configureStore } from '@reduxjs/toolkit';
import {
  persistReducer,
  FLUSH,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER,
  REHYDRATE,
  persistStore,
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import { artistsReducer } from '../features/artists/artistsSlise.ts';
import { albumsReducer } from '../features/albums/albumsSlise.ts';
import { tracksReducer } from '../features/tracks/tracksSlice.ts';
import { usersReducer } from '../features/users/usersSlice.ts';
import { tracksHistoryReducer } from '../features/TracksHistory/TracksHistorySlice.ts';
// import { tracksHistoryReducer } from '../features/TracksHistory/TracksHistorySlice.ts';

const usersPersistConfig = {
  key: 'music:users',
  storage: storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  artists: artistsReducer,
  albums: albumsReducer,
  tracks: tracksReducer,
  tracksHistory: tracksHistoryReducer,
  users: persistReducer(usersPersistConfig, usersReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: [FLUSH, PAUSE, PERSIST, REHYDRATE, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
