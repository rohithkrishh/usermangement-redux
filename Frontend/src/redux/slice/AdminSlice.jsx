import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  admin: {},
  AdminLoggedIn: false,
};

export const AdminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    adminLogin: (state, action) => {
      state.admin = action.payload.admin;
      state.AdminLoggedIn = true;
    },
    adminLogOut: (state) => {
      state.admin = {};
      state.AdminLoggedIn = false;
    },
  },
});

export const { adminLogin, adminLogOut } = AdminSlice.actions;
export default AdminSlice.reducer;
