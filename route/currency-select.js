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

exports.currencySelect = async (req, res) => {
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
};
