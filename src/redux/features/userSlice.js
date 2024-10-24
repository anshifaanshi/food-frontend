import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isUserExist: false,
  user: {},
  loading: false, // Loading state to indicate when user data is being fetched
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    saveUser: (state, action) => {
      state.isUserExist = true;
      state.user = action.payload;
      state.loading = false; // Set loading to false when user data is saved successfully
    },
    clearUser: (state) => {
      state.isUserExist = false;
      state.user = {};
      state.loading = false; // Ensure loading is set to false when clearing user data
    },
    setLoading: (state, action) => {
      state.loading = action.payload; // Manually set loading state if needed
    },
  },
});

export const { saveUser, clearUser, setLoading } = userSlice.actions;

export default userSlice.reducer;
