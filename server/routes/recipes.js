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


module.exports = router;
