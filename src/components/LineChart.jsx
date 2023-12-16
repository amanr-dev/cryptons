import React, { useEffect } from "react";
import { Line } from "react-chartjs-2";
import { Box, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip,
} from "chart.js";
import { coinHistoryUrl, fetchCoinHistory } from "../services/getCoinHistory";
import { useParams } from "react-router-dom";
ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Legend,
  Tooltip
);

const LineChart = ({ timePeriod, currentPrice, coinName }) => {
  const dispatch = useDispatch();
  const { coinId } = useParams();
  let coinPrice = [];
  let coinTimestamp = [];
  const data = useSelector((store) => store.history.data);
  const status = useSelector((store) => store.history.status);

  const chartHistory = data?.data?.history?.slice(0, 40);

  useEffect(() => {
    if (status === "idle") {
      dispatch(
        fetchCoinHistory(
          `${coinHistoryUrl}${coinId}/history?timePeriod=${timePeriod}&limit=30`
        )
      );
    }
  }, []);

  if (status === "succeeded") {
    for (let a = 0; a < chartHistory?.length; a += 1) {
      coinPrice.push(chartHistory[a].price);
      coinTimestamp.push(
        new Date(chartHistory[a].timestamp).toLocaleDateString()
      );
      //  console.log(a);
    }
  }
  //   console.log({ coinPrice, coinTimestamp, chartHistory });

  const datas = {
    labels: coinTimestamp,
    datasets: [
      {
        label: "Price in USD",
        data: coinPrice,
        fill: false,

        backgroundColor: "aqua",
        borderColor: "black",
        borderWidth: 1,
        pointBorderColor: "aqua",
      },
    ],
  };

  const options = {
    plugins: {
      legend: true,
    },
    scales: {
      //  y: [
      //    {
      //      ticks: {
      //        beginAtZero: true,
      //      },
      //    },
      //  ],
      y: {},
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
      <Line data={datas} options={options} />
    </>
  );
};

export default LineChart;
