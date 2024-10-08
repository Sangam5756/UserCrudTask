import { createSlice } from "@reduxjs/toolkit";

const dataSlice = createSlice({
  name: "data",
  initialState: {
    user: [],
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
    AddnewUser: (state, action) => {
      state.user =action.payload;
    },
  },
});

export const { setUser, AddnewUser } = dataSlice.actions;

export default dataSlice.reducer;
