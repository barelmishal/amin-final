var express = require("express");
var router = express.Router();
var db = require("../db");

router.post("/", async (req, res, next) => {
  let trx;
  try {
    trx = await db.transaction();
    const recipeIds = await trx("recipes").insert(
      { recipe_description: "Untitled recipe" },
      "id"
    );
    await trx.commit();

    res.json({
      IdRecipe: recipeIds[0],
    });
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback(err);
    }
    next(err);
  }
});

router.put("/:id", async (req, res, next) => {
  let trx;
  try {
    trx = await db.transaction();

    await trx("recipes")
      .update({
        recipe_description: req.body.recipe_description,
      })
      .where({ id: req.params.id });

    await trx.commit();

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback(err);
    }
    next(err);
  }
});

router.put("/recipe-foods/:id", async (req, res, next) => {
  let trx;
  try {
    trx = await db.transaction();

    await trx("recipe_foods")
      .update({
        amount: req.body.amount,
        food_portion_id: req.body.food_portion_id,
      })
      .where({ id: req.params.id });

    await trx.commit();

    res.sendStatus(200);
  } catch (err) {
    console.error(err);
    if (trx) {
      await trx.rollback(err);
    }
    next(err);
  }
});

router.get("/food-search", async (req, res, next) => {
  try {
    const recipeIds = req.query.recipeIds.split(",");
    const recipes = await db("recipes")
      .select()
      .whereIn("id", recipeIds)
      .orderBy("created", "desc");
    const foods = await db("recipe_foods")
      .join("foods", "foods.id", "=", "recipe_foods.food_id")
      .select(
        "foods.id",
        { recipe_foods_id: "recipe_foods.id" },
        "recipe_foods.food_portion_id",
        "foods.food_description",
        "recipe_foods.amount",
        "recipe_foods.recipe_id"
      )
      .whereIn("recipe_foods.recipe_id", recipeIds);

    const foodsIds = foods.map((f) => f.id);
    const foodPortions = await db("food_portions")
      .join(
        "measure_units",
        "measure_units.id",
        "=",
        "food_portions.measure_unit_id"
      )
      .select(
        "food_portions.gram_weight",
        "food_portions.id",
        "measure_units.measure_unit_name",
        "food_portions.food_id"
      )
      .whereIn("food_portions.food_id", foodsIds)
      .orderBy("sequence_number");

    const foodNutrients = await db("food_nutrients")
      .join("nutrients", "nutrients.id", "=", "food_nutrients.nutrient_id")
      .select(
        "food_nutrients.food_id",
        "food_nutrients.nutrient_id",
        "food_nutrients.amount",
        "nutrients.nutrient_name",
        "nutrients.unit_name"
      )
      .whereIn("food_nutrients.food_id", foodsIds)
      .where("nutrients.id", "=", 1);

    res.json(
      recipes.map((r) => ({
        ...r,
        foods: foods
          .filter((f) => f.recipe_id === r.id)
          .map((f) => ({
            ...f,
            foodPortions: foodPortions.filter((p) => p.food_id === f.id),
            foodNutrients: foodNutrients.filter((n) => n.food_id === f.id),
          })),
      }))
    );
  } catch (err) {
    next(err);
  }
});

module.exports = router;
