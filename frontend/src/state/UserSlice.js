import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    current: localStorage.getItem("user")
      ? JSON.parse(localStorage.getItem("user"))
      : {},
  },
  reducers: {
    setCurrent: (state, action) => {
      state.current = { ...action.payload };
      localStorage.setItem("user", JSON.stringify(action.payload));
    },
    logout: (state) => {
      state.current = {};
      localStorage.removeItem("user");
    },
  },
});

export const { setCurrent, logout } = userSlice.actions;
export default userSlice.reducer;
