import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {RecipeService} from "../../services/recipe.service";
import {Recipe} from "../../models/recipe.model";
import { map, tap} from "rxjs/operators";
import {AuthService} from "../../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private fireBaseUrl = 'https://angular-app-cdf7d-default-rtdb.europe-west1.firebasedatabase.app/'

  constructor(
    private httpClient: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService) {}

  storeRecipe = () => {
    const recipes = this.recipeService.getRecipes()

    this.httpClient
      .put(`${this.fireBaseUrl}/recipes.json`, recipes)
      .subscribe(res => {
        console.log(res)
      })
  }

  fetchRecipes = () => {
    const handleMap = (recipes: Recipe[]) =>
       recipes.map(recipe => ({...recipe, ingredients: recipe?.ingredients ? recipe.ingredients : [] }))

    const handleTap = (recipes: Recipe[]) => {
      this.recipeService.setRecipes(recipes)
    }

    return this.httpClient
      .get<Recipe[]>(`${this.fireBaseUrl}/recipes.json`)
      .pipe(map(handleMap), tap(handleTap))
  }
}
