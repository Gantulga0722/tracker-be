const { Pool } = require("pg");

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, PGPORT } = process.env;

const pool = new Pool({
  host: PGHOST,
  database: PGDATABASE,
  username: PGUSER,
  password: PGPASSWORD,
  port: PGPORT,
  ssl: {
    require: true,
  },
  keepAlive: true,
});

async function addUser(userInfo) {
  let response;
  const client = await pool.connect();
  const Query =
    ("INSERT INTO users (name, email, password, id) VALUES ($1, $2, $3)",
    [userInfo.name, userInfo.email, userInfo.password]);
  try {
    response = await client.query(Query);
  } catch (error) {
    console.log(error);
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("user add successfully");
  }
  return response.rows;
}

async function getUser(userInfo) {
  let response;
  const client = await pool.connect();
  const Query =
    ("SELECT * FROM users WHERE (email=$1 AND password=$2)",
    [userInfo.email, userInfo.password]);

  try {
    response = await client.query(Query);
    if (response["rowCount"]) {
      return res.status(200).send({ result: response });
    } else {
      return res.status(500).send({ success: "false" });
    }
  } catch (error) {
    throw new Error(error ? error.message : "Error");
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }
}

async function currencySelect(userInfo) {
  const request = req.body;
  const client = await pool.connect();
  const Query =
    ("UPDATE users SET currency_type=$1 WHERE (id=$2",
    [userInfo.currency, userInfo.id]);
  try {
    const response = client.query(Query);
    if (response["rowCount"]) {
      return res.status(200).send({ message: "Success" });
    } else {
      return res.status(500).send({ message: "Something went wrong" });
    }
  } catch (error) {
    console.log(e);
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("Currency added successfully");
  }
}

module.exports = {
  addUser,
  getUser,
  currencySelect,
};
