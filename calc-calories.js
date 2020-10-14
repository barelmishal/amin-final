const recipeis = [
  {
    id: 54,
    recipe_description: "Untitled recipe",
    created: "2020-09-29T08:41:08.483Z",
    foods: [
      {
        id: 90,
        recipe_foods_id: 15,
        food_portion_id: 110,
        food_description:
          "Hot chocolate / Cocoa, made with no sugar added dry mix and low fat milk",

        amount: 3,

        recipe_id: 54,
        foodPortions: [
          {
            gram_weight: 199,
            measure_unit_name: "1 packet, reconstituted",
            id: 107,
            food_id: 90,
          },
          {
            gram_weight: 248,
            id: 108,
            measure_unit_name: "1 cup",
            food_id: 90,
          },
          {
            gram_weight: 31,
            id: 109,
            measure_unit_name: "1 fl oz",
            food_id: 90,
          },
          {
            gram_weight: 199,
            id: 110,
            measure_unit_name: "Quantity not specified",
            food_id: 90,
          },
        ],
        foodNutrients: [
          {
            food_id: 90,
            nutrient_id: 1,
            amount: 69,
            nutrient_name: "Energy",
            unit_name: "kcal",
          },
        ],
      },
      {
        id: 92,
        recipe_foods_id: 16,
        food_portion_id: null,
        food_description: "Abalone, floured or breaded, fried",
        amount: null,
        recipe_id: 54,
        foodPortions: [
          {
            gram_weight: 28.35,
            id: 118,
            measure_unit_name: "1 oz, cooked",
            food_id: 92,
          },
          {
            gram_weight: 32,
            id: 119,
            measure_unit_name: "1 abalone",
            food_id: 92,
          },
          {
            gram_weight: 57,
            id: 120,
            measure_unit_name: "Quantity not specified",
            food_id: 92,
          },
        ],
        foodNutrients: [
          {
            food_id: 92,
            nutrient_id: 1,
            amount: 242,
            nutrient_name: "Energy",
            unit_name: "kcal",
          },
        ],
      },
      {
        id: 97,
        recipe_foods_id: 17,
        food_portion_id: null,
        food_description: "Chocolate, white, with cereal",
        amount: null,
        recipe_id: 54,
        foodPortions: [
          {
            gram_weight: 43,
            id: 132,
            measure_unit_name: "1 bar",
            food_id: 97,
          },
          {
            gram_weight: 14,
            id: 133,
            measure_unit_name: "Quantity not specified",
            food_id: 97,
          },
          {
            gram_weight: 196,
            id: 134,
            measure_unit_name: "1 large bar",
            food_id: 97,
          },
          {
            gram_weight: 17,
            id: 135,
            measure_unit_name: "1 snack size bar",
            food_id: 97,
          },
        ],
        foodNutrients: [
          {
            food_id: 97,
            nutrient_id: 1,
            amount: 511,
            nutrient_name: "Energy",
            unit_name: "kcal",
          },
        ],
      },
      {
        id: 97,
        recipe_foods_id: 33,
        food_portion_id: null,
        food_description: "Chocolate, white, with cereal",
        amount: null,
        recipe_id: 54,
        foodPortions: [
          {
            gram_weight: 43,
            id: 132,
            measure_unit_name: "1 bar",
            food_id: 97,
          },
          {
            gram_weight: 14,
            id: 133,
            measure_unit_name: "Quantity not specified",
            food_id: 97,
          },
          {
            gram_weight: 196,
            id: 134,
            measure_unit_name: "1 large bar",
            food_id: 97,
          },
          {
            gram_weight: 17,
            id: 135,
            measure_unit_name: "1 snack size bar",
            food_id: 97,
          },
        ],
        foodNutrients: [
          {
            food_id: 97,
            nutrient_id: 1,
            amount: 511,
            nutrient_name: "Energy",
            unit_name: "kcal",
          },
        ],
      },
    ],
  },
  {
    id: 1,
    recipe_description: "recipe 1",
    created: "2020-09-23T14:05:53.964Z",
    foods: [
      {
        id: 81,
        recipe_foods_id: 1,
        food_portion_id: 10,
        food_description: "Apple juice beverage, 40-50% juice, light",
        amount: 1,
        recipe_id: 1,
        foodPortions: [
          {
            gram_weight: 31,
            id: 75,
            measure_unit_name: "1 fl oz (no ice)",
            food_id: 81,
          },
          {
            gram_weight: 23,
            id: 76,
            measure_unit_name: "1 fl oz (with ice)",
            food_id: 81,
          },
          {
            gram_weight: 31,
            id: 77,
            measure_unit_name: "1 fl oz (NFS)",
            food_id: 81,
          },
          {
            gram_weight: 248,
            id: 78,
            measure_unit_name: "Quantity not specified",
            food_id: 81,
          },
        ],
        foodNutrients: [
          {
            food_id: 81,
            nutrient_id: 1,
            amount: 22,
            nutrient_name: "Energy",
            unit_name: "kcal",
          },
        ],
      },
    ],
  },
];

// input list of obj output cal
const numberOfItems = (recipeis) => {
  const nRecipeFoods = recipeis.map((n) => n.foods.length);
  const nFoods = nRecipeFoods.reduce((n1, n2) => n1 + n2, 0);
  return `${nFoods} foods`;
};

const locationItems = (recipeis) => {
  const recipeFoodsId = recipeis[1].foods[0].recipe_foods_id;
  const foods = [].concat(...recipeis.map((i) => i.foods));
  const mapFoods = new Map();
  foods.forEach((e, i) => {
    mapFoods.set(e.recipe_foods_id, i + 1);
  });
  if (mapFoods.get(recipeFoodsId) === 1) {
    return `${foods.length} foods`;
  } else if (mapFoods.get(recipeFoodsId) === foods.length) {
    const button = "finish";
    return `you check all amount of foods vary good`;
  } else {
    return `${foods.length - mapFoods.get(recipeFoodsId)} food left from ${
      foods.length
    } foods`;
  }
};

console.log(locationItems(recipeis));
