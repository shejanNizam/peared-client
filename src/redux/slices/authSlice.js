import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  // token: null,
  user: null,
  notificationCount: 0,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      // state.token = action.payload.token;
      state.user = action.payload.user;
    },
    logout: (state) => {
      // state.token = null;
      state.user = null;
    },
    increaseNotification: (state) => {
      state.notificationCount++;
    },
  },
});

export const { setCredentials, logout, increaseNotification } =
  authSlice.actions;

export default authSlice.reducer;
