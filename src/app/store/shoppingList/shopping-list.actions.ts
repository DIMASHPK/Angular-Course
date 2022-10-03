import { createAction, props } from '@ngrx/store';
import {
  ADD_INGREDIENT,
  ADD_INGREDIENTS,
  DELETE_INGREDIENT,
  EDIT_INGREDIENT, EDIT_INGREDIENT_INDEX,
} from './shopping-list.constants';
import { Ingredient } from '../../models/ingredient.model';

export const addIngredient = createAction(
  ADD_INGREDIENT,
  props<{
    payload: Ingredient;
  }>()
);

export const addIngredients = createAction(
  ADD_INGREDIENTS,
  props<{
    payload: Ingredient[];
  }>()
);

export const editIngredient = createAction(
  EDIT_INGREDIENT,
  props<{
    payload: {
      ingredient: Ingredient;
    };
  }>()
);

export const deleteIngredient = createAction(
  DELETE_INGREDIENT
);

export const setIngredientEditIndex = createAction(EDIT_INGREDIENT_INDEX, props<{payload: number | null}>())

