import React, { useState } from "react";
import axios from "axios";
import { useGetUserID } from "../hooks/useGetUserID";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";

import {
  TextField,
  TextareaAutosize,
  Button,
  Typography,
} from "@material-ui/core";

export const CreateRecipe = () => {
  const userID = useGetUserID();
  const [cookies, _] = useCookies(["access_token"]);
  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const ingredients = [...recipe.ingredients];
    ingredients[index] = value;
    setRecipe({ ...recipe, ingredients });
  };

  const handleAddIngredient = () => {
    const ingredients = [...recipe.ingredients, ""];
    setRecipe({ ...recipe, ingredients });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.post(
        "http://localhost:3001/recipes",
        { ...recipe },
        {
          headers: { authorization: cookies.access_token },
        }
      );

      alert("Recipe Created");
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="create-recipe">
      <Typography variant="h2" component="h2" gutterBottom>
        Create Recipe
      </Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          id="name"
          name="name"
          label="Name"
          value={recipe.name}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextareaAutosize
          id="description"
          name="description"
          value={recipe.description}
          onChange={handleChange}
          aria-label="Description"
          placeholder="Description"
          rowsMin={3}
          fullWidth
          margin="normal"
        />
        <Typography variant="subtitle1" component="label" htmlFor="ingredients">
          Ingredients
        </Typography>
        {recipe.ingredients.map((ingredient, index) => (
          <TextField
            key={index}
            name="ingredients"
            value={ingredient}
            onChange={(event) => handleIngredientChange(event, index)}
            fullWidth
            margin="normal"
          />
        ))}
        <Button
          variant="contained"
          color="primary"
          onClick={handleAddIngredient}
        >
          Add Ingredient
        </Button>
        <TextareaAutosize
          id="instructions"
          name="instructions"
          value={recipe.instructions}
          onChange={handleChange}
          aria-label="Instructions"
          placeholder="Instructions"
          rowsMin={4}
          fullWidth
          margin="normal"
        />
        <TextField
          id="imageUrl"
          name="imageUrl"
          label="Image URL"
          value={recipe.imageUrl}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          type="number"
          id="cookingTime"
          name="cookingTime"
          label="Cooking Time (minutes)"
          value={recipe.cookingTime}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <Button type="submit" variant="contained" color="primary">
          Create Recipe
        </Button>
      </form>
    </div>
  );
};
