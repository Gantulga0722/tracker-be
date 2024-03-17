const transactionRouter = require("express").Router();
const {
  addTransaction,
  updateTransaction,
  deleteTransaction,
} = require("../service/transaction-service");

transactionRouter.post("/add-transaction", async (req, res) => {
  const newCategory = req.body;
  const result = await addTransaction(newCategory);

  res.json(result);
});

transactionRouter.post("/update-transaction", async (req, res) => {
  const result = await updateTransaction();

  res.json(result);
});

transactionRouter.post("/update-transaction", async (req, res) => {
  const result = await deleteTransaction();

  res.json(result);
});

module.exports = {
  transactionRouter,
};
