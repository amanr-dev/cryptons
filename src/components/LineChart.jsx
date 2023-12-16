import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { coinHistoryUrl, fetchCoinHistory } from "../services/getCoinHistory";
import { useParams } from "react-router-dom";

const LineChart = ({ timePeriod, currentPrice, coinName }) => {
  const dispatch = useDispatch();
  const { coinId } = useParams();
  let coinPrice = [];
  let coinTimestamp = [];
  const data = useSelector((store) => store.history.data);
  const status = useSelector((store) => store.history.status);
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

  if (status === "succeeded") {
    for (let a = 0; a < data?.data?.history?.length; a += 1) {
      coinPrice.push(data.data.history[a].price);
      coinTimestamp.push(
        new Date(data.data.history[a].timestamp).toLocaleDateString()
      );
      //  console.log(a);
    }
  }
  //   console.log({ coinPrice, coinTimestamp });

  const chartData = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,
        backgroundColor: "#0071bd",
        borderColor: "0071bd",
      },
    ],
  };

  const chartOptions = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
    <>
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
      <Line data={chartData} options={chartOptions} />
    </>
  );
};

export default LineChart;
