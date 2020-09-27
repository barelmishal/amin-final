var express = require('express');
var router = express.Router();
var db = require('../db');


router.post("/", async (req, res, next) => {
  let trx;
  try {
    trx = await db.transaction();
    const recipeIds = await trx('recipes').insert({recipe_description: 'Untitled recipe'}, 'id');
    await trx.commit();
    
    res.json({
      IdRecipe: recipeIds[0]
    })
  } catch (err) {
      console.error(err);
    if (trx) {
      await trx.rollback(err)
    }
    next(err);    
  }
});

router.get("/food-search", async (req, res, next) => {
  
  try {
    const recipeIds = req.query.recipeIds.split(',');
    const recipes = await db('recipes').select().whereIn('id', recipeIds);
    const foods = await db('recipe_foods')
      .join('foods', 'foods.id', '=', 'recipe_foods.food_id')
      .select('foods.food_description', 'recipe_foods.amount', 'recipe_foods.recipe_id')
      .whereIn('recipe_foods.recipe_id', recipeIds); 

    res.json(recipes.map(r => ({
      ...r,
      foods: foods.filter(f => f.recipe_id === r.id)
    })));
  } catch (err) {
    next(err)
  }
});



module.exports = router;
