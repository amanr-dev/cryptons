import React from "react";
import { Route, Routes } from "react-router-dom";
import { Homepage, Exchanges, CryptoCurrencies, News, CryptoDetails } from "./";
import { Box } from "@mui/system";

const Layout = () => {
  return (
    <Box marginLeft="227px" className="routes ">
      <Routes>
        <Route exact path="/" element={<Homepage />} />
        <Route exact path="/exchanges" element={<Exchanges />} />
        <Route exact path="/cryptocurrencies" element={<CryptoCurrencies />} />
        <Route exact path="/crypto/:coinId" element={<CryptoDetails />} />
        <Route exact path="/news" element={<News />} />
      </Routes>
    </Box>
  );
};

export default Layout;
