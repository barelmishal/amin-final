import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserNav from "../../components/nav-bar/user-nav";
import Titles from "../../components/title-stpes/title-steps";
import Action from "../../components/buttons/back-to/action";
import DynamicText from "../../components/dynamic-text/dynamic-text";

// import NavBar from

class FoodsAmounts extends Component {
  constructor() {
    super();
    this.state = {
      items: {},
      recipes: [],
    };
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

  render() {
    const search = this.props.location.search;
    const params = new URLSearchParams(search);
    const recipeId = Number(params.get("recipe"));
    const foodId = Number(params.get("food"));
    const recipe = this.state.recipes.find((r) => r.id === recipeId);
    let food;
    if (recipe) {
      food = recipe.foods.find((f) => f.id === foodId);
    }

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
            // onClick={}
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
          <Action
            // onClick={}
            btnTatile="amount"
            className="btn btn-amount"
          />
          <Action
            // onClick={}
            btnTatile="gr"
            className="btn btn-units"
          />
          <Action
            // onClick={}
            btnTatile="50 kcal"
            className="btn btn-calories"
          />
        </div>
        <div></div>
        <div className="center-it">
          <Action
            // onClick={}
            btnTatile="NEXT FOOD"
            className="next-food"
          />
        </div>

        {this.state.recipes.map((r) => (
          <div>
            <div className="recipe-title">{r.recipe_description}</div>
            {r.foods.map((f) => (
              <div>
                <span>{f.food_description}</span>
                <select name="" id="">
                  {f.foodPortions.map((p) => (
                    <option value="">
                      {p.gram_weight + " " + p.measure_unit_name}
                    </option>
                  ))}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(FoodsAmounts);
