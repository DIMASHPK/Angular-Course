import { shoppingListReducer } from './shoppingList/shopping-list.reducer';
import { authReducer } from './auth/auth.reducer';
import { recipesReducer } from './recipes/recipe.reducer';

export const rootReducer = {
  shoppingList: shoppingListReducer,
  auth: authReducer,
  recipes: recipesReducer,
};
