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
      console.log(FoodData)
      const getCategory = () => {
        if (FoodData[0].dataType === 'Branded') {
          return categoryIs = FoodData[0].brandedFoodCategory;
        } else if ('Foundation' === FoodData[0].dataType || 'SR Legacy' === FoodData[0].dataType) {
          return categoryIs = FoodData[0].foodCategory.description;
        } else { // then - Survey (FNDDS)
          return categoryIs = FoodData[0].wweiaFoodCategory.wweiaFoodCategoryDescription;
        }
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
      console.log(insertNewFoodToDb);
      await trx.commit();
    }
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback(err)
    }
    next(err);    
  }
  // אחרי שהכנסתי את המידע אני רוצה לבדוק ולהחזיר את כל הנוטרינטים של המאכל הזה לכתובת    
});

// const arr = db.select('fdc_id').from('foods').then(user => {console.log(user)});
// const id = arr
// console.log(id);

module.exports = router;