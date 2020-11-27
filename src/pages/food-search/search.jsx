import React, { Component } from "react";
import "./food-search.css";
import { withRouter } from "react-router-dom";
import UserNav from "../../components/nav-bar/user-nav";

class SearchComponent extends Component {
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
  nutri = [
    "food_energy",
    "carbohydrates",
    "total_fat",
    "total_dietary_fiber",
    "total_sugars",
    "protein",
    "alcohol",
    "butyric",
    "calcium",
    "capric",
    "caproic",
    "caprylic",
    "carotene",
    "arginine",
    "cholesterol",
    "choline",
    "copper",
    "arachidonic",
    "cystine",
    "docosahexanoic",
    "biotin",
    "docosapentaenoic",
    "eicosapentaenoic",
    "erucic",
    "folate",
    "folate_dfe",
    "fructose",
    "gadoleic",
    "histidine",
    "iodine",
    "iron",
    "isoleucine",
    "lauric",
    "leucine",
    "linoleic",
    "linolenic",
    "lysine",
    "magnesium",
    "manganese",
    "methionine",
    "moisture",
    "mono_satured",
    "myristic",
    "niacin",
    "oleic",
    "palmitic",
    "palmitoleic",
    "pantothenic_acid",
    "parinaric",
    "phenylalanine",
    "phosphorus",
    "poly_satured",
    "potassium",
    "riboflavin",
    "satured_fat",
    "selenium",
    "serine",
    "sodium",
    "stearic",
    "sugar_alcohols",
    "thiamin",
    "threonine",
    "trans_fatty_acids",
    "tryptophan",
    "tyrosine",
    "valine",
    "vitamin_a_iu",
    "vitamin_a_re",
    "vitamin_b6",
    "vitamin_b12",
    "vitamin_c",
    "vitamin_d",
    "vitamin_e",
    "vitamin_k",
    "zinc",
  ];

  componentDidMount = () => {};
  onSearchFetchResults = (event) => {
    const query = event.target.value;
    this.setState({ query });
    if (!query) {
      this.setState({
        query: "",
      });
    } else {
      fetch(`/api/foods/search?q=${encodeURIComponent(query)}`)
        .then((resp) => resp.json())
        .then((results) => {
          const categoryMap = new Map();
          categoryMap.set("other", results);
          this.setState({ results: categoryMap });
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

  removeFood = (index) => {
    const selection = this.state.selection;
    selection.splice(index, 1);
    this.setState({ selection });
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

  fetchRcipeFromServer = (recipeIds) => {
    return fetch("/api/recipes/food-search?recipeIds=" + recipeIds)
      .then((res) => res.json())
      .then((recipes) => {
        this.setState({ recipes, loading: false });
      });
  };

  render() {
    const { userInfo, onLogout } = this.props;
    const results = this.state.selection.reduce((results, food) => {
      this.nutri.forEach((nutrient) => {
        results[nutrient] = (results[nutrient] || 0) + Number(food[nutrient]);
      });
      return results;
    }, {});
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
                      {foods.map((food) => (
                        <div
                          onClick={() => this.select(food)}
                          key={food.id}
                          className="description"
                        >
                          {food.shmmitzrach}
                        </div>
                      ))}
                    </div>
                  );
                })}
                {!this.state.results.size && <div>לא נמצאו תוצאות</div>}
              </div>
            )}
          </section>
        </div>
        {this.state.selection.map((r) => (
          <div key={r.id}>
            <div className="main">{r.shmmitzrach}</div>
            <button className="btn-remove-food" onClick={this.removeFood}>
              remove
            </button>
            <div className="macros">
              <div className="main">אנרגיה - {r.food_energy}</div>
              <div className="main">פחמימות - {r.carbohydrates}</div>
              <div className="main">שומנים - {r.total_fat}</div>
              <div className="main">חלבונים - {r.protein}</div>
            </div>
          </div>
        ))}
        <div>
          {Object.keys(results).map((nutri) => (
            <div>
              {nutri}: {results[nutri]}
            </div>
          ))}
        </div>
      </div>
    );
  }
}

export default withRouter(SearchComponent);
