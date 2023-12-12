import {
  Select,
  Typography,
  Avatar,
  Box,
  Card,
  CardContent,
  CardMedia,
  CardHeader,
} from "@mui/material";
import moment from "moment";
import React, { useEffect, useState } from "react";
import { Bars, Blocks } from "react-loader-spinner";
import { fetchNews, newsUrl } from "../services/cryptoNewsAPI";
import { useDispatch, useSelector } from "react-redux";
import { images } from "../services/images";

const News = ({ simplified }) => {
  const dispatch = useDispatch();
  const data = useSelector((status) => status.news.data);
  const status = useSelector((status) => status.news.status);
  const [page, setPage] = useState(simplified ? 12 : 30);
  const [articles, setArticles] = useState([]);

  const findIndex = (index) => {
    if (index >= images.length) {
      const imageShort = images.length - 1;

      return index % imageShort;
    } else {
      return index;
    }
  };

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchNews(`${newsUrl}?q=crypto`));
    }
    if (!simplified) {
      setArticles(data?.articles);
    } else {
      setArticles(data?.articles?.slice(0, 6));
    }
    // console.log(articles);
    findIndex(14);
  }, [window.location.href]);

  if (status === "loading") {
    return <Bars color="#001529" width={50} height={50} visible={true} />;
  }

  // console.log(data.articles[0].publisher.name);

  // const { articles } = data;
  return (
    <Box sx={{ width: "100%" }} component="section">
      <Box className="news-container">
        {articles?.map((news, index) => (
          <Card className="news-card" key={index}>
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
