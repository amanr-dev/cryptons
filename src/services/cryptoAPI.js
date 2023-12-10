// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// const cryptoHeaders = {
//   "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
//   "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
// };

// const createRequest = (url) => ({ url, headers: cryptoHeaders });

// export const cryptoApi = createApi({
//   reducerPath: "cryptoApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: url,
//     prepareHeaders: (headers) => {
//       headers.set("X-RapidAPI-Key", process.env.REACT_APP_RAPID_API_KEY);
//       headers.set("X-RapidAPI-Host", "coinranking1.p.rapidapi.com");
//       return headers;
//     },
//   }),
//   endpoints: (builder) => ({
//     getCryptos: builder.query({
//       query: () => prepareHeaders("/coins"),
//     }),
//   }),
// });

// export const { useGetCryptoQuery } = cryptoApi;

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
