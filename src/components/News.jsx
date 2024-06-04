import {
  Select,
  Typography,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
  MenuItem,
  InputLabel,
  FormControl,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bars } from "react-loader-spinner";
import { fetchNews, newsUrl } from "../services/cryptoNewsAPI";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../services/images";

const News = ({ simplified }) => {
  const coins = JSON.parse(localStorage.getItem("coins"));
  const dispatch = useDispatch();
  const data = useSelector((status) => status.news.data);
  const status = useSelector((status) => status.news.status);

  // States
  const [articles, setArticles] = useState(data?.articles);
  const [selected, setSelected] = useState("Crypto");

  // Function for images to repeat after & after
  const findIndex = (index) => {
    if (index >= images.length) {
      const imageShort = images.length - 1;
      return index % imageShort;
    } else {
      return index;
    }
  };

  // Select onSubmit
  const handleSelect = (e) => {
    if (!simplified) {
      setSelected(e);
      dispatch(fetchNews(`${newsUrl}?q=${selected}`));
    }
  };

  // TODO:- Here crypto data should render 100 results

  // Main useEffect to fetch the news data
  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews(`${newsUrl}?q=crypto`));
    }
    if (simplified) {
      setArticles(articles?.slice(0, 6));
    } else {
      setArticles(data?.articles);
    }

    // console.log(articles);

    // findIndex(14);
  }, [simplified]);

  if (status === "loading") {
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

  return (
    <Box sx={{ width: "100%", padding: "8px" }} component="section">
      {!simplified && (
        <Box
          display="flex"
          alignItems="center"
          justifyContent="start"
          width="100%"
        >
          <FormControl
            variant="standard"
            sx={{ m: 1, minWidth: 120 }}
            size="small"
          >
            <InputLabel variant="filled" id="select-label">
              Select
            </InputLabel>
            <Select
              labelId="select-label"
              label="Cryptocurrencies"
              value={selected}
              placeholder="Select"
              onChange={(e) => handleSelect(e.target.value)}
              className="select-news"
            >
              <MenuItem>{selected}</MenuItem>
              {coins?.coins.map((coin) => (
                <MenuItem value={coin.name} key={coin.uuid}>
                  {coin.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>
      )}

      <Box className="news-container">
        {articles?.map((news, index) => (
          <Card className="news-card card" key={index}>
            <a href={news.url} target="_blank" rel="noreferrer">
              <CardHeader
                title={news.publisher?.name}
                subheader={moment(news.published_date).startOf("ss").fromNow()}
                className="news-title"
              />
              <CardMedia
                sx={{
                  width: "350px",
                  height: "200px",
                  maxWidth: "350px",
                  maxHeight: "200px",
                }}
                component="img"
                image={images[findIndex(index)]}
                alt={news.title.slice(0, 20)}
                className="news-image-container"
              />
              <CardContent>
                <Typography
                  className="news-title"
                  gutterBottom
                  variant="subtitle1"
                >
                  {news.title}
                </Typography>
              </CardContent>
            </a>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default News;
