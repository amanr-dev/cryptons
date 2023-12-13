import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
export const cryptoUrl = "https://coinranking1.p.rapidapi.com/";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchData = createAsyncThunk("services/cryptoAPI", async (url) => {
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
});

const dataSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default dataSlice.reducer;
