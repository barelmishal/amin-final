var express = require("express");
var router = express.Router();
var db = require("../db");

router.get("/amounts", async (req, res, next) => {});

router.post("/amounts", async (req, res, next) => {
  let trx;
  try {
    trx = await db.transaction();
    console.log(req);
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback(err);
    }
    next(err);
  }
});

module.exports = router;
