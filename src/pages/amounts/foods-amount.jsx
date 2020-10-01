import React, { Component } from "react";
// import NavBar from

class foodsAmounts extends Component {
  constructor() {
    super();
    this.state = {
      items: {},
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
                  {f.foodPortions}
                </select>
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  }
}
