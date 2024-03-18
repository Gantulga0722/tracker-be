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

async function addTransaction(transactionInfo) {
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

async function updateTransaction() {
  let response;
  const client = await pool.connect();
  const Query = "ALTER TABLE transaction ADD FOREIGN KEY (user_id)";
  try {
    response = await client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("transaction updated successfully");
  }
  return response;
}

async function deleteTransaction() {
  let response;
  const client = await pool.connect();
  const Query = "DELETE FROM transaction WHERE (description='Forex');";
  try {
    response = await client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("category deleted successfully");
  }
  return response;
}

module.exports = {
  addTransaction,
  updateTransaction,
  deleteTransaction,
};
