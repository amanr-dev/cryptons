import { Select, Typography, Avatar, Box } from "@mui/material";
import moment from "moment";
import React, { useEffect } from "react";

import { fetchNews } from "../services/cryptoNewsAPI";
import { useDispatch, useSelector } from "react-redux";

const News = ({ simplified }) => {
  const dispatch = useDispatch();
  const data = useSelector((status) => status.news.data);
  const status = useSelector((status) => status.news.status);
  let count = `${simplified ? 10 : 100}`;
  console.log({ data, status });

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews("cryptocurrencies", count));
    } else if (status === "loading") {
      return alert("it's loading");
    }
  }, []);
  return <div>News</div>;
};

export default News;
