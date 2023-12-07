import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import { Provider } from "react-redux";
import { store } from "./app/store";
const root = document.getElementById("root");
const app = createRoot(root);

app.render(
  <Router>
    <Provider store={store}>
      <App />
    </Provider>
  </Router>
);
