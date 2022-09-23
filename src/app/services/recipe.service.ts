import {Recipe} from "../models/recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../models/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export  class RecipeService  {
  private recipeSubject = new Subject<Recipe[]>()

  private recipes: Recipe[] = [];

  setRecipes = (recipes: Recipe[]) => {
    this.recipes = recipes

    this.recipeSubjectFire()
  }

  getRecipes = () => {
    return this.recipes.slice()
  }

  getRecipeById = (id: string | number) => {
    return this.getRecipes()[typeof id === 'string' ? parseInt(id) : id]
  }

  constructor(private shoppingListService: ShoppingListService) {
  }

  recipeSubjectFire = (recipes?: Recipe[]) => {
    this.recipeSubject.next(recipes || this.getRecipes())
  }

  recipeSubjectSubscribe = (callBack: (recipes: Recipe[]) => any) => this.recipeSubject.subscribe(callBack)

  addIngredientsToShopping = (ingredients: Ingredient[]) => {
    this.shoppingListService.handleAddIngredients(ingredients)
  }

  addRecipe = (recipe: Recipe) => {
    this.recipes.push(recipe)

    this.recipeSubjectFire()
  }

  updateRecipe = (id: number, recipe: Recipe) => {
    this.recipes[id] = recipe

    this.recipeSubjectFire()
  }

  deleteRecipe = (id: number) => {
    this.recipes.splice(id, 1)

    this.recipeSubjectFire()
  }
}
