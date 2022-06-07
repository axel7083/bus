import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import {IBusLine} from "../../../utils/interface/IBusLine";

export interface DisplayState {
  value: IBusLine[];
}

const initialState: DisplayState = {
  value: [],
};

export const busLinesSlice = createSlice({
  name: 'busLines',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    add: (state,  action: PayloadAction<IBusLine>) => {
      const copy = [...state.value];
      copy.push(action.payload);
      state.value = copy;
    },
    update: (state,  action: PayloadAction<IBusLine>) => {
      const copy = [...state.value];
      const index = state.value.findIndex((busLine) => busLine.id === action.payload.id)
      copy[index] = action.payload;
      state.value = copy;
    },
    delete: (state,  action: PayloadAction<string>) => {
      const copy = [...state.value];
      //TODO:
    }
  },
});

export const { add, update } = busLinesSlice.actions;

export const selectBusLines = (state: RootState) => state.busLines.value;

export const selectBusLineById = (state: RootState, id: string) => state.busLines.value.find((busLine) => busLine.id === id);


export default busLinesSlice.reducer;
