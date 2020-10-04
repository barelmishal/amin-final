insert into menus (menu_description) values ('Lose weight fast menu'), ('Gluten free birthday desserts');

insert into user_menus (menu_id, user_id) values (1, 1);

insert into recipes (recipe_description) values ('Delicious salad recipe');

insert into menu_recipes (menu_id, recipe_id) values (1, 1);

insert into foods (fdc_id, food_description) values (321360, 'Tomatoes, grape, raw');
insert into foods (fdc_id, food_description) values (787791, 'Cucumber, raw');

insert into measure_units (fdc_id, measure_unit_name, abbreviation) values (1082, 'tomatoes', 'tomatoes');
insert into measure_units (fdc_id, measure_unit_name, abbreviation) values (1000, 'cup', 'cup');

insert into food_portions (
  fdc_id,
  food_id,
  measure_unit_id,
  amount,
  gram_weight,
  sequence_number
) values (
  118808,
  2,
  1,
  5,
  49.7,
  1
), (
  118809,
  2,
  2,
  1,
  152,
  2
);

insert into nutrients (fdc_id, nutrient_name, unit_name, rank) values (1008, 'Energy', 'kcal', 300);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) values (2220034, 2, 1, 27);

insert into recipe_foods (
  recipe_id,
  food_id,
  amount,
  food_portion_id
) values (
  1,
  2,
  1,
  2
);





INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Water', 'g', 92.5);
INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Energy', 'kcal', 27);
INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Nitrogen', 'g', 0.13);
INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Energy', 'kJ', 113);
INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Protein', 'g', 0.83);
INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Total_lipid_(fat)', 'g', 0.63);
INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Ash', 'g', 0.56);
INSERT INTO nutrients (fdc_id, nutrient_name, unit_name, rank) VALUES (787791, 'Carbohydrate_by_difference', 'g', 5.51);



-- NEW USER bar mish
INSERT INTO users (google_id, email, first_name, last_name) VALUES (GOOG123, bar.mish@gmail.com, bar, mish);

-- menu exempel FIRST USER
-- THE USER PRESS - "CREAT RECIPE"
-- IN SEARCH FOODS WE GET ALL THE PAREMETER OF FOODS NOT RECIPE OR MENU
INSERT INTO foods (food_description, fdc_id, food_category) VALUES ('Egg, whole, raw', 783909, 'Eggs and omelets');
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Protein', 'g', 600, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Total lipid (fat)', 'g', 800, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Carbohydrate, by difference', 'g', 1110, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Energy', 'kcal', 300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Alcohol, ethyl', 'g', 221, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Water', 'g', 100, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Caffeine', 'mg', 18300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Theobromine', 'mg', 18400, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Sugars, total including NLEA', 'g', 1510, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Fiber, total dietary', 'g', 1200, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Calcium, Ca', 'mg', 5300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Iron, Fe', 'mg', 5400, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Magnesium, Mg', 'mg', 5500, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Phosphorus, P', 'mg', 5600, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('otassium, K', 'mg', 5700, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Sodium, Na', 'mg', 5800, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Zinc, Zn', 'mg', 5900, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Copper, Cu', 'mg', 6000, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Selenium, Se', 'µg', 6200, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Retinol', 'µg', 7430, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin A, RAE', 'µg', 7420, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Carotene, beta', 'µg', 7440, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Carotene, alpha', 'µg', 7450, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin E (alpha-tocopherol)', 'mg', 7905, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin D (D2 + D3)', 'µg', 8700, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Cryptoxanthin, beta', 'µg', 7460, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Lycopene', 'µg', 7530, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Lutein + zeaxanthin', 'µg', 7560, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin C, total ascorbic acid', 'mg', 6300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Thiamin', 'mg', 6400, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Riboflavin', 'mg', 6500, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Niacin', 'mg', 6600, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin B-6', 'mg', 6800, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Folate, total', 'µg', 6900, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin B-12', 'µg', 7300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Choline, total', 'mg', 7220, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin K (phylloquinone)', 'µg', 8800, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Folic acid', 'µg', 7000, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Folate, DFE', 'µg', 7200, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin E, added', 'mg', 7920, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin B-12, added', 'µg', 7340, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Cholesterol', 'mg', 15700, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Fatty acids, total saturated', 'g', 9700, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('4:0', 'g', 9800, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('6:0', 'g', 9900, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('8:0', 'g', 10000, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('10:0', 'g', 10100, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('12:0', 'g', 10300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('14:0', 'g', 10500, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('16:0', 'g', 10700, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('18:0', 'g', 10900, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('18:1', 'g', 12100, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('18:2', 'g', 13100, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('18:3', 'g', 13900, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('20:4', 'g', 14700, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('22:6 n-3 (DHA)', 'g', 15300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('16:1', 'g', 11700, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('18:4', 'g', 14250, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('20:1', 'g', 12400, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('20:5 n-3 (EPA)', 'g', 15000, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('22:1', 'g', 12500, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('22:5 n-3 (DPA)', 'g', 15200, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Fatty acids, total monounsaturated', 'g', 11400, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Fatty acids, total polyunsaturated', 'g', 12900, 783909);
-- food_nutrients i am able to do that becuse i have nutrients alredy
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 18, 12.56);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 19, 9.51);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 20, 0.72);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 21, 143);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 22, 0);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 23, 76.15);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 24, 0);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 25, 0);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 25, 0.37);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 26, 0);
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) VALUES (783909, 5, 27, 56);
-- measure_units forgin key not dependet on other table
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (783909, 'undetermined', 'undetermined');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (783909, 'undetermined', 'undetermined');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (783909, 'undetermined', 'undetermined');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (783909, 'undetermined', 'undetermined');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (783909, 'undetermined', 'undetermined');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (783909, 'undetermined', 'undetermined');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (783909, 'undetermined', 'undetermined');

-- food_portions // where do i put 100g how this going to work?
INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number)
  VALUES
  (783909, 5, 9, 38, 1, '1 small', 1);
INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number)
  VALUES
  (783909, 5, 10, 44, 1, '1 medium', 2);
INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number)
  VALUES
  (783909, 5, 11, 50, 1, '1 large', 3);
INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number)
  VALUES
  (783909, 5, 12, 56, 1, '1 extra large', 4);
INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number)
  VALUES
  (783909, 5, 13, 63, 1, '1 jumbo', 5);
INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number)
  VALUES
  (783909, 5, 14, 243, 1, '1 cup (4.86 eggs)', 6);
INSERT INTO 
  food_portions 
  (fdc_id, food_id, 
  measure_unit_id, 
  gram_weight, 
  amount, 
  portion_description, 
  sequence_number)
  VALUES
  (783909, 
  5, 
 15, 
  50, 
  1, 
  'Quantity not specified', 
  7);

-- כאן שמתי לב שכדי לקחת את סוג המזון מאיפה לקחנו אותו במידה ונרצה לחפש אותו במאגר המקורי
-- Survey (FNDDS) לקוח מ
-- wweiaFoodCategoryDescription: "Eggs and omelets" (קטגוריה בSurvey)
-- in backend whene chosing the back end teck fdc_id and fill in nutrients, food_nutrients, food_portions, measure_units
INSERT INTO foods (food_description, fdc_id, food_category) VALUES ('Tomatoes, grape, raw', 321360, 'Vegetables and Vegetable Products');
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Proximates', 'g', 50, 321360);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Water', 'g', 100, 321360);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Energy', 'kcal', 300, 321360);
-- 
insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) values (321360, 3, 84, 27);

INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (321360, 'tomatoes', 'tomatoes');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (321360, 'cup', 'cup');

INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number) 
    VALUES 
    (321360, 3, 16, 49.7, 5, null, 1);
INSERT INTO 
  food_portions 
  (fdc_id, food_id, measure_unit_id, gram_weight, amount, portion_description, sequence_number) 
    VALUES 
    (321360, 3, 18, 152, 1, null, 2);


-- לקוח מ Foundation
-- foodCategory: {
-- id: 11,
-- code: "1100",
-- description: "Vegetables and Vegetable Products"
-- },
INSERT INTO foods (food_description, fdc_id, food_category) VALUES ('Cucumber, with peel, raw', 168409, 'Vegetables and Vegetable Products');
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Histidine', 'g', 17400, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Protein', 'g', 600, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Energy', 'kcal', 300, 783909);


insert into food_nutrients (fdc_id, food_id, nutrient_id, amount) values (321360, 3, 84, 27);

INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (321360, 'tomatoes', 'tomatoes');
INSERT INTO measure_units (fdc_id, measure_unit_name, abbreviation) VALUES (321360, 'cup', 'cup');




-- לקוח מSR Legacy
-- category same as Foundation
INSERT INTO foods (food_description, fdc_id, food_category) VALUES ('Spinach, raw', 168462, 'Vegetables and Vegetable Products');
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Energy', 'g', 300, 783909);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Water', 'g', 100, 783909);


-- recipes
INSERT INTO recipes (recipe_description) VALUES ('nutri recipe');
-- recipe_foods
INSERT INTO recipe_foods (recipe_id, food_id, amount, food_portion_id) VALUES (2, 5, 2, 12);
INSERT INTO recipe_foods (recipe_id, food_id, amount, food_portion_id) VALUES (2, 3, 2, 12);




-- אני רוצה להכניס קטגוריות לאוכל 
UPDATE name_table SET cul2= '2.2' WHERE name='user';