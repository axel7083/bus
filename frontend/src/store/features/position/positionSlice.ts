import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {LatLngExpression} from "leaflet";

export interface PositionState {
  value: LatLngExpression;
}

const initialState: PositionState = {
  value: {lat: 0, lng: 0},
};

export const positionSlice = createSlice({
  name: 'position',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    setPosition: (state,  action: PayloadAction<LatLngExpression>) => {
      state.value = action.payload;
    },
  },
});

export const { setPosition } = positionSlice.actions;

export const selectPosition = (state: RootState) => state.position.value;

export default positionSlice.reducer;
