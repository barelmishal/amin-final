import React from "react";

import "./recipe-tag.css";

class RecipeTag extends React.Component {
  constructor() {
    super();
    this.state = {};
  }
  render() {
    return (
      <div class="recipe-tag container">
        <div class="recipe-details">
          <input
            class="recipe-tag input"
            onBlur={this.props.onBlur}
            defaultValue={this.props.description}
            type="text"
            name="name recipe"
            id="recipe"
            placeholder="name of recipe, exmple 'cucumber salad'"
          />
          <button class="recipe-tag btn"></button>
        </div>
      </div>
    );
  }
}

export default RecipeTag;
