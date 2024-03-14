const { response } = require("express");
const { Pool } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pgConif = {
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
};

const pool = new Pool(pgConif);

async function addUser(userInfo) {
  console.log(userInfo);
  let response;

  const client = await pool.connect();

  const Query = `INSERT INTO users (name, email, password, id) VALUES ('${userInfo.name}', '${userInfo.email}', '${userInfo.password}', '${userInfo.id}')`;
  try {
    response = await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("user add successfully");
  }
  console.log(response.rows);
  return response.rows;
}

async function getUser(userInfo) {
  let response;
  const client = await pool.connect();
  const Query = `SELECT * FROM users WHERE (email='${userInfo.email}' AND password='${userInfo.password}');`;
  try {
    response = await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }
  return response;
}

async function currencySelect(userInfo) {
  const client = await pool.connect();
  const Query = `UPDATE users SET currency_type='${userInfo.currency}' WHERE (id='${userInfo.id}');`;

  try {
    const response = client.query(Query);
  } catch (error) {
    console.log(e);
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("Currency added successfully");
  }
  return response;
}

module.exports = {
  addUser,
  getUser,
  currencySelect,
};
