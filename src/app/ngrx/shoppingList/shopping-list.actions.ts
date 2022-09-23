import {createAction, props} from "@ngrx/store";
import {ADD_INGREDIENT} from "./shopping-list.constants";
import {Ingredient} from "../../models/ingredient.model";

export const addIngredient = createAction(ADD_INGREDIENT, props<{payload: Ingredient}>())
