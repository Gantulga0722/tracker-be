const { Pool } = require("pg");
const express = require("express");

const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

require("dotenv").config();
const cors = require("cors");
app.use(cors());

const fs = require("fs");
const { error } = require("console");

let { PGHOST, PGDATABASE, PGUSER, PGPASSWORD } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: 5432,
  ssl: {
    require: true,
  },
});

app.post("/signup", async (req, res) => {
  const newUser = req.body;
  const client = await pool.connect();
  const Query = `INSERT INTO users (name, email, password, id) VALUES ('${newUser.name}','${newUser.email}','${newUser.password}','${newUser.id}');`;
  try {
    client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }

  res.status(200).send({ message: "User Added successfully" });
});

app.post("/login", async (req, res) => {
  const user = req.body;
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${user.email}' AND password='${user.password}');`;

  try {
    const response = await client.query(Query);
    console.log("response:", response);
    if (response["rowCount"]) {
      return res.status(200).send({ result: response });
    } else {
      return res.status(500).send({ success: "false" });
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }
});

app.post("/currency-select", async (req, res) => {
  const request = req.body;
  const client = await pool.connect();
  const Query = `UPDATE users SET currency_type='${request.currency}' WHERE (id='${request.id}');`;
  try {
    const response = client.query(Query);
    if (response["rowCount"]) {
      return res.status(200).send({ message: "Success" });
    } else {
      return res.status(500).send({ message: "Something went wrong" });
    }
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("Currency added successfully");
  }
});

app.post("/add-category", async (req, res) => {
  const request = req.body;
  console.log(request);
  const client = await pool.connect();
  const Query = `INSERT INTO category (category_image, name, id) VALUES('${request.icon}','${request.name}', '${request.id}');`;
  try {
    client.query(Query);
    res.status(200).send({ message: "success" });
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("category added successfully");
  }
});

// app.post("/update-category", async (req, res) => {
//   const client = await pool.connect();
//   const Query = "ALTER TABLE category ALTER COLUMN id TYPE VARCHAR(255)";
//   try {
//     client.query(Query);
//     res.status(200).send({ message: "Success" });
//   } catch (e) {
//     console.log(e);
//   } finally {
//     client.release();
//   }
// });

// async function getPgVersion() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query(
//       "AlTER TABLE users ALTER COLUMN currency_type TYPE TEXT"
//     );
//     console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }
// getPgVersion();

// async function getPgVersion() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query(
//       "ALTER TABLE users ALTER COLUMN id TYPE VARCHAR(255);"
//     );
//     console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion();

app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
