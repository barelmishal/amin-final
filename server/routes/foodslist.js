const axios = require('axios').default;
var express = require('express');
var jwt = require('jsonwebtoken');
const { whereIn } = require('../db');
var router = express.Router();
var db = require('../db');

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

router.post("/id", async (req, res, next) => {
  let trx;
  try {
    const fdcFoodId = req.body.foodChosen;
    const checkFdcFoodIdInDb = await db('foods').where('fdc_id', fdcFoodId);
    if (checkFdcFoodIdInDb.length) {
      res.json(checkFdcFoodIdInDb[0].id);
    } else {
      trx = await db.transaction();
      const FoodData = await axios.get(`https://api.nal.usda.gov/fdc/v1/foods/?fdcIds=${fdcFoodId}&api_key=${FDC_API_KEY}`).then(resp => resp.data);
      
      // import category
      const checkCategoryDb = await trx('category').select('id', 'fdc_id_category').whereIn('fdc_id_category', [FoodData[0].wweiaFoodCategory.wweiaFoodCategoryCode]);
      let dbInsertCategory;
      if (!checkCategoryDb.length) { 
          const objForCategory = {
          food_category: FoodData[0].wweiaFoodCategory.wweiaFoodCategoryDescription,
          fdc_id_category: FoodData[0].wweiaFoodCategory.wweiaFoodCategoryCode
        };
        dbInsertCategory = await trx('category').insert([objForCategory], 'id');
      } else {
        null
      };
      // import foods
      const objForFoods = {
        food_description: FoodData[0].description,
        fdc_id: fdcFoodId,
        category_id: (dbInsertCategory !== undefined ? (dbInsertCategory[0]) : (false)) || (checkCategoryDb[0].id) 
      };
      const insertfood = await trx('foods').insert([objForFoods], 'id');

      // import measure_units and portion
      const objmeasureUnitsAndPortion = FoodData[0].foodPortions.map(p => ({
        // measure_units
        fdc_id: Number(p.modifier), 
        measure_unit_name: p.portionDescription,
        // food_portions 
        gram_weight: p.gramWeight,
        fdc_id_portion: p.id, 
        amount: 1,
        sequence_number: p.sequenceNumber,
        food_id: insertfood
      }));
      // check measure units in db
      const idsMeasureUnits = objmeasureUnitsAndPortion.map(id => id.fdc_id);
      const checkmeasureUnitsDb = await trx('measure_units').select('id', 'fdc_id').whereIn('fdc_id', idsMeasureUnits);
      // filter ids
      const arrayofobjM = objmeasureUnitsAndPortion.map(m => ({fdc_id: m.fdc_id, measure_unit_name: m.measure_unit_name}));
      const filterobjM = arrayofobjM.filter(m => !checkmeasureUnitsDb.find(x => x.fdc_id === m.fdc_id));
      
      // insert
      const insertMeasureUnits = await trx('measure_units').insert(filterobjM, 'id');
      const objP = [...checkmeasureUnitsDb, ...filterobjM.map((mesureU, idx) => ({
        ...mesureU, id: insertMeasureUnits[idx]
      }))];
      const dbfoodP = objmeasureUnitsAndPortion.map(p => ({
        gram_weight: p.gram_weight,
        fdc_id: p.fdc_id_portion, 
        sequence_number: p.sequence_number,
        amount: p.amount,
        food_id: insertfood[0],
        measure_unit_id: objP.find(i => i.fdc_id === p.fdc_id).id
      }));
      const insertP = await trx('food_portions').insert(dbfoodP);

      // import nutrients
      const getdbnutrients = await trx('nutrients').select('id', 'fdc_id');
      // filter nutrients
      const mapDbNutirents = new Map(getdbnutrients.map(n => [n.fdc_id, n.id]));
      const filterN = FoodData[0].foodNutrients.filter(e => mapDbNutirents.has(e.nutrient.id));
      // obj preper
      const fdcNutreintIds = filterN.map(e => ({
        food_id: insertfood[0],
        fdc_id: e.id,
        nutrient_id: mapDbNutirents.get(e.nutrient.id),
        amount: e.amount
      }));
      // insert db food nutrinets
      const insertDbN = await trx('food_nutrients').insert(fdcNutreintIds, 'id');
      console.log(insertDbN);

      // commit db to make sure that the data is pass 
      await trx.commit();
      res.json(insertfood[0]);
    }
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback(err)
    }
    next(err);    
  }
});


module.exports = router;