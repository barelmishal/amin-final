import React, { Component } from "react";
import { withRouter } from "react-router-dom";
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
    return (
      <div className="foods-amounts">
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
