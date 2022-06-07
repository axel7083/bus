import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import IDisplay from "../../../utils/interface/IDisplay";
import ILayer from "../../../utils/interface/ILayer";

export interface DisplayState {
  value: IDisplay;
}

const initialState: DisplayState = {
  value: {
    layers: []
  },
};

export const displaySlice = createSlice({
  name: 'display',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    toggleLayerVisibility: (state,  action: PayloadAction<number>) => {
      console.log("toggleLayerVisibility");
      const copy = {...state.value};
      copy.layers[action.payload].displayed = !copy.layers[action.payload].displayed;
      state.value = copy;
    },
    addLayer: (state,  action: PayloadAction<ILayer>) => {
      const copy = {...state.value};
      copy.layers.push(action.payload);
      state.value = copy;
    },
    updateOrAddLayer: (state,  action: PayloadAction<ILayer>) => {
      console.log(action.payload)
      const copy = {...state.value};
      let index = -1;
      for(let i = 0;  i < copy.layers.length; i++) {
        if(copy.layers[i].id === action.payload.id)
        {
          index = i;
          break;
        }
      }

      if(index === -1)
        copy.layers = [...copy.layers, action.payload];
      else {
        copy.layers = [...copy.layers];
        copy.layers[index] = action.payload;
      }

      state.value = copy;
    },
  },
});

export const { toggleLayerVisibility, addLayer, updateOrAddLayer } = displaySlice.actions;

export const selectDisplay = (state: RootState) => state.display.value;

export default displaySlice.reducer;
