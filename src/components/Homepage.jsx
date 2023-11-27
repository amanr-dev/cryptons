import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import React from "react";
import { useGetCryptoQuery } from "../services/cryptoAPI";

const Homepage = () => {
  // const { data, isFetching } = useGetCryptoQuery();
  // console.log(data);
  const { data, error, isLoading } = useGetCryptoQuery();
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
              5
            </TableCell>
            <TableCell colSpan={12} align="left">
              5
            </TableCell>
            <TableCell colSpan={12} align="left">
              5
            </TableCell>
            <TableCell colSpan={12} align="right">
              5
            </TableCell>
            <TableCell colSpan={12} align="right">
              5
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </>
  );
};

export default Homepage;
