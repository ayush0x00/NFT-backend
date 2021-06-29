const express = require("express");
const bodyParser = require("body-parser");
const { parse, stringify } = require("flatted");
const axios = require("axios");
require("dotenv").config();
const base_url = process.env["BASE_URL"];
const key = process.env["KEY"];

const getTokenHistory = express.Router();
getTokenHistory.use(bodyParser.json());

getTokenHistory.get("/:contract/:tokenId", async (req, res, next) => {
  try {
    const result = await axios.get(
      `${base_url}/v1/56/tokens/${req.params.contract}/nft_transactions/${req.params.tokenId}/?key=${key}`
    );
    const history = result.data.data.items[0].nft_transactions;
    var info = [];
    history.filter((data) => {
      const res = data.log_events.filter((scrap) => {
        var fromTo = {};
        if (scrap.decoded && scrap.decoded.name === "Transfer") {
          fromTo.from = scrap.decoded.params[0].value;
          fromTo.to = scrap.decoded.params[1].value;
          fromTo.value = scrap.decoded.params[2].value;
          info.push(fromTo);
        }
      });
    });
    res.json(info.reverse());
  } catch (e) {
    console.log(e);
  }
});

module.exports = getTokenHistory;
