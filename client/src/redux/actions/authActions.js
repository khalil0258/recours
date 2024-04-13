import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import { checkConnexion, login_out } from '../../api';
axios.defaults.withCredentials=true;

// Define an asynchronous thunk action to check if the user is connected
export const checkIsConnected = createAsyncThunk(
  'auth/isConnected',
  async (_, thunkAPI) => {
    try {
        const response =await checkConnexion();
      return response.data;
    } catch (error) {
      // Return the rejected action with error message
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
// Define an asynchronous thunk action to check if the user is connected
export const logout = createAsyncThunk(
  'auth/logout',
  async (_, thunkAPI) => {
    try {
        const response =await login_out();
      return response.data;
    } catch (error) {
      // Return the rejected action with error message
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);