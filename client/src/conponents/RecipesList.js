import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom'
import axios from 'axios'

const Recipe = props => {
  const recipe = props.recipe
  return (
    <tr>
      <td>{recipe.username}</td>
      <td>{recipe.description}</td>
      <td>{recipe.duration}</td>
      <td>{recipe.date.substring(0,10)}</td>
      <td>
        <Link to={'/edit/'+recipe._id}>edit</Link> |{' '}
        <Link to='/' onClick={() => {props.deleteRecipe(recipe._id)}}>delete</Link>        
      </td>
    </tr>
  )
}

export const RecipesList = () => {
  const [recipes, setRecipes] = useState([])

  useEffect(() => {
    axios.get('/recipes')
    .then(res => setRecipes(res.data))
    .catch(err => console.log(err))
  }, [])

  const deleteRecipe = (id) => {
    axios.delete('/recipes/'+ id)
    setRecipes(recipes.filter(el => el._id !== id))
  }

  const recipeList = () => {
    return recipes.map(currentRecipe => {
      return <Recipe key={currentRecipe._id} recipe={currentRecipe} deleteRecipe={deleteRecipe} />
    })
  }

  return (
    <div>
      <h3>Logged Dishes</h3>
      <table className='table'>
        <thead className='thead-light'>
          <tr>
            <th>Username</th>
            <th>Dish Name</th>
            <th>Cooking Duration</th>
            <th>Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>{recipeList()}</tbody>
      </table>
    </div>
  )
}