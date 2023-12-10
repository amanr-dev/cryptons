import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { cryptoUrl, fetchData } from "../services/cryptoAPI";
import millify from "millify";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";
import News from "./News";
import CryptoCurrencies from "./CryptoCurrencies";

const Homepage = () => {
  const data = useSelector((state) => state.data.data);
  const status = useSelector((state) => state.data.status);
  const [loading, setLoading] = useState(false);
  const [cryptoData, setCryptoData] = useState(data);
  const dispatch = useDispatch();

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchData(`${cryptoUrl}coins`));
      setLoading(false);
    } else if (status === "loading") {
      return setLoading(true);
    }
    // console.log(data);
  }, [status, dispatch]);

  const globalStats = data?.data?.stats;
  return (
    <>
      <Typography className="heading" variant="h2">
        Gobal Crypto Stats
      </Typography>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell align="left" colSpan={12} title="Total Cryptocurrencies">
              Total Cryptocurrencies
            </TableCell>
            <TableCell align="left" colSpan={12} title="Total Exchanges">
              Total Exchanges
            </TableCell>
            <TableCell align="left" colSpan={12} title="Total Market Cap">
              Total Market Cap
            </TableCell>
            <TableCell align="right" colSpan={12} title="Total 24h Volume">
              Total 24h Volume
            </TableCell>
            <TableCell align="right" colSpan={12} title="Total Markets">
              TotalMarkets
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <TableCell colSpan={12} align="left">
              {globalStats?.total?.toLocaleString()}
            </TableCell>
            <TableCell colSpan={12} align="left">
              {millify(Number(globalStats?.totalExchanges))}
            </TableCell>
            <TableCell colSpan={12} align="left">
              {millify(Number(globalStats?.totalMarketCap))}
            </TableCell>
            <TableCell colSpan={12} align="right">
              {millify(Number(globalStats?.total24hVolume))}
            </TableCell>
            <TableCell colSpan={12} align="right">
              {millify(Number(globalStats?.totalMarkets))}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box className="home-heading-container">
        <Typography variant="h4" className="home-title">
          Top 10 Crypto Currencies in the world
        </Typography>
        <Typography variant="h5" className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Typography>
      </Box>
      <CryptoCurrencies data={cryptoData} simplified />
      <Box className="home-heading-container">
        <Typography variant="h4" className="home-title">
          Latest Crypto News
        </Typography>
        <Typography variant="h5" className="show-more">
          <Link to="/news">Show More</Link>
        </Typography>
      </Box>
      <News simplified />
    </>
  );
};

export default Homepage;
