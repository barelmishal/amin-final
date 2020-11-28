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
});

module.exports = router;
