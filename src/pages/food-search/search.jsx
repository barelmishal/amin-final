import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import UserNav from "../../components/nav-bar/user-nav";
import "./search.css";

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
  primaryNutri = [
    "food_energy",
    "carbohydrates",
    "total_dietary_fiber",
    "total_fat",
    "protein",
    "calcium",
  ];
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

  handleAmountChange = (e, r) => {
    r.amount = e.target.value;
    this.forceUpdate();
  };
  hendleUnitChange = (e, r) => {
    r.unit = e.target.value;
    this.forceUpdate();
  };

  select = (food) => {
    const selection = this.state.selection;
    selection.splice(0, 0, food);
    food.amount = "100";
    food.unit = "700";
    this.setState({
      selection,
      results: null,
      query: "",
    });
  };

  toggleNutri = (food) => {
    food.expanded = !food.expanded;
    this.forceUpdate(() => {
      const foodEl = document.getElementById("food-" + food.id);
      foodEl.scrollIntoView({
        behavior: "smooth",
      });
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
  calcNutrition = (nutrient, food) => {
    const gramOfUnit = food.foodPortions.find((fp) => food.unit === fp.mida)
      .mishkal;
    const gram = food.amount * gramOfUnit;
    const calc = (Number(food[nutrient]) / 100) * gram;
    return calc;
  };

  render() {
    const { userInfo, onLogout } = this.props;
    const results = this.state.selection.reduce((results, food) => {
      this.nutri.forEach((nutrient) => {
        results[nutrient] =
          (results[nutrient] || 0) + this.calcNutrition(nutrient, food);
      });
      return results;
    }, {});
    return (
      <div className="food-search">
        <div className="fixed-nav">
          <section className="food-search-bar">
            <div
              className="input-container"
              id={this.state.results && "has-text"}
            >
              <input
                autoComplete="off"
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
            {!this.state.results &&
              this.state.selection.map((r) => (
                <div key={r.id} id={"food-" + r.id}>
                  <div className="main">{r.shmmitzrach}</div>
                  <button className="btn-remove-food" onClick={this.removeFood}>
                    remove
                  </button>
                  <div className="amount">
                    <input
                      type="text"
                      onChange={(e) => this.handleAmountChange(e, r)}
                      value={r.amount}
                    />
                  </div>
                  <div className="units">
                    <select
                      value={r.unit}
                      onChange={(e) => this.hendleUnitChange(e, r)}
                    >
                      {/* need to change the state to make gram can change */}
                      {r.foodPortions.map((p) => (
                        <option key={p.mida} value={p.mida}>
                          ({p.mishkal}gr) {p.measureUnitName}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="macros">
                    {(r.expanded ? this.nutri : this.primaryNutri).map((n) => (
                      <div>
                        <div className="color-dark-green">{n}</div>
                        <div className="color-light-green">
                          {this.calcNutrition(n, r)}
                        </div>
                      </div>
                    ))}
                  </div>
                  <button onClick={() => this.toggleNutri(r)}>
                    {" "}
                    {r.expanded ? "פחות" : "עוד"} נוטרינטים{" "}
                  </button>
                </div>
              ))}
          </section>
        </div>

        <div>
          {!this.state.results &&
            Object.keys(results).map((nutri) => (
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
