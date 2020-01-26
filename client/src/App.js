import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { Navbar } from "./conponents/Navbar";
import { EditRecipe } from "./conponents/EditRecipe";
import { CreateRecipe } from "./conponents/CreateRecipe";
import { RecipesList } from "./conponents/RecipesList";
import { CreateUser } from "./conponents/CreateUser";

// export const port = process.env.PORT_FRONT || 3000;

function App() {
  return (
    <Router>
      <div className="container">
        <Navbar />
        <br />
        <Route path="/" exact component={RecipesList} />
        <Route path="/edit/:id" component={EditRecipe} />
        <Route path="/create" component={CreateRecipe} />
        <Route path="/user" component={CreateUser} />
      </div>
    </Router>
  );
}

export default App;
