import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  TableRow,
  TableCell,
  Input,
  CardHeader,
  CardMedia,
  TableHead,
  CardContent,
  Typography,
  TableBody,
  Paper,
} from "@mui/material";
import millify from "millify";
import { useDispatch, useSelector } from "react-redux";
import { cryptoUrl, fetchData } from "../services/cryptoAPI";
import { Box, color, shadows } from "@mui/system";
import { hover } from "@testing-library/user-event/dist/hover";

const CryptoCurrencies = ({ simplified }) => {
  const data = JSON.parse(localStorage.getItem("coins"));
  const [searchTerm, setSearchTerm] = useState("");
  const status = useSelector((state) => state.data.status);
  const [cryptoData, setCryptoData] = useState(data.coins);
  // const count = simplified ? 10 : 100;

  // if (!cryptos) {
  //   return "Loading...";
  // }
  // console.log(simplified);

  useEffect(() => {
    if (searchTerm.length) {
      const filteredData = data.coins.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
      console.log(filteredData);
      setCryptoData(filteredData);
    }
  }, [searchTerm]);

  if (status === "loading") {
    return <h1>Loading</h1>;
  }

  return (
    <>
      <>
        {!simplified && (
          <Paper
            sx={{ padding: "10px 5px", width: "100%", margin: "12px" }}
            variant="elevation"
            elevation={1}
            className="search-cryptos"
          >
            <Input
              disableUnderline
              fullWidth
              sx={{
                padding: "5px 10px",
              }}
              type="text"
              value={searchTerm}
              placeholder="Search Cryptocurrencies"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </Paper>
        )}
        <Box component="section" className="card-container">
          {cryptoData.map((currency) => (
            <Box
              sx={{
                width: "250px",
                // height: "500px",
                textDecoration: "none",
                listStyle: "none",
                display: "flex",
                alignItems: "start",
                justifyContent: "space-between",
                flexDirection: "row",
              }}
              key={currency.uuid}
            >
              <Link style={{ width: "100%" }} to={`/crypto/${currency.id}`}>
                <Card
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    flexDirection: "row",
                    width: "100%",
                    padding: "10px 0px",
                    borderBottomRightRadius: "0px",
                    borderBottomLeftRadius: "0px",
                  }}
                >
                  <CardHeader
                    sx={{
                      fontSize: "1.2rem",
                      textDecoration: "none",
                      listStyle: "none",
                    }}
                    title={`${currency.rank}. ${currency.name}`}
                  />
                  <CardMedia
                    sx={{ width: "40px" }}
                    component="img"
                    image={currency.iconUrl}
                    alt={currency.name}
                  />
                </Card>
                <CardContent
                  style={{
                    backgroundColor: "#fff",
                    color: "rgba(0, 0, 0, 0.87)",
                    transition:
                      " box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1) 0ms",

                    borderRadius: "4px",
                    borderTopRightRadius: "0px",
                    borderTopLeftRadius: "0px",
                    boxShadow:
                      " 0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)",
                  }}
                >
                  <Typography gutterBottom variant="body2">
                    Price: {millify(currency.price)}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Market Cap: {millify(currency.marketCap)}
                  </Typography>
                  <Typography gutterBottom variant="body2">
                    Daily Change: {millify(currency.change)}
                  </Typography>
                </CardContent>
              </Link>
            </Box>
          ))}
        </Box>
      </>
    </>
  );
};

export default CryptoCurrencies;
