import {Ingredient} from "../../models/ingredient.model";
import {addIngredient} from "./shopping-list.actions";
import {createReducer, on} from "@ngrx/store";



const initialState = {
  ingredients:  [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ]
}

export const shoppingListReducer = createReducer(
  initialState,
  on(
    addIngredient,
    (state, {payload}) =>
      ({
        ...state,
        ingredients: [...state.ingredients, payload]
      }),
  )
)
