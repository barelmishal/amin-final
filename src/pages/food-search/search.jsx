import React, { Component } from "react";
import "./food-search.css";
import { withRouter } from "react-router-dom";
import UserNav from "../../components/nav-bar/user-nav";

const FDC_API_KEY = process.env.REACT_APP_FDC_API_KEY;

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
    const datatype = "Survey%20(FNDDS)";
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
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(SearchComponent);
