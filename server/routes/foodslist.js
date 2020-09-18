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
      
      
      // Import measure units
      const fdcMeasures = new Map();
      FoodData.forEach(f => f.foodPortions.forEach((p, i) => {
        if (p.measureUnit.id === 9999) {
          fdcMeasures.set(-i, {name: p.portionDescription || p.modifier, foodPortionId: p.id});
        } else {
          fdcMeasures.set(p.measureUnit.id, p.measureUnit);
        }
      }));
      const dbMeasures = await db('measure_units').select('id', 'fdc_id').whereIn('fdc_id', Array.from(fdcMeasures.keys()));
      const newFdcMeasures = Array.from(fdcMeasures.values()).filter(fdcm => !dbMeasures.find(dbm => dbm.fdc_id === fdcm.id));
      const newDbMeasures = newFdcMeasures.map(m => ({fdc_id: m.id, measure_unit_name: m.name, abbreviation: m.abbreviation}));
      const newMids = await trx('measure_units').insert(newDbMeasures, 'id');
      const allDbMeasures = [...dbMeasures, ...newDbMeasures.map((dbm, idx) => ({
        ...dbm,
        food_portion_id: newFdcMeasures[idx].foodPortionId,
        id: newMids[idx]
      }))];
      
      // boolen value that needed to get Category MeasureUnit
      let Branded    = (FoodData[0].dataType === 'Branded');
      let SrLegacy   = (FoodData[0].dataType === 'SR Legacy');
      let Foundation = (FoodData[0].dataType === 'Foundation');
      
      // import foods
      let categoryIs = '';
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
      }], 'id');      

      // import 
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