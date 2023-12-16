// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const coinHistoryUrl = "https://coinranking1.p.rapidapi.com/coin/";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchCoinHistory = createAsyncThunk(
  "services/getCoinHistory",
  async (url) => {
    try {
      const headers = {
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
      };
      const response = await axios.get(url, { headers });
      return response.data;
    } catch (error) {
      console.log(error);
      throw error;
    }
  }
);

const coinHistory = createSlice({
  name: "coinHistory",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchCoinHistory.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCoinHistory.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCoinHistory.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default coinHistory.reducer;
