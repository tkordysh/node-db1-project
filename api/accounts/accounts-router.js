const router = require("express").Router(); 
const md = require("./accounts-middleware"); // bringing in middleware
const Account = require('./accounts-model') // bringing in accounts model (db access functions)


router.get("/", async (req, res, next) => {
  try {
    const accounts = await Account.getAll();
    res.json(accounts);
  } catch (err) {
    next(err);
  }
});

router.get("/:id", md.checkAccountId, (req, res, next) => {
  res.json(req.account)
});

router.post(
  "/",
  md.checkAccountPayload,
  md.checkAccountNameUnique,
  (req, res, next) => {
    // DO YOUR MAGIC
    try {
      res.json("create account");
    } catch (err) {
      next(err);
    }
  }
);

router.put(
  "/:id",
  md.checkAccountId,
  md.checkAccountNameUnique,
  md.checkAccountPayload,
  (req, res, next) => {
    // DO YOUR MAGIC
    try {
      res.json("update accounts");
    } catch (err) {
      next(err);
    }
  }
);

router.delete("/:id", md.checkAccountId, (req, res, next) => {
  // DO YOUR MAGIC
  try {
    res.json("delete accounts");
  } catch (err) {
    next(err);
  }
});

router.use((err, req, res, next) => {
  // eslint-disable-line
  res.status(err.status || 500).json({
    message: err.message,
  });
});

module.exports = router;
