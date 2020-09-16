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
      


      console.log(FoodData); 
      // boolen value that needed to get Category MeasureUnit
      let branded    = (FoodData[0].dataType === 'Branded');
      let srLegacy   = (FoodData[0].dataType === 'SR Legacy');
      let foundation = (FoodData[0].dataType === 'Foundation');
      
      let dataOrgi;
      const getDataOrgi = () => {
        dataOrgi = [
        {
          // add to foods dataOrgi[0]
          fdc_id: fdcFoodId,
          food_description: FoodData[0].description,
        },
        {
          // adds to measure_units dataOrgi[1]
          Branded: null,
          SrLegacy: null,
          Foundation: null,
          survay: null
        },
        {

        }
        ]
        if (branded) {
          dataOrgi[0].food_category = FoodData[0].brandedFoodCategory;
          dataOrgi[1].Branded.measure_unit_name = FoodData[0].householdServingFullText;
          dataOrgi[1].Branded.abbreviation = null;
          dataOrgi[1].Branded.fdc_id = fdcFoodId;
        } else if (srLegacy) {
          dataOrgi[0].food_category = FoodData[0].foodCategory.description;
          dataOrgi[1].SrLegacy = FoodData[0].foodPortions.map(p => ({
            measure_unit_name: p.modifier,
            abbreviation: null,
            fdc_id: fdcId
          }));
        } else if (foundation) {
          dataOrgi[0].food_category = FoodData[0].foodCategory.description;
          dataOrgi[1].Foundation = FoodData[0].foodPortions.map(p => ({
            measure_unit_name: p.measureUnit.name,
            abbreviation: p.measureUnit.abbreviation,
            fdc_id: fdcId
          }));
        } else {
          dataOrgi[0].food_category = FoodData[0].wweiaFoodCategory.wweiaFoodCategoryDescription;
          dataOrgi[1].survay = FoodData[0].foodPortions.map(p => ({
            measure_unit_name: p.portionDescription,
            abbreviation: null,
            fdc_id: fdcId
          }));
        }
      }
      getDataOrgi()
      console.log(dataOrgi)
       
      const insertNewFoodToDb = await trx('foods').insert(dataOrgi[0], 'id');
      const insertNewMeasurUnits = await trx('measure_units').insert(dbmeasureUnit, 'id');
      // after got data for two of this food we need to join them and add amounts
      const insertNewFoodPortions = await trx('food_portions').insert(dbmeasureUnit, 'id');
      // after the insertion of "food_portions" we get nutrients_id and filter from what we have in database
      // after that join the table with food nutrients


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