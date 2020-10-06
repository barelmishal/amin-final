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
      items: {},
      recipes: [],
      amount: 0,
      foodPortionId: 0,
      kcal: 0,
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.search !== prevProps.location.search) {
      const search = this.props.location.search;
      const params = new URLSearchParams(search);
      const recipeId = Number(params.get("recipe"));
      const recipeFoodId = Number(params.get("recipe_foods_id"));
      const recipe = this.state.recipes.find((r) => r.id === recipeId);
      let food;
      if (recipe) {
        food = recipe.foods.find((f) => f.recipe_foods_id === recipeFoodId);
      }
      this.setState({
        amount: food.amount,
        foodPortionId: food.food_protion_id,
      });
    }
  }

  componentDidMount = () => {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const recipeIds = params.get("recipe-ids");
    this.setState({ recipeIds: recipeIds.split(",") });
    this.fetchRcipeFromServer(recipeIds);
  };
  fetchRcipeFromServer = (recipeIds) => {
    fetch("/api/recipes/food-search?recipeIds=" + recipeIds)
      .then((res) => res.json())
      .then((recipes) => {
        this.setState({ recipes, loading: false });
      });
  };
  nextFood = () => {
    // current page
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
  };

  render() {
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
          <DynamicText dynamicText="20 ITEMS AND 2" className="items-left" />
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
          <input placeholder="amount" className="btn btn-amount" />
          <select className="btn-select" name="" id="">
            {food &&
              food.foodPortions.map((p) => (
                <option key={p.id} value="">
                  {p.measure_unit_name + " (" + p.gram_weight + " g)"}
                </option>
              ))}
          </select>

          <input placeholder="50 kcal" className="btn btn-calories" />
        </div>
        <div></div>
        <div className="center-it">
          <Action
            onClick={this.nextFood}
            btnTatile="NEXT FOOD"
            className="next-food"
          />
        </div>
      </div>
    );
  }
}

export default withRouter(FoodsAmounts);
