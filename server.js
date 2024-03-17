const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const { categoryRouter } = require("./route/category.js");
const { userRouter } = require("./route/user.js");
const { transactionRouter } = require("./route/transaction.js");
const app = express();

app.use(bodyParser.json());
app.use(cors());
app.use(userRouter);
app.use(categoryRouter);
app.use(transactionRouter);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
