const express = require("express");
const bodyParser = require("body-parser");
const { parse, stringify } = require("flatted");
const axios = require("axios");
require("dotenv").config();
const base_url = process.env["BASE_URL"];
const key = process.env["KEY"];

const getAllTokens = express.Router();
getAllTokens.use(bodyParser.json());

getAllTokens.route("/:contract").get((req, res, nxt) => {
  //get all tokens corresponding to a contract
  axios
    .get(
      `${base_url}/v1/56/tokens/${req.params.contract}/nft_token_ids/?key=${key}`
    )
    .then((result) => {
      const pages = result.data.data.pagination.page_size;
      res.json({ ...result.data.data, totalPages: pages });
    })
    .catch((err) => {
      console.log(err);
    });
});

getAllTokens.route("/:contract/token/:tokenId").get((req, res, nxt) => {
  //get detail of a particular token
  axios
    .get(
      `${base_url}/v1/56/tokens/${req.params.contract}/nft_metadata/${req.params.tokenId}/?key=${key}`
    )
    .then((result) => {
      const data = result.data.data.items[0].nft_data;
      if (data.length !== 0) res.json(data);
      else res.send("no nft data found");
    });
});

getAllTokens.route("/:contract/:page").get((req, res, nxt) => {
  //get all tokens on a particular page
  axios
    .get(
      `${base_url}/v1/56/tokens/${req.params.contract}/nft_token_ids/?key=${key}&page-number=${req.params.page}`
    )
    .then((result) => {
      res.json(result.data.data.items);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = getAllTokens;
