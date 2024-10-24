import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAdminExist: false, // Corrected casing to match your component
  adminData: {}, // Store admin data here
};

export const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    saveadmin: (state, action) => {
      state.isAdminExist = true; // Use consistent naming
      state.adminData = action.payload; // Store admin data in adminData
    },
    clearadmin: (state) => {
      state.isAdminExist = false;
      state.adminData = {}; // Clear the adminData property
    },
  },
});

// Action creators are generated for each case reducer function
export const { saveadmin, clearadmin } = adminSlice.actions;

export default adminSlice.reducer;
