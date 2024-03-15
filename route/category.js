const categoryRouter = require("express").Router();
const {
  addCategory,
  getCategory,
  deleteCategory,
} = require("../service/category-service");

categoryRouter.post("/add-category", async (req, res) => {
  const newCategory = req.body;
  const result = await addCategory(newCategory);

  res.json(result);
});

categoryRouter.get("/get-category", async (req, res) => {
  const result = await getCategory();

  res.json(result);
});

categoryRouter.post("/delete-category", async (req, res) => {
  const result = await deleteCategory();

  res.json(result);
});

module.exports = {
  categoryRouter,
};
