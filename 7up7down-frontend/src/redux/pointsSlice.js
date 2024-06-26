import { createSlice } from '@reduxjs/toolkit';

export const pointsSlice = createSlice({
  name: 'points',
  initialState: {
    value: 5000,
  },
  reducers: {
    setPoints: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setPoints } = pointsSlice.actions;
export default pointsSlice.reducer;
