import React, { useState, useEffect } from "react";
import axios from "axios";

export const CreateRecipe = () => {
  const [recipe, setRecipe] = useState({
    username: "",
    description: "",
    duration: "",
    date: new Date()
  });
  const [users, setUsers] = useState([]);
  
  
  useEffect(() => {
    axios.get("/users").then(res => {
      if (res.data.length > 0) {
        setUsers(
          res.data.map(user => {
            return user.username;
          })
        );        
      }
    });
  }, [] );

  useEffect(() => {
    setRecipe({
      ...recipe,
      username: users[0]
    })
    // eslint-disable-next-line 
  }, [users])

  const onChangeUsername = e => {
    setRecipe({
      ...recipe,
      username: e.target.value
    });
  };
  const onChangeDescription = e => {
    setRecipe({
      ...recipe,
      description: e.target.value
    });
  };
  const onChangeDuration = e => {
    setRecipe({
      ...recipe,
      duration: e.target.value
    });
  };
  const onSubmit = e => {
    e.preventDefault();
    console.log("recipe", recipe);

    axios
      .post("/recipes/add", recipe)
      .then(res => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Create New Recipe Log</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label>Username: </label>
          <select
            required
            className="form-control"
            value={recipe.username}
            onChange={onChangeUsername}
          >
            {users.map(user => {
              return (
                <option key={user} value={user}>
                  {user}
                </option>
              );
            })}
          </select>
        </div>
        <div className="form-group">
          <label>Dish Name: </label>
          <input
            typr="text"
            required
            className="form-control"
            placeholder='write the name of your dish'
            value={recipe.description}
            onChange={onChangeDescription}
            onFocus={(e) => e.target.placeholder=''}
            onBlur={(e) => e.target.placeholder='write the name of your dish'}
          />
        </div>
        <div className="form-group">
          <label>Cooking Duration: </label>
          <input
            typr="text"
            required
            placeholder='for example 20min'
            className="form-control"
            value={recipe.duration}
            onChange={onChangeDuration}
            onFocus={(e) => e.target.placeholder=''}
            onBlur={(e) => e.target.placeholder='for example 20min'}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Recipe Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
