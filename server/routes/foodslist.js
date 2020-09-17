const axios = require('axios').default;
var express = require('express');
var jwt = require('jsonwebtoken');
var router = express.Router();
var db = require('../db');

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

router.post("/chose", async (req, res, next) => {
  let trx;
  // נתונים שאני צריך
  // בודק במאגר נתונים שלי
  try {
    const fdcFoodId = req.body.foodChosen;
    const checkFdcFoodIdInDb = await db('foods').where('fdc_id', fdcFoodId);
    if (checkFdcFoodIdInDb.length) {
      res.json(checkFdcFoodIdInDb[0].id);
    } else {
      trx = await db.transaction();
      const FoodData = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/?fdcIds=${fdcFoodId}&api_key=${FDC_API_KEY}`).then(resp => resp.data);
      let categoryIs = '';

      console.log(FoodData); 
      // boolen value that needed to get Category MeasureUnit
      let Branded    = (FoodData[0].dataType === 'Branded');
      let SrLegacy   = (FoodData[0].dataType === 'SR Legacy');
      let Foundation = (FoodData[0].dataType === 'Foundation');

      // import foods
      const getCategory = () => {
        if (Branded) {
          categoryIs = FoodData[0].brandedFoodCategory;
        } else if (SrLegacy || Foundation) {
          categoryIs = FoodData[0].foodCategory.description;
        } else {
          categoryIs = FoodData[0].wweiaFoodCategory.wweiaFoodCategoryDescription;
        }
        return categoryIs
      }
      getCategory()
      const [food, category, fdcId] = [FoodData[0].description, categoryIs, fdcFoodId];
      const insertNewFoodToDb = await trx('foods').insert([
      {
        food_category: category,
        fdc_id: fdcId,
        food_description: food
      },
      ], 'id');

      // import measure unit
      let dbmeasureUnit;
      const getMeasureUnit = () => {
        if (Branded) {
            dbmeasureUnit = {
            measure_unit_name: FoodData[0].householdServingFullText,
            abbreviation: null,
            fdc_id: fdcId
          }
        } else if (Foundation) {
            dbmeasureUnit = FoodData[0].foodPortions.map(p => ({
            measure_unit_name: p.measureUnit.name,
            abbreviation: p.measureUnit.abbreviation,
            fdc_id: fdcId
          }));
        } else if (SrLegacy) {
            dbmeasureUnit = FoodData[0].foodPortions.map(p => ({
              measure_unit_name: p.modifier,
            abbreviation: null,
            fdc_id: fdcId
          }));
        } else {
            dbmeasureUnit = FoodData[0].foodPortions.map(p => ({
              measure_unit_name: p.portionDescription,
              abbreviation: null,
              fdc_id: fdcId
            }));
          }
          return dbmeasureUnit
        }
      getMeasureUnit();
      const insertNewMeasurUnits = await trx('measure_units').insert(dbmeasureUnit, 'id');
      console.log(insertNewMeasurUnits, dbmeasureUnit);

      // import lj
      await trx.commit();


    }
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback(err)
    }
    next(err);    
  }
});

// const arr = db.select('fdc_id').from('foods').then(user => {console.log(user)});
// const id = arr
// console.log(id);

module.exports = router;