import React from "react";
import "./style.css";
import { Box } from "@mui/system";
import { Nav, Footer, Layout } from "./components";

const App = () => {
  return (
    <Box className="main">
      <Box className="navbar">
        <Nav />
      </Box>
      <Box className="app">
        <Layout />
      </Box>
      <Box className="footer">
        <Footer />
      </Box>
    </Box>
  );
};

export default App;
