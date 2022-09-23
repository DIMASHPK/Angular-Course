import {Injectable} from "@angular/core";
import {Resolve} from "@angular/router";
import {Recipe} from "../models/recipe.model";
import {DataStorageService} from "../shared/services/data-storage.service";
import {RecipeService} from "../services/recipe.service";

@Injectable({
  providedIn: "root"
})
export class RecipesResolverService implements Resolve<Recipe[]>{
  constructor(private dataStorageService: DataStorageService, private recipeService: RecipeService) {}


  resolve(): any {
    const currentRecipes = this.recipeService.getRecipes()

    if(!currentRecipes.length){
      return this.dataStorageService.fetchRecipes()
    }

    return currentRecipes
  }
}
