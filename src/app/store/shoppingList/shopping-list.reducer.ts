import { Ingredient } from '../../models/ingredient.model';
import {
  addIngredient,
  addIngredients,
  deleteIngredient,
  editIngredient,
  setIngredientEditIndex,
} from './shopping-list.actions';
import { createReducer, on } from '@ngrx/store';
import { StoreType } from '../../types';

const initialState: StoreType['shoppingList'] = {
  ingredients: [new Ingredient('Apples', 5), new Ingredient('Tomatoes', 10)],
  editIngredientIndex: null,
};

export const shoppingListReducer = createReducer(
  initialState,
  on(addIngredient, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, payload],
  })),
  on(addIngredients, (state, { payload }) => ({
    ...state,
    ingredients: [...state.ingredients, ...payload],
  })),
  on(editIngredient, (state, { payload: { ingredient } }) => {
    const ingredients = [...state.ingredients];
    ingredients[state.editIngredientIndex as number] = {
      ...ingredients[state.editIngredientIndex as number],
      ...ingredient,
    };

    return {
      ...state,
      ingredients,
    };
  }),
  on(deleteIngredient, (state) => ({
    ...state,
    ingredients: state.ingredients.filter((_, i) => i !== state.editIngredientIndex),
  })),
  on(setIngredientEditIndex, (state, { payload }) => ({
    ...state,
    editIngredientIndex: payload,
  }))
);
