var express = require("express");
var router = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

router.get("/search", async (req, res, next) => {
  const query = req.query.q;
  const results = [];
  fs.createReadStream(path.join(__dirname, "../csv_db/mitzrachim.csv"))
    .pipe(csv())
    .on("data", (data) => {
      if (data.shmmitzrach.startsWith(query)) {
        results.push(data);
      }
    })
    .on("end", () => {
      res.json(results);
    });
});

module.exports = router;
