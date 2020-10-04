-- Stores user infomation
create table users (
  id integer primary key generated always as identity,
  google_id varchar(255) not null UNIQUE,
  email varchar(100) not null,
  first_name varchar(75),
  last_name varchar(75),
  created timestamp NOT NULL default current_timestamp,
  last_seen timestamp NOT NULL default current_timestamp
);

-- Stores the name of a Menus that a user creates and when they were created
create table menus (
  id integer primary key generated always as identity,
  menu_description varchar(250) not null, -- For example 'Lose weight fast menu' or 'ben menu'.
  created timestamp NOT NULL default current_timestamp
);

-- Stores a list of menus a user has.
-- user_menus produces the following:
-- Barel (a.k.a `user_id`) has the Gluten free birthday desserts menu (a.k.a `menu_id`).
-- Ben (a.k.a `user_id`) has the Lose weight fast menu (a.k.a `menu_id`).
create table user_menus (
  id integer primary key generated always as identity,
  menu_id int not null, -- For example reference to Lose weight fast menu.
  user_id int not null, -- For example reference to Barel.
  CONSTRAINT fk_user_menus_menu_id
    FOREIGN KEY (menu_id)
    REFERENCES menus(id),
  CONSTRAINT fk_user_menus_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(id)
);

-- Stores the name of a Recipe that a user creates and when they were created
create table recipes (
  id integer primary key generated always as identity,
  recipe_description varchar(250) not null, -- For example `Delicious salad recipe`.
  created timestamp NOT NULL default current_timestamp
);

-- Recipe foods produces the following:
-- Lose weight fast menu (a.k.a `menu_id`) has the _Delicious salad recipe_(a.k.a `recipe_id`).
-- Gluten free birthday desserts menu (a.k.a `menu_id`) has the _Ice cream cake recipe_(a.k.a `recipe_id`).
create table menu_recipes (
  id integer primary key generated always as identity,
  menu_id int not null, -- For example reference to Lose weight fast menu.
  recipe_id int not null, -- For example reference to Delicious salad recipe.
  CONSTRAINT fk_menu_recipes_menu_id
    FOREIGN KEY (menu_id)
    REFERENCES menus(id),
  CONSTRAINT fk_menu_recipes_recipe_id
    FOREIGN KEY (recipe_id)
    REFERENCES recipes(id)
);

create table user_recipes (
  id integer primary key generated always as identity,
  user_id int not null, -- For example reference to Lose weight fast menu.
  recipe_id int not null, -- For example reference to Delicious salad recipe.
  CONSTRAINT fk_user_recipes_user_id
    FOREIGN KEY (user_id)
    REFERENCES users(id),
  CONSTRAINT fk_user_recipes_recipe_id
    FOREIGN KEY (recipe_id)
    REFERENCES recipes(id)
);

-----------------------------------

-- Stores category names (). 
create table category (
  id integer primary key generated always as identity,
  food_category VARCHAR(250),
  fdc_id_category int UNIQUE
);

--------------------------------

-- Stores food names (for example 'Cucumber', 'Tomato', 'Vanila'). 
create table foods (
  id integer primary key generated always as identity,
  category_id int not null,
  fdc_id int UNIQUE,
  food_description varchar(250) not null,
  created timestamp NOT NULL default current_timestamp
  CONSTRAINT fk_category_id_foods_id
    FOREIGN KEY (category_id)
    REFERENCES category(id)
);



-- Teaspoons (a.k.a `measure_unit_name`) is abbreviated as 'tsp.' (a.k.a `abbreviation`).
-- Cup (a.k.a `measure_unit_name`) is abbreviated as 'Cup'. (a.k.a `abbreviation`).
-- Gram (a.k.a `measure_unit_name`) is abbreviated as 'g'. (a.k.a `abbreviation`).
create table measure_units (
  id integer primary key generated always as identity,
  fdc_id int UNIQUE, -- alter table measure_units drop not null;
  measure_unit_name varchar(200) not null, -- For example 'Teaspoons' or 'Cup'.
  abbreviation varchar(100) -- For example `tsp.` or `cup` or `g`.
);

-- Food potions prduces the following:
-- 1 (a.k.a `amount`) Cup (a.k.a `measure_unit_id`) of Cucumbers (a.k.a `food_id`) = 49.7 grams (a.k.a `gram_weight`).
-- 5 (a.k.a `amount`) Teaspoons (a.k.a `measure_unit_id`) of Flour (a.k.a `food_id`) = 52.9 grams (a.k.a `gram_weight`).
-- We need this table in order to calculate total calories.
create table food_portions (
  id integer primary key generated always as identity,
  fdc_id int UNIQUE,
  food_id int not null, -- For example reference to 'Cucumber'.
  measure_unit_id int not null, -- For example reference to 'Cup' or 'Teaspoon' or 'oz'.
  gram_weight real not null, -- For exmaple `49.7`. The weight in grams that `amount` of `food_id` in `measure_unit_id` equals. Will will use the to calculate calories.
  amount real not null, -- For example `1`.
  sequence_number int not null, -- Comes form the FDC API. The order to display in the drop down.
  CONSTRAINT fk_food_portions_nutrient_id
    FOREIGN KEY (food_id)
    REFERENCES foods(id),
  CONSTRAINT fk_food_portions_measure_unit_id
    FOREIGN KEY (measure_unit_id)
    REFERENCES measure_units(id)
);



-- Recipe foods produces the following:
-- Delicious salad recipe (a.k.a `recipe_id`) has 2 (a.k.a `amount`) cups (a.k.a `measure_unit_id`) of Tomatoes (a.k.a `food_id`).
-- Birtday cake recipe (a.k.a `recipe_id`) has 1 (a.k.a `amount`) teaspoon (a.k.a `measure_unit_id`) of Vanilla (a.k.a `food_id`).
create table recipe_foods (
  id integer primary key generated always as identity,
  recipe_id int not null, -- For example reference to 'Delicious salad recipe'.
  food_id int not null, -- For example reference to 'Tomatoes'.
  amount real, -- For example 2
  food_portion_id int, -- For example refrence to 'cups'.
  CONSTRAINT fk_recipe_foods_recipe_id
    FOREIGN KEY (recipe_id)
    REFERENCES recipes(id),
  CONSTRAINT fk_recipe_foods_food_id
    FOREIGN KEY (food_id)
    REFERENCES foods(id),
  CONSTRAINT fk_recipe_foods_measure_unit_id
    FOREIGN KEY (food_portion_id)
    REFERENCES food_portions(id) -- cup/ tsp
);

-- Nutrients produces the following:
-- Energy (a.k.a `nutrient_name`) in kcal (a.k.a `unit_name`).
-- Water (a.k.a `nutrient_name`) in grams (a.k.a `unit_name`).
-- Protein (a.k.a `nutrient_name`) in grams (a.k.a `unit_name`).
-- Calcium, Ca (a.k.a `nutrient_name`) in mg (a.k.a `unit_name`).
create table nutrients (
  id integer primary key generated always as identity,
  nutrient_name varchar(250) not null, -- For example 'Energy'.
  unit_name varchar(20) not null, -- For example 'kcal'.
  rank int not null, -- How important this nutrient it. This comes from the FDC API.
  fdc_id int UNIQUE,
  created timestamp NOT NULL default current_timestamp -- When as this nutrient created
);

-- Creates the list of nutrients that we support
-- It is CRITICAL to run this in the order specified below when we create the `nutrients` table
-- in order to garantee that we generate the correct ID column values that we will use in our app code.
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Energy', 'kcal', 1008, 300);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Protein', 'g', 1003, 600);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Total lipid (fat)', 'g', 1004, 800);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Carbohydrate, by difference', 'g', 1005, 1110);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Sugars, total including NLEA', 'g', 2000, 1510);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Fiber, total dietary', 'g', 1079, 1200);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Calcium, Ca', 'mg', 1087, 5300);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Iron, Fe', 'mg', 1089, 5400);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Sodium, Na', 'mg', 1093, 5800);
INSERT INTO nutrients (nutrient_name, unit_name, fdc_id, rank) VALUES ('Vitamin C, total ascorbic acid', 'mg', 1162, 6300);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin A, RAE', 'µg', 7420, 1106);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Vitamin B-12', 'µg', 7300, 1178);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Potassium, K', 'mg', 5700, 1092);
INSERT INTO nutrients (nutrient_name, unit_name, rank, fdc_id) VALUES ('Manganese, Mn', 'mg', 6100, 1101);


-- vita A 
-- folate
-- potassium



-- Food nutrients produces the following:
-- Tomatoe (a.k.a `food_id`) has 92.5 (a.k.a `amount`) of `Water` (a.k.a `nutrient_id`).
-- Tomatoe (a.k.a `food_id`) has 27 (a.k.a `amount`) of `Energy` (a.k.a `nutrient_id`).
-- Cucumber (a.k.a `food_id`) has 11 (a.k.a `amount`) of `Calcium, Ca` (a.k.a `nutrient_id`).
-- I KNOW YOU ARE LOOKING FOR grams, kcal, mg...
-- grams, kcal, mg are specified in the `nutrients` that this table has a reference (a.k.a foreign key) to.
create table food_nutrients (
  id integer primary key generated always as identity,
  fdc_id int UNIQUE, -- TODO: Update this in Barel's local DB to allow null. ALTER TABLE food_nutrients ALTER COLUMN fdc_id DROP NOT NULL;
  food_id int not null, -- For example reference to 'Cucumber'.
  nutrient_id int not null, -- For example reference to 'Energy' in kcal.
  amount real not null, -- For example 27 kcal *per 100 grams*.
  CONSTRAINT fk_food_nutrients_nutrient_id
    FOREIGN KEY (nutrient_id)
    REFERENCES nutrients(id),
  CONSTRAINT fk_food_nutrients_food_id
    FOREIGN KEY (food_id)
    REFERENCES foods(id)
);
