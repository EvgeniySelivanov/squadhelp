import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducer';
import { initSocket } from '../api/ws/socketController';

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore these action types
        ignoredActions: [

        ],
        // Ignore these field paths in all actions
        ignoredActionPaths: [
          'meta.arg',
          'payload.timestamp',
          'contestCreationStore.contests.name.file',
          'payload.info.file',
          ],
        // Ignore these paths in the state
        ignoredPaths: [
          'items.dates',
          'contestCreationStore.contests.name.file',
          'contestCreationStore.contests.logo.file'
        ],
      },
    }),


});

initSocket(store);

export default store;
