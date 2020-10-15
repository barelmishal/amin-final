import React, { Component } from "react";
import "./food-search.css";
import RecipesItems from "./recipes-box/recipes-box.jsx";
import Viewport from "./viewport/viewport";
import RecipeTag from "./recipe-tag/recipe-tag";
import Scrollbele from "./Scrollbele/Scrollbele";
import { withRouter } from "react-router-dom";
import Action from "../../components/buttons/back-to/action";
import UserNav from "../../components/nav-bar/user-nav";

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

class FoodSearchComponent extends Component {
  timeout = null;
  constructor(props) {
    super();
    this.state = {
      query: "",
      results: null,
      selection: [],
      recipes: [],
      recipeIds: [],
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
  onSearchFetchResults = (event) => {
    const query = event.target.value;
    const datatype = "Survey%20(FNDDS)";
    this.setState({ query });
    if (!query) {
      this.setState({
        query: "",
      });
    } else {
      fetch(
        `https://api.nal.usda.gov/fdc/v1/foods/search?api_key=${FDC_API_KEY}&query=${encodeURIComponent(
          query
        )}&dataType=${datatype}&pageSize=10`
      )
        .then((resp) => resp.json())
        .then((results) => {
          const fdcIds = results.foods.map((food) => food.fdcId).join(",");
          return fetch(
            `https://api.nal.usda.gov/fdc/v1/foods/?fdcIds=${fdcIds}&api_key=${FDC_API_KEY}`
          );
        })
        .then((resp) => resp.json())
        .then((results) => {
          const categoryMap = new Map();
          if (Array.isArray(results)) {
            for (const food of results) {
              const category =
                food.wweiaFoodCategory.wweiaFoodCategoryDescription || "Other";
              let foods = categoryMap.get(category);
              if (!foods) {
                foods = new Map();
                categoryMap.set(category, foods);
              }
              foods.set(food.description, food);
            }
            this.setState({ results: categoryMap });
          } else {
            this.setState({ results: new Map() });
          }
        });
    }
  };

  select = (food) => {
    const selection = this.state.selection;
    selection.splice(0, 0, food);
    this.setState({
      selection,
      results: null,
      query: "",
    });
    this.dbSelection(food.fdcId);
  };

  onCreateRecipeClick = () => {
    fetch("/api/recipes", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((info) => {
        this.props.history.push(
          "/food-search?recipe-ids=" +
            [info.IdRecipe, ...this.state.recipeIds].join(",")
        );
        this.componentDidMount();
      });
  };

  onCreateRecipeClick = () => {
    fetch("/api/recipes", {
      method: "POST",
    })
      .then((response) => response.json())
      .then((info) => {
        this.props.history.push(
          "/food-search?recipe-ids=" +
            [info.IdRecipe, ...this.state.recipeIds].join(",")
        );
        this.componentDidMount();
      });
  };

  dbSelection = (food) => {
    fetch("/api/foodslist/id", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        foodChosen: food,
        recipeId: this.state.recipeIds[0],
      }),
    }).then((res) => {
      this.fetchRcipeFromServer(this.state.recipeIds);
    });
  };

  saveRecipeName = (recipeId, name) => {
    fetch("/api/recipes/" + recipeId, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        recipe_description: name,
      }),
    }).catch((err) => {
      console.error(err);
      alert(
        "Unable to save recipe name, please check your internet connection and try again"
      );
    });
  };

  fetchRcipeFromServer = (recipeIds) => {
    return fetch("/api/recipes/food-search?recipeIds=" + recipeIds)
      .then((res) => res.json())
      .then((recipes) => {
        this.setState({ recipes, loading: false });
      });
  };

  onClickGoToAmount = () => {
    const recipesIds = this.state.recipeIds;
    this.fetchRcipeFromServer(recipesIds.join(","));
    const firstRecipe = this.state.recipes[0];
    const firstfood = this.state.recipes[0].foods[0];
    this.props.history.push(
      "/food-amounts?recipe-ids=" +
        recipesIds.join(",") +
        "&recipe=" +
        firstRecipe.id +
        "&recipe_foods_id=" +
        firstfood.recipe_foods_id
    );
  };

  render() {
    const { userInfo, onLogout } = this.props;
    return (
      <div className="food-search">
        <div className="fixed-nav">
          <UserNav userInfo={userInfo} onLogout={onLogout} />
          <section className="bar-steps">
            <div className="bar-steps-title" id="bar-steps">
              step 1: search and chose foods items
            </div>
          </section>
          <section className="food-search-bar">
            <div
              className="input-container"
              id={this.state.results && "has-text"}
            >
              <input
                type="text"
                onChange={this.onSearchFetchResults}
                name="items"
                id="items"
                placeholder="search foods items"
              />
            </div>
            {this.state.results && (
              <div className="result-list">
                {Array.from(this.state.results.entries()).map((entry) => {
                  const category = entry[0];
                  const foods = entry[1];
                  return (
                    <div key={category} className="result">
                      <div className="category">{category}</div>
                      {Array.from(foods.values()).map((food) => (
                        <div
                          onClick={() => this.select(food)}
                          key={food.fdcId}
                          className="description"
                        >
                          {food.description}
                        </div>
                      ))}
                    </div>
                  );
                })}
                {!this.state.results.size && <div>לא נמצאו תוצאות</div>}
              </div>
            )}
          </section>

          <div class="buttons clickable font">
            <Action
              onClick={this.onCreateRecipeClick}
              btnTatile="ADD NEW RECIPE"
              className="button add-new-recipe"
            />
            <Action
              onClick={this.onClickGoToAmount}
              btnTatile="GO TO AMOUNTS"
              className="button go-to-amounts"
            />
          </div>
        </div>
        <Scrollbele>
          {this.state.recipes.map((r) => (
            <Viewport key={r.id}>
              <RecipeTag
                onBlur={(e) => this.saveRecipeName(r.id, e.target.value)}
                description={r.recipe_description}
              />
              <RecipesItems foods={r.foods} className="main" />
            </Viewport>
          ))}
        </Scrollbele>
      </div>
    );
  }
}

export default withRouter(FoodSearchComponent);
