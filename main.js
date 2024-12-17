const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");

const authRouter = require("./src/routes/auth");
const communityRouter = require("./src/routes/community");
const trackRouter = require("./src/routes/tracks")

require("dotenv").config();

const port = process.env.PORT || 4000;

app.use(express.json());
app.use(cors())

app.get("/", (req, res) => {
  res.send("Hello this is carbon tracker application!");
});

app.use("/auth", authRouter);
app.use("/community", communityRouter);
app.use("/tracks", trackRouter)

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}) .catch(err => console.log(err))
