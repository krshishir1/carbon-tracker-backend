const express = require("express");
const app = express();
const mongoose = require("mongoose");

require("dotenv").config();

const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello this is carbon tracker application!");
});

mongoose.connect(process.env.MONGODB_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}) .catch(err => console.log(err))
