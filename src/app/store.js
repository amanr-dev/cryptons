import { configureStore } from "@reduxjs/toolkit";
import dataReducer from "../services/cryptoAPI";

export const store = configureStore({
  reducer: {
    data: dataReducer,
  },
});
