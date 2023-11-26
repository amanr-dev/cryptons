import React, { useState } from "react";
import {
  Typography,
  Button,
  Avatar,
  Menu,
  MenuItem,
  IconButton,
} from "@mui/material";
import { FaHamburger, FaLightbulb, FaHome } from "react-icons/fa";
import { RiFundsFill } from "react-icons/ri";
import { TbPigMoney } from "react-icons/tb";
import { Box } from "@mui/system";
import { Link } from "react-router-dom";

const Nav = () => {
  return (
    <nav className="nav-container">
      <Box className="logo-container">
        <Avatar
          src="https://i.ibb.co/Z11pcGG/cryptocurrency.png"
          alt="Cryptons"
        />

        <Typography variant="body2" className="logo" color="#fff">
          Cryptons
        </Typography>
      </Box>
      <Box className="menu" height="100%">
        <ul
          style={{
            display: "flex",
            alignItems: "start",
            justifyContent: "center",
            flexDirection: "column",
            gap: "2rem",
            listStyle: "none",
            padding: " 20px ",
          }}
        >
          <li
            style={{
              fontSize: "1.2rem",
              color: "#fff",
              display: "flex",
              alignItems: "center ",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FaHome />
            <Link
              style={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "1.2rem",
              }}
              to="/"
            >
              Home
            </Link>
          </li>
          <li
            style={{
              fontSize: "1.2rem",
              color: "#fff",
              display: "flex",
              alignItems: "center ",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <RiFundsFill />
            <Link
              style={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "1.2rem",
              }}
              to="/cryptocurrencies"
            >
              Crypto Currencies
            </Link>
          </li>
          <li
            style={{
              fontSize: "1.2rem",
              color: "#fff",
              display: "flex",
              alignItems: "center ",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <TbPigMoney />
            <Link
              style={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "1.2rem",
              }}
              to="/exchanges"
            >
              Exchanges
            </Link>
          </li>
          <li
            style={{
              fontSize: "1.2rem",
              color: "#fff",
              display: "flex",
              alignItems: "center ",
              justifyContent: "center",
              gap: "10px",
            }}
          >
            <FaLightbulb />
            <Link
              style={{
                textDecoration: "none",
                color: "#fff",
                fontSize: "1.2rem",
              }}
              to="/news"
            >
              News
            </Link>
          </li>
        </ul>
      </Box>
    </nav>
  );
};

export default Nav;
