const categoryRouter = require("express").Router();
const { getCategory } = require("../service/category-service");

categoryRouter.get("/get-category", async (req, res) => {
  const result = await getCategory();

  console.log(result);
  res.json(result);
});
