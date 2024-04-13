import { createSlice } from "@reduxjs/toolkit";
import { checkIsConnected, logout } from "../actions/authActions";

const initialState = {
  userInfos: null,
  loading: false,
  error: null,
};

// Create a slice for authentication
const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    loginReducer(state,action) {
      state.userInfos = action.payload.user;
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    // Add reducers for handling the checkIsConnected action lifecycle
    builder.addCase(checkIsConnected.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(checkIsConnected.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfos = action.payload;
    });
    builder.addCase(checkIsConnected.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload;
    });
    // logout reducer 
    builder.addCase(logout.fulfilled, (state, action) => {
      state.loading = false;
      state.userInfos = action.payload;
    });
  },
});


export const { loginReducer } = authSlice.actions;
export default authSlice.reducer;