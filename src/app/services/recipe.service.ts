import { Recipe } from '../models/recipe.model';
import { Injectable } from '@angular/core';
import { Ingredient } from '../models/ingredient.model';
import { Store } from '@ngrx/store';
import { addIngredients } from '../store/shoppingList/shopping-list.actions';
import { StoreType } from '../types';
import { setRecipes } from '../store/recipes/recipe.actions';

@Injectable()
export class RecipeService {
  constructor(private store: Store<StoreType>) {}

  addIngredientsToShopping = (ingredients: Ingredient[]) => {
    this.store.dispatch(addIngredients({ payload: ingredients }));
  };

  fetchRecipes = (recipesResponse: Recipe[]) => {
    const recipes = recipesResponse.map(recipe => ({
      ...recipe,
      ingredients: recipe?.ingredients ? recipe.ingredients : [],
    }));

    return setRecipes({ payload: recipes });
  };
}
