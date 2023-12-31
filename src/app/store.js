import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../services/cryptoAPI";
import newsReducer from "../services/cryptoNewsAPI";
import coinReducer from "../services/getCoinData";
import historyReducer from "../services/getCoinHistory";

export const store = configureStore({
  reducer: {
    data: dataReducer,
    news: newsReducer,
    coin: coinReducer,
    history: historyReducer,
  },
});
