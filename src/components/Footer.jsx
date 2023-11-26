import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <Box className="footer " color="#fff" textAlign="center">
      <Typography variant="body1">
        Cryptons
        <br />
        All rights reserved
      </Typography>
      <Typography variant="body2">
        <Link className="link" to="/">
          Home
        </Link>
        <Link className="link" to="/exchanges">
          Exchanges
        </Link>
        <Link className="link" to="/news">
          News
        </Link>
      </Typography>
    </Box>
  );
};

export default Footer;
