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

// async function getPgVersion() {
//   const client = await pool.connect();
//   try {
//     const result = await client.query("SELECT version()");
//     console.log(result.rows[0]);
//   } finally {
//     client.release();
//   }
// }

// getPgVersion();

app.post("/signup", async (req, res) => {
  const newUser = req.body;
  console.log("fytfbtfb", newUser);
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
  const newUser = req.body;
  console.log("fytfbtfb", newUser);
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
