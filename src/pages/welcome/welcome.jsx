import React from 'react';

const Welcome = (props) => {
    return (
        <div className="welcome-container">
            <div className="button-container">
                <button className="create-recipes" onClick={props.onCreateRecipeClick}>Create Recipes</button>
                <button className="creat-new-client">Create New client</button>
            </div>
        </div>
    )
}

export default Welcome;