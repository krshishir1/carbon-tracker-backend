const express = require("express");
const app = express();
const mongoose = require("mongoose");

const authRouter = require("./src/routes/auth");
const communityRouter = require("./src/routes/community");

require("dotenv").config();

const port = process.env.PORT || 3000;


app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello this is carbon tracker application!");
});

app.use("/auth", authRouter);
app.use("/community", communityRouter);

mongoose.connect(process.env.MONGO_URI).then(() => {
  app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
  });
}) .catch(err => console.log(err))
