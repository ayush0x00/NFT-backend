const express = require("express");
const app = express();
const port = 3001;
const getTokenHistory = require("./routes/getTokenHistory");
const getAllTokens = require("./routes/getAllTokens");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/contract", getAllTokens);
app.use("/token", getTokenHistory);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
