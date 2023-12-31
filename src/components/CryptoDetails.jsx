import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import {
  Typography,
  Box,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  FaCheck,
  FaDollarSign,
  FaExclamation,
  FaRegStopCircle,
  FaTrophy,
} from "react-icons/fa";
import { GoNumber } from "react-icons/go";
import { TbPigMoney } from "react-icons/tb";
import { AiFillFund, AiTwotoneThunderbolt } from "react-icons/ai";
import { Bars } from "react-loader-spinner";
import { coinUrl, fetchCoinData } from "../services/getCoinData";
import LineChart from "./LineChart";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const dispatch = useDispatch();
  const status = useSelector((store) => store.coin.status);
  const data = useSelector((store) => store.coin.data);
  const cryptoDetails = data?.data?.coin;
  const [timePeriod, setTimePeriod] = useState("7d");

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  // const coinHistory = dispatch(
  //   fetchCoinData(`${coinUrl}${coinId}/history/timePeriod=${timePeriod}`)
  // );

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <FaDollarSign />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <GoNumber /> },
    {
      title: "24h Volume",
      value: `Above $ ${
        (cryptoDetails?.volume && millify(cryptoDetails?.volume)) ||
        millify("28030883815")
      }`,
      icon: <AiTwotoneThunderbolt />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <FaDollarSign />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <FaTrophy />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <AiFillFund />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <TbPigMoney />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <FaCheck />
      ) : (
        <FaRegStopCircle />
      ),
      icon: <FaExclamation />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <FaExclamation />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <FaExclamation />,
    },
  ];

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchCoinData(`${coinUrl}${coinId}?timePeriod=${timePeriod}`));
    } else if (status === "loading") {
      return (
        <Box
          display="flex"
          width="100%"
          alignItems="center"
          justifyContent="center"
        >
          <Bars color="#001529" width={50} height={50} visible={true} />
        </Box>
      );
    }
  }, [coinId]);

  return (
    <Box component="section" className="coin-detail-container">
      <Typography component="div" className="coin-heading-container">
        <Typography variant="h4">
          {cryptoDetails?.name} ({cryptoDetails?.symbol}) Price
        </Typography>
        <Typography variant="subtitle1">
          {cryptoDetails?.name} live price in USD. View value statistics, market
          cap and supply.
        </Typography>
      </Typography>
      <FormControl
        variant="standard"
        sx={{ m: 1, minWidth: 150 }}
        size="medium"
      >
        <InputLabel variant="filled" id="select-timeperiod">
          Select Timeperiod
        </InputLabel>
        <Select
          defaultValue="7d"
          labelId="select-timeperiod"
          label="Timeperiod"
          value={timePeriod}
          onChange={(e) => setTimePeriod(e.target.value)}
          className="select-timeperiod"
        >
          <MenuItem>{timePeriod}</MenuItem>
          {time.map((date) => (
            <MenuItem value={date} key={date}>
              {date}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {/* line chart */}
      <LineChart
        currentPrice={millify(cryptoDetails?.price)}
        coinName={cryptoDetails?.name}
        timePeriod={timePeriod}
      />
      <Box className="stats-container">
        <Box className="coin-value-container">
          <Box className="coin-value-statistics-heading">
            <Typography variant="h4" className="coin-details-heading">
              {cryptoDetails?.name} Value Statistics
            </Typography>
            <Typography variant="subtitle1">
              An overview showing the stats of {cryptoDetails?.name}
            </Typography>
          </Box>
          {stats.map(({ icon, title, value }) => (
            <Box className="coin-stats" key={title}>
              <Box className="coin-stats-name">
                <Typography color="#0071BD">{icon}</Typography>
                <Typography>{title}</Typography>
              </Box>
              <Typography className="stats">{value}</Typography>
            </Box>
          ))}
        </Box>
        <Box className="other-stats-info">
          <Box className="coin-value-statistics-heading">
            <Typography variant="h4" className="coin-details-heading">
              Other Statistics
            </Typography>
            <Typography variant="subtitle1">
              An overview showing the stats of all Cryptocurrencies
            </Typography>
          </Box>
          {genericStats.map(({ icon, title, value }) => (
            <Box className="coin-stats">
              <Box className="coin-stats-name">
                <Typography color="#0071BD">{icon}</Typography>
                <Typography>{title}</Typography>
              </Box>
              <Typography className="stats">{value}</Typography>
            </Box>
          ))}
        </Box>
      </Box>
      <Box className="coin-desc-link">
        <Box className="coin-desc">
          <Typography variant="h4" className="coin-details-heading">
            What is {cryptoDetails?.name}
            <Typography marginTop={5} lineHeight={2} variant="h5">
              {(cryptoDetails?.description &&
                HTMLReactParser(cryptoDetails?.description)) ||
                cryptoDetails?.description}
            </Typography>
          </Typography>
        </Box>
        <Box className="coin-links">
          <Typography variant="h4" className="coin-details-heading">
            {cryptoDetails?.name} Links
          </Typography>
          {cryptoDetails?.links?.map((link) => (
            <Box marginTop={5} className="coin-link" key={link.name}>
              <Typography variant="body2" className="link-name">
                {link.type}
              </Typography>
              <a href={link.url} target="_blank" rel="noreferrer">
                {link.name}
              </a>
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default CryptoDetails;
