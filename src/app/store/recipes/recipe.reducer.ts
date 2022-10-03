import { createReducer, on } from '@ngrx/store';
import { StoreType } from '../../types';
import {
  addRecipe,
  deleteRecipe,
  editRecipe,
  setRecipes,
} from './recipe.actions';

const initialState: StoreType['recipes'] = {
  recipes: [],
};

export const recipesReducer = createReducer(
  initialState,
  on(addRecipe, (state, { payload }) => ({
    ...state,
    recipes: [...state.recipes, { ...payload }],
  })),
  on(editRecipe, (state, { payload: { recipe, index } }) => {
    const recipesCopy = [...state.recipes];
    recipesCopy[index] = { ...recipesCopy[index], ...recipe };

    return { ...state, recipes: recipesCopy };
  }),
  on(deleteRecipe, (state, { payload }) => ({
    ...state,
    recipes: state.recipes.filter((_, i) => i !== payload),
  })),
  on(setRecipes, (state, { payload }) => ({ ...state, recipes: [...payload] }))
);
