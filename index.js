const { Pool } = require("pg");
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("dotenv").config();
const cors = require("cors");
app.use(cors());

const { signup } = require("./route/singup");
const { login } = require("./route/login");
const { currencySelect } = require("./route/currency-select");
const { addCategory } = require("./route/add-category");
const { alterTable } = require("./route/alter-table");

const fs = require("fs");

const router = express.Router();

router.post("/login", login);
router.post("/signup", signup);
router.post("/currency-select", currencySelect);
router.post("/add-category", addCategory);
router.post("/alter-table", alterTable);
router.get("/get-category", alterTable);

app.use(router);

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
