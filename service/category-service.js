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

async function addCategory(categoryInfo) {
  console.log(categoryInfo);
  let response;

  const client = await pool.connect();

  const Query = `INSERT INTO category (category_image, name, id) VALUES ('${categoryInfo.icon}', '${categoryInfo.name}', '${categoryInfo.id}')`;
  try {
    response = await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("category added successfully");
  }

  return response;
}

async function getCategory() {
  let response;
  const client = await pool.connect();
  const Query = "SELECT * FROM category";
  try {
    response = await client.query(Query);
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("category selected successfully");
  }

  return response.rows;
}
async function deleteCategory() {
  let response;
  const client = await pool.connect();
  const Query = "DELETE FROM category WHERE (name='undefined');";
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
  getCategory,
  deleteCategory,
  addCategory,
};
