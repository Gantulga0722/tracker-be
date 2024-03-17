const userRouter = require("express").Router();
const {
  addUser,
  getUser,
  currencySelect,
  updateUser,
} = require("../service/user-service");

userRouter.post("/signup", async (req, res) => {
  const newUserData = req.body;
  console.log("route", newUserData);
  const result = await addUser(newUserData);
  res.json(result);
});

userRouter.post("/login", async (req, res) => {
  const newUserData = req.body;
  const result = await getUser(newUserData);
  if (result["rowCount"]) {
    return res.status(200).send({ result: result });
  } else {
    return res.status(500).send({ success: "false" });
  }
});

userRouter.post("/currency-select", async (req, res) => {
  const newUserData = req.body;
  const result = await currencySelect(newUserData);
  if (result["rowCount"]) {
    return res.status(200).send({ message: "Success" });
  } else {
    return res.status(500).send({ message: "Something went wrong" });
  }
});

userRouter.post("/update-users", async (req, res) => {
  const result = await updateUser();

  res.json(result);
});

module.exports = {
  userRouter,
};
