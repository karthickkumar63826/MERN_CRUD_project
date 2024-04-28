require("dotenv").config();
const connectionDB = require("./utils/database");
const express = require("express");
const cors = require("cors");
const itemRoutes = require("./Routers/itemRouter");

const app = express();
const port = process.env.PORT || 8000;
app.use(express.json());
app.use(cors());

const start = async () => {
  try {
    await connectionDB(process.env.MONGO_LOCAL_URL);
    console.log("connected");
    app.listen(port, () => {
      console.log(`server is running on port no ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

start();
app.use("/items", itemRoutes);
