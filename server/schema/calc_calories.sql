select
  concat('"', recipes.recipe_description, '" has'),
  recipe_foods.amount as amount_in_recipe,
  concat(measure_units.measure_unit_name, ' of ') as measure_unit,
  foods.food_description as food_description,
  concat(food_nutrients.amount, ' ', nutrients.unit_name, ' per 100 gram') as food_kcal_per_100_gram,
  concat(food_portions.gram_weight, ' g per ', measure_units.measure_unit_name) as grams_per_portion,
  concat(((recipe_foods.amount * food_portions.gram_weight) / 100) * food_nutrients.amount, ' ', nutrients.unit_name) as total_calories
from
  recipe_foods inner join
  foods on foods.id = recipe_foods.food_id inner join
  food_nutrients on food_nutrients.food_id = recipe_foods.food_id inner join
  food_portions on food_portions.id = recipe_foods.food_portion_id inner join
  measure_units on measure_units.id = food_portions.measure_unit_id inner join
  nutrients on nutrients.id = food_nutrients.nutrient_id inner join
  recipes on recipes.id = recipe_foods.recipe_id
where
  food_nutrients.nutrient_id = 1 and -- This will return the Energy in kcal nutrient
  recipe_foods.recipe_id = 1; -- This will return foods only from the Delicious salad recipe

-- This select should result in
--            concat            | amount_in_recipe | measure_unit |   food_description   | food_kcal_per_100_gram | grams_per_portion | total_calories 
--------------------------------+------------------+--------------+----------------------+------------------------+-------------------+----------------
-- "Delicious salad recipe" has |                1 | cup of       | Tomatoes, grape, raw | 27 kcal per 100 gram   | 152 g per cup     | 41.04 kcal
-- (1 row)


select
  concat('"', recipes.recipe_description, '" has'),
  recipe_foods.amount as amount_in_recipe,
  concat(measure_units.measure_unit_name, ' of ') as measure_unit,
  foods.food_description as food_description,
  concat(food_nutrients.amount, ' ', nutrients.unit_name, ' per 100 gram') as food_kcal_per_100_gram,
  concat(food_portions.gram_weight, ' g per ', measure_units.measure_unit_name) as grams_per_portion,
  concat(((recipe_foods.amount * food_portions.gram_weight) / 100) * food_nutrients.amount, ' ', nutrients.unit_name) as total_calories
from
  recipe_foods inner join
  foods on foods.id = recipe_foods.food_id inner join
  food_nutrients on food_nutrients.food_id = recipe_foods.food_id inner join
  food_portions on food_portions.id = recipe_foods.food_portion_id inner join
  measure_units on measure_units.id = food_portions.measure_unit_id inner join
  nutrients on nutrients.id = food_nutrients.nutrient_id inner join
  recipes on recipes.id = recipe_foods.recipe_id
where
  -- This will return the Energy in kcal nutrient
  recipe_foods.recipe_id = 1; -- This will return foods only from the Delicious salad recipe

SELECT * FROM users;

select * from users join user_menus on users.id = user_menus.user_id;
select * from menus join user_menus on menus.id = user_menus.menu_id;
select * from foods join recipe_foods on food.id = recipe_foods.food_id

select 
  * 
from 
  users join
  user_menus on users.id = user_menus.user_id join
  menus on menus.id = user_menus.menu_id;

  select 
  * 
from 
  nutrients join
  food_nutrients on nutrients.id = food_nutrients.nutrient_id join
  foods on foods.id = food_nutrients.food_id;


SELECT * FROM measure_units;

UPDATE recipe_foods SET food_portion_id = 31 WHERE recipe_id=1;