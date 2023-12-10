import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const newsUrl = "https://news-api14.p.rapidapi.com/search";

const initialState = {
  data: [],
  status: "idle",
  error: null,
};

export const fetchNews = createAsyncThunk(
  "services/cryptoNewsAPI",
  async (category, count) => {
    try {
      const headers = {
        "X-BingApis-SDK": "true",
        "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
        "X-RapidAPI-Host": "news-api14.p.rapidapi.com",
      };
      const response = await axios.get(
        `${newsUrl}?=${category}&pageSize=${count}`,
        { headers }
      );
      return response.data;
    } catch (error) {
      console.log(`⚠️😲😱${error}`);
    }
  }
);

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchNews.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchNews.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchNews.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default newsSlice.reducer;
