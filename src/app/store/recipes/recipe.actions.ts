import { createAction, props } from '@ngrx/store';
import {
  ADD_RECIPE,
  DELETE_RECIPE,
  EDIT_RECIPE,
  FETCH_RECIPES,
  SET_RECIPES,
  STORE_RECIPES,
} from './recipe.constants';
import { Recipe } from '../../models/recipe.model';

export const addRecipe = createAction(ADD_RECIPE, props<{ payload: Recipe }>());

export const editRecipe = createAction(
  EDIT_RECIPE,
  props<{ payload: { index: number; recipe: Recipe } }>()
);

export const deleteRecipe = createAction(
  DELETE_RECIPE,
  props<{ payload: number }>()
);

export const fetchRecipes = createAction(FETCH_RECIPES);

export const setRecipes = createAction(
  SET_RECIPES,
  props<{ payload: Recipe[] }>()
);

export const storeRecipes = createAction(STORE_RECIPES);
