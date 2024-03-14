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

async function getCategory() {
  let response;
  const client = await pool.connect();
  const Query = `SELECT * FROM category`;
  try {
    response = await client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("category added successfully");
  }
  return response;
}

module.exports = {
  getCategory,
};
