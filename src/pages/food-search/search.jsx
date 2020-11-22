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
            <div className="macros">
              <div className="main">אנרגיה - {r.food_energy}</div>
              <div className="main">פחמימות - {r.carbohydrates}</div>
              <div className="main">שומנים - {r.total_fat}</div>
              <div className="main">חלבונים - {r.protein}</div>
            </div>
          </div>
        ))}
        <div></div>
      </div>
    );
  }
}
// alcohol: "0"
// arachidonic: "0"
// arginine: "0.031"
// biotin: ""
// butyric: "0"
// calcium: "14"
// capric: "0"
// caproic: "0"
// caprylic: "0"
// carbohydrates: "1.46"
// carotene: "31"
// cholesterol: "0"
// choline: "5.7"
// copper: "0.071"
// cystine: "0.007"
// docosahexanoic: "0"
// docosapentaenoic: "0"
// eicosapentaenoic: "0"
// erucic: "0"
// folate: "14"
// folate_dfe: "14"
// food_energy: "12"
// fructose: "0.75"
// gadoleic: "0"
// histidine: "0.002"
// id: "3792"
// iodine: ""
// iron: "0.22"
// isoleucine: "0.012"
// lauric: "0"
// leucine: "0.025"
// linoleic: "0.002"
// linolenic: "0.002"
// lysine: "0.025"
// magnesium: "12"
// manganese: "0.073"
// methionine: "0.012"
// moisture: "96.73"
// mono_satured: "0.002"
// myristic: "0.002"
// niacin: "0.037"
// oleic: "0.002"
// palmitic: "0.01"
// palmitoleic: "0"
// pantothenic_acid: "0.24"
// parinaric: "0"
// phenylalanine: "0.031"
// phosphorus: "21"
// poly_satured: "0.003"
// potassium: "136"
// protein: "0.59"
// riboflavin: "0.025"
// satured_fat: "0.013"
// selenium: "0.1"
// serine: "0.025"
// sodium: "2"
// stearic: "0.002"
// sugar_alcohols: ""
// thiamin: "0.031"
// threonine: "0.012"
// total_dietary_fiber: "0.7"
// total_fat: "0.16"
// total_sugars: "1.38"
// trans_fatty_acids: ""
// tryptophan: "0.007"
// tyrosine: "0.002"
// valine: "0.012"
// vitamin_a_iu: ""
// vitamin_a_re: "4"
// vitamin_b6: "0.051"
// vitamin_b12: "0"
// vitamin_c: "3.2"
// vitamin_d: "0"
// vitamin_e: "0.03"
// vitamin_k: "7.2"
// zinc: "0.17"

export default withRouter(SearchComponent);
