import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { coinHistoryUrl, fetchCoinHistory } from "../services/getCoinHistory";
import { useParams } from "react-router-dom";

const LineChart = ({ timePeriod, currentPrice, coinName }) => {
  const dispatch = useDispatch();
  const { coinId } = useParams();
  const data = useSelector((store) => store.history.data);
  const status = useSelector((store) => store.history.status);

  // https://coinranking1.p.rapidapi.com/coin/Qwsogvtv82FCd/history?timePeriod=24h

  // dispatch(fetchCoinData(`${coinUrl}${coinId}?timePeriod=${timePeriod}`));
  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchCoinHistory(
          `${coinHistoryUrl}${coinId}/history?timePeriod=${timePeriod}`
        )
      );
    }
    //     console.log({ data, status });
  }, []);

  return (
    <Box className="chart-header">
      <Typography variant="h4" className="chart-title">
        {coinName} Price chart{" "}
      </Typography>
      <Box className="price-container">
        <Typography variant="h5" className="price-change">
          {data?.data?.change}
        </Typography>
        <Typography variant="h5" className="current-price">
          Current {coinName} Price: {currentPrice}
        </Typography>
      </Box>
    </Box>
    //     <Line />
  );
};

export default LineChart;
