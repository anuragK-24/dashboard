const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const cors = require("cors");
const mongoose = require("mongoose");
const get = require("./routes/get");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
const uri = process.env.MONGO_URL;

mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log(err);
  });

app.use("/get", get);
app.get("/", (req, res) => {
  res.send("Hello World!");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server is running on  http://localhost:${PORT}`);
});
