/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  FilteredData: [],
  isLoading: false,
} as any;

const CardSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    setFilteredData(init, action) {
      const state = init;
      state.FilteredData = action.payload;
    },
  },
});
export const { setFilteredData } = CardSlice.actions;
export default CardSlice.reducer;
