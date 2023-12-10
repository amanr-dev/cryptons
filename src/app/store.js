import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../services/cryptoAPI";
import newsReducer from "../services/cryptoNewsAPI";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    news: newsReducer,
  },
});
