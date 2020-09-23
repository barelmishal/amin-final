const axios = require('axios').default;
var express = require('express');
var jwt = require('jsonwebtoken');
const { whereIn } = require('../db');
var router = express.Router();
var db = require('../db');

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

router.post("/", async (req, res, next) => {
  let trx;
  try {
      trx = await db.transaction();
      const recipe_name = await trx('recipes').insert({recipe_description: 'recipe 1'}, 'id');
    await trx.commit();
    
    res.json({
        IdRecipeName: recipe_name[0]
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