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

exports.alterTable = async (req, res) => {
  const user = req.body;
  const client = await pool.connect();
  const Query = `ALTER TABLE transaction ALTER COLUMN user_id TYPE VARCHAR(255)`;

  try {
    const response = await client.query(Query);
    return res.status(200).send({ result: "success" });
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("table altered successfully");
  }
};
