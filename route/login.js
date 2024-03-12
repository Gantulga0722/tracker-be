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

exports.login = async (req, res) => {
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
};
