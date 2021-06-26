const express = require("express");
const app = express();
const port = 3001;
const getAllTokens = require("./routes/getAllTokens");

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/contract", getAllTokens);

app.listen(port, () => {
  console.log(`listening at http://localhost:${port}`);
});
