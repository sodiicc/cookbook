import React, { useState, useEffect } from "react";
import axios from "axios";

export const EditRecipe = (props) => {
  const [recipe, setRecipe] = useState({
    username: "",
    description: "",
    duration: "",
    date: new Date()
  });
  const [users, setUsers] = useState([]);

  useEffect(() => {
    axios
      .get("/recipes/" + props.match.params.id)
      .then(res => {
        const data = res.data
        setRecipe({
          username: data.username,
          description: data.description,
          duration: data.duration,
          date: new Date(data.date)
        });
      })
      .catch(err => console.log(err))

      axios.get("/users").then(res => {
      if (res.data.length > 0) {
        setUsers(
          res.data.map(user => {
            return user.username;
          })
        );        
      }
    });

  }, [props.match.params.id]);

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
    console.log('recipe', recipe)
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

    axios
      .post("/recipes/update/"+ props.match.params.id, recipe)
      .then(res => console.log(res.data));

    window.location = "/";
  };

  return (
    <div>
      <h3>Edit Recipe Log</h3>
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
            value={recipe.description}
            onChange={onChangeDescription}
          />
        </div>
        <div className="form-group">
          <label>Cooking Duration: </label>
          <input
            typr="text"
            required
            className="form-control"
            value={recipe.duration}
            onChange={onChangeDuration}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Edit Recipe Log"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
};
