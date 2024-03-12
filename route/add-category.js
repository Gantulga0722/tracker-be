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

exports.addCategory = async (req, res) => {
  const request = req.body;
  console.log(request);
  const client = await pool.connect();
  const Query = `INSERT INTO category (category_image, name, id) VALUES('${request.icon}','${request.name}', '${request.id}');`;
  try {
    client.query(Query);
    res.status(200).send({ message: "success" });
  } catch (e) {
    console.log(e);
  } finally {
    client.release();
    console.log("category added successfully");
  }
};
