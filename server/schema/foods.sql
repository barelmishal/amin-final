CREATE TABLE foods (
    id int PRIMARY KEY generated always as identity,
    fdc_id int UNIQUE,
    item_description text
    -- CONSTRAINT fk_food_user FOREIGN KEY(user_id) REFERENCES users(id)
);

81 |          47 | 789565 | Apple juice beverage, 40-50% juice, light                                | 2020-09-21 11:44:33.444917
 82 |          61 | 786919 | Apple juice, with added calcium, baby food                               | 2020-09-21 17:23:59.380678
 83 |          62 | 786638 | Apple, baked, NS as to added sweetener                                   | 2020-09-21 17:25:13.588367
 84 |          63 | 781801 | Alfredo sauce with meat and added vegetables                             | 2020-09-22 09:22:47.608351
 85 |          40 | 789287 | 3 Musketeers Truffle Crisp Bar                                           | 2020-09-22 09:23:57.878245
 86 |          64 | 781153 | Yogurt, Greek, nonfat milk, flavors other than fruit                     | 2020-09-22 09:24:30.838703
 87 |          65 | 781149 | Yogurt, nonfat milk, flavors other than fruit                            | 2020-09-22 09:26:34.508543
food_portion
  10 | 197814 |      63 |             108 |         133 |      1 |              10

insert INTO recipe_foods (recipe_id, food_id, amount, food_portion_id) VALUES (1, 81, 1, 10);
insert INTO recipe_foods (recipe_id, food_id, amount, food_portion_id) VALUES (4, 83, 1, 10);