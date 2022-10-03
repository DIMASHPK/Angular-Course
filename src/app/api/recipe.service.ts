import { HttpClient } from '@angular/common/http';
import { Recipe } from '../models/recipe.model';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ApiRecipeService {
  constructor(private httpClient: HttpClient) {}

  storeRecipes = (recipes: Recipe[]) =>
    this.httpClient.put(`${environment.fireBaseUrl}/recipes.json`, recipes);

  fetchRecipes = () =>
    this.httpClient.get<Recipe[]>(`${environment.fireBaseUrl}/recipes.json`);
}
