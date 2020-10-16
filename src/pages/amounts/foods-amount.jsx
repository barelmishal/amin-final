import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserNav from "../../components/nav-bar/user-nav";
import Titles from "../../components/title-stpes/title-steps";
import Action from "../../components/buttons/back-to/action";
import DynamicText from "../../components/dynamic-text/dynamic-text";
import "./foods-amount.css";

// import NavBar from

class FoodsAmounts extends Component {
  constructor() {
    super();
    this.state = {
      recipes: [],
      amount: 100,
      foodPortionId: 0,
      kcal: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      this.updateState();
    }
  }

  updateState = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const recipeId = Number(params.get("recipe"));
    const recipeFoodId = Number(params.get("recipe_foods_id"));
    const recipe = this.state.recipes.find((r) => r.id === recipeId);
    const recipes = this.state.recipes;
    const foods = [].concat(...recipes.map((i) => i.foods));
    const mapFoods = new Map();
    foods.forEach((e, i) => {
      mapFoods.set(e.recipe_foods_id, i + 1);
    });
    let btnFinish = mapFoods.get(recipeFoodId) === foods.length;
    let itemLast;
    if (btnFinish) {
      itemLast = `last food`;
    } else {
      itemLast = `${1 + foods.length - mapFoods.get(recipeFoodId)} out of ${
        foods.length
      } foods`;
    }
    let food;
    if (recipe) {
      food = recipe.foods.find((f) => f.recipe_foods_id === recipeFoodId);
    }
    const amount = food.amount || 100;
    this.setState({
      amount,
      foodPortionId: food.food_portion_id || 0,
      kcal: this.calcKcal(amount, food),
      food,
      recipe,
      itemLast,
      btnFinish,
    });
  };
  calcKcal(amount, food) {
    const Portions = food.foodPortions;
    const currentUnit = food.food_portion_id;
    let gramOfUnit;
    if (!!currentUnit) {
      gramOfUnit = Portions.find((g) => g.id === currentUnit).gram_weight;
    } else {
      gramOfUnit = 1;
    }
    const gram = amount * gramOfUnit;
    const calc = (food.foodNutrients[0].amount / 100) * gram;
    return calc;
  }
  handleAmountChange = (event) => {
    let currentAmount = Number(event.target.value);
    let gebrish;
    if (!isNaN(currentAmount)) {
      this.setState({
        amount: event.target.value,
        kcal: this.calcKcal(currentAmount, this.state.food),
        gebrish,
      });
    } else {
      gebrish = "Amount must be a number";
      this.setState({
        amount: event.target.value,
        gebrish,
      });
    }
  };
  newUnit = (gramPortion, food) => {
    const calc =
      (food.foodNutrients[0].amount / 100) * this.state.amount * gramPortion;
    return calc;
  };
  handleUnitChange = (event) => {
    let food = this.state.food;
    let newCurrentUnit = Number(event.target.value);
    let gramPortion;
    if (!!newCurrentUnit) {
      gramPortion = food.foodPortions.find((p) => p.id === newCurrentUnit)
        .gram_weight;
      this.setState({
        kcal: this.newUnit(gramPortion, food),
        foodPortionId: newCurrentUnit,
      });
    } else {
      this.setState({
        kcal: this.newUnit(1, food),
        foodPortionId: newCurrentUnit,
      });
    }
  };

  handleKcalChange = (event) => {
    const kcal = Number(event.target.value);
    let food = this.state.food;
    let gebrish = "Calories must be a number";
    let poriton = this.state.foodPortionId;
    let gramWeight;
    if (!!poriton) {
      gramWeight = food.foodPortions.find((p) => p.id === poriton).gram_weight;
    } else {
      gramWeight = 1;
    }
    if (!isNaN(kcal)) {
      this.setState({
        kcal: event.target.value,
        amount: this.KcalChange(food, kcal, gramWeight),
        gebrish: "",
      });
    } else {
      this.setState({
        kcal: event.target.value,
        gebrish,
      });
    }
  };

  KcalChange = (food, kcal, gramWeight) => {
    const amountCalc =
      kcal / ((food.foodNutrients[0].amount / 100) * gramWeight);
    return amountCalc;
  };

  componentDidMount = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const recipeIds = params.get("recipe-ids");
    this.setState({ recipeIds: recipeIds.split(",") });
    return this.fetchRcipeFromServer(recipeIds);
  };

  fetchRcipeFromServer = (recipeIds) => {
    return fetch("/api/recipes/food-search?recipeIds=" + recipeIds)
      .then((res) => res.json())
      .then((recipes) => {
        this.setState({ recipes, loading: false });
        this.updateState();
      });
  };

  nextFood = () => {
    const { amount, foodPortionId } = this.state;
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const recipeId = Number(params.get("recipe"));
    const recipeIds = params.get("recipe-ids");
    const recipeFoodId = Number(params.get("recipe_foods_id"));
    const IndexRecipe = (r) => r.id === recipeId;
    let nRecipe = this.state.recipes.findIndex(IndexRecipe);
    const IndexFood = (f) => f.recipe_foods_id === recipeFoodId;
    let nFood = this.state.recipes[nRecipe].foods.findIndex(IndexFood);
    const sumRecipe = this.state.recipes.length;
    const sumfoods = this.state.recipes[nRecipe].foods.length;
    nFood = nFood + 1;
    if (sumfoods <= nFood) {
      nRecipe = nRecipe + 1;
      nFood = 0;
    }
    if (sumRecipe <= nRecipe) {
      nFood = 0;
      nRecipe = 0;
    }
    const nAamount = Number(amount);
    if (!isNaN(nAamount) && amount) {
      fetch("/api/recipes/recipe-foods/" + recipeFoodId, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          amount: nAamount,
          food_portion_id: foodPortionId || null,
        }),
      })
        .then(() => {
          return this.componentDidMount();
        })
        .then(() => {
          this.setState({ gebrish: "" });
          const nextRecipe = this.state.recipes[nRecipe];
          const nextFood = this.state.recipes[nRecipe].foods[nFood];
          this.props.history.push(
            "/food-amounts?recipe-ids=" +
              recipeIds +
              "&recipe=" +
              nextRecipe.id +
              "&recipe_foods_id=" +
              nextFood.recipe_foods_id
          );
        })
        .catch((err) => {
          console.error(err);
          alert(
            "Unable to save food amount, please check your internet connection and try again"
          );
        });
    } else {
      alert("amount must be a number");
    }
  };

  render() {
    const {
      amount,
      foodPortionId,
      kcal,
      recipe,
      food,
      itemLast,
      btnFinish,
    } = this.state;
    const { userInfo, onLogout } = this.props;
    return (
      <div className="foods-amounts">
        <UserNav userInfo={userInfo} onLogout={onLogout} />
        <Titles
          Bartitle="step 2: selecting AMOUNTs"
          className="bar-steps-title"
        />
        <div className="center-it">
          <Action
            btnTatile="selecting SPECIPFIC FOOD"
            className="selecting-specipfic-food"
          />
          <DynamicText dynamicText={itemLast} className="items-left" />
          <DynamicText
            dynamicText={recipe && recipe.recipe_description}
            className="recipe-name"
          />
          <DynamicText
            dynamicText={food && food.food_description}
            className="food-name"
          />
        </div>
        <div className="titles-of-btn">
          <div className="amounts">amounts</div>
          <div className="units">units</div>
          <div className="clories">clories</div>

          <input
            value={amount}
            onChange={this.handleAmountChange}
            placeholder="amount"
            className="btn btn-amount"
          />
          <select
            onChange={this.handleUnitChange}
            value={foodPortionId}
            className="btn-select"
            name=""
            id=""
          >
            <option key="0" value={0}>
              1 gram
            </option>
            {food &&
              food.foodPortions.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.measure_unit_name + " (" + p.gram_weight + " g)"}
                </option>
              ))}
          </select>

          <input
            value={kcal}
            onChange={this.handleKcalChange}
            placeholder="50 kcal"
            className="btn btn-calories"
          />
        </div>
        {!!this.state.gebrish && (
          <div className="red">{this.state.gebrish}</div>
        )}
        <div></div>
        <div className="center-it">
          <Action
            onClick={this.nextFood}
            btnTatile={btnFinish ? "FINISH" : "NEXT FOOD"}
            className="next-food"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(FoodsAmounts);
