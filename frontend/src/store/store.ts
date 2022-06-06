import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import displayReducer from './features/display/displaySlice';
import positionReducer from './features/position/positionSlice';

// The store is an element available everywhere
// see more https://react-redux.js.org/
export const store = configureStore({
  reducer: {
    display: displayReducer,
    position: positionReducer,
  },
  middleware: getDefaultMiddleware =>
      getDefaultMiddleware({
        serializableCheck: false, // We know what we are doing
      }),
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
