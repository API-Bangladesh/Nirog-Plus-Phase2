import { createSlice } from "@reduxjs/toolkit";

export const patientsSlice = createSlice({
  name: "patients",
  initialState: {
    patient: {},
  },
  reducers: {
    ADD_PATIENT: (state, action) => {
      state.patient = action.payload;
    },
  },
});
export const { ADD_PATIENT } = patientsSlice.actions;
export default patientsSlice.reducer;
