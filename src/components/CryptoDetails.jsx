import React, { useEffect, useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import { Typography, Box } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { Bars } from "react-loader-spinner";
import { coinUrl, fetchCoinData } from "../services/getCoinData";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const dispatch = useDispatch();
  const status = useSelector((store) => store.coin.status);
  const data = useSelector((store) => store.coin.data);
  const cryptoDetails = data?.data?.coin;
  const [timePeriod, setTimePeriod] = useState("24h");

  console.log({ data, status });

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <DollarCircleOutlined />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <NumberOutlined /> },
    {
      title: "24h Volume",
      value: `$ ${cryptoDetails?.volume && millify(cryptoDetails?.volume)}`,
      icon: <ThunderboltOutlined />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <DollarCircleOutlined />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <FundOutlined />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <MoneyCollectOutlined />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ExclamationCircleOutlined />,
    },
  ];

  // example response
  // https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd=24h

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

    // console.log({ data, status });
  }, [coinId]);

  // https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd?timePeriod=24h

  return (
    <Box component="section">
      <Typography variant="subtitle2">Hello to crypto details</Typography>
    </Box>
  );
};

export default CryptoDetails;
