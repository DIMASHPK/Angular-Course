import { Ingredient } from '../models/ingredient.model';
import {Recipe} from "../models/recipe.model";

export interface Element {
  name: string;
  type: 'server' | 'blueprint';
  content: string;
}

export interface UserType {
  id: string;
  email: string;
  token: string | null;
  tokenExpirationDate: Date;
}

export interface StoreType {
  shoppingList: {
    ingredients: Ingredient[];
    editIngredientIndex: null | number;
  };
  auth: {
    user: UserType | null;
    error: string | null,
    loading: boolean
  };
  recipes: {
    recipes: Recipe[]
  }
}

export interface AuthDataType {
  email: string,
  password: string
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  registered?: boolean;
  expiresIn: string;
}

export interface userStorageData {
  email: string;
  id: string;
  _token: string;
  _tokenExpirationDate: string;
}
