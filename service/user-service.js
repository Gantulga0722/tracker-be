const { Pool } = require("pg");

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

async function signup(userInfo) {
  let response;
  const client = await pool.connect();
  const Query =
    ("INSERT INTO users (name, email, password, id) VALUES ($1, $2, $3)",
    [userInfo.name, userInfo.email, userInfo.password]);
  try {
    response = await client.query(Query);
  } catch (error) {
    throw new Error(error ? error.message : "Error");
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }
  return response.rows;
}

async function login() {
  let response;
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
  } catch (error) {
    throw new Error(error ? error.message : "Error");
    console.log(e);
  } finally {
    client.release();
    console.log("user add successfully");
  }
}

async function currencySelect() {
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
  } catch (error) {
    console.log(e);
    throw new Error(error ? error.message : "Error");
  } finally {
    client.release();
    console.log("Currency added successfully");
  }
}
