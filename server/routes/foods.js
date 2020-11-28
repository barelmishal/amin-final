var express = require("express");
var router = express.Router();
const csv = require("csv-parser");
const fs = require("fs");
const path = require("path");

const measureUnits = [];
fs.createReadStream(path.join(__dirname, "../csv_db/midot.csv"))
  .pipe(csv())
  .on("data", (data) => {
    measureUnits.push(data);
  });

const foodPortions = [];
fs.createReadStream(path.join(__dirname, "../csv_db/midot_mitzrachim.csv"))
  .pipe(csv())
  .on("data", (data) => {
    foodPortions.push(data);
  });

const foods = [];
fs.createReadStream(path.join(__dirname, "../csv_db/mitzrachim.csv"))
  .pipe(csv())
  .on("data", (data) => {
    foods.push(data);
  });

router.get("/search", async (req, res, next) => {
  const query = req.query.q;
  const results = foods.filter((f) => f.shmmitzrach.startsWith(query));
  res.json(
    results.map((r) => ({
      ...r,
      foodPortions: foodPortions
        .filter((p) => p.mmitzrach === r.id)
        .map((m) => ({
          ...m,
          measureUnitName: measureUnits.find((u) => u.smlmida === m.mida)
            .shmmida,
        })),
    }))
  );
});

module.exports = router;
