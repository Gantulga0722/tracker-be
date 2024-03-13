const userRouter = require("express").Router();
const { addUser, getUser, currencySelect } = require("../service/user-service");

userRouter.post("/signup", async (req, res) => {
  const newUserData = req.body;
  const result = await addUser(newUserData);
  res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const newUserData = req.body;
  const result = await getUser(newUserData);
  res.json(result);
});

userRouter.post("/currency-select", async (req, res) => {
  const newUserData = req.body;
  const result = await currencySelect(newUserData);
  res.json(result);
});

module.exports = {
  userRouter,
};
