import { createSlice } from "@reduxjs/toolkit";
export const settingsSlice = createSlice({
  name: "settings",
  initialState: {
    loader: "d-none",
  },
  reducers: {},
});
export const { ShowLoader, HideLoader } = settingsSlice.actions;
export default settingsSlice.reducer;
