const express = require("express");
require("dotenv").config();
const cors = require("cors");
const bodyParser = require("body-parser");
const corsOptions = {
  origin: "*",
  credentials: true,
  optionSuccessStatus: 200,
};

const dbConnection = require("./database/auth");
const authRouter = require("./routes/authRouter");
const productRouter = require("./routes/productRouter");
const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
dbConnection();
app.use("/uploads", express.static("uploads"));
app.use("/auth", authRouter);
app.use(productRouter);
app.listen(process.env.PORT, () => {
  console.log(`server started on port ${process.env.PORT}`);
});
