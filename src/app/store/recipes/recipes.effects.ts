import { Injectable } from '@angular/core';
import { Actions, concatLatestFrom, createEffect, ofType } from '@ngrx/effects';
import { FETCH_RECIPES } from './recipe.constants';
import { flatMap, mergeMap, switchMap } from 'rxjs';
import { ApiRecipeService } from '../../api/recipe.service';
import { RecipeService } from '../../services/recipe.service';
import { map } from 'rxjs/operators';
import { storeRecipes } from './recipe.actions';
import { Store } from '@ngrx/store';
import { StoreType } from '../../types';

@Injectable()
export class RecipesEffects {
  fetchRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(FETCH_RECIPES),
      switchMap(() =>
        this.apiRecipes
          .fetchRecipes()
          .pipe(map(this.recipeService.fetchRecipes))
      )
    )
  );

  storeRecipes$ = createEffect(() =>
    this.actions$.pipe(
      ofType(storeRecipes),
      mergeMap(() => this.store.select('recipes')),
      switchMap(({ recipes }) =>
        this.apiRecipes
          .storeRecipes(recipes)
          .pipe(map(() => ({ type: 'DUMMY' })))
      )
    )
  );

  constructor(
    private actions$: Actions,
    private apiRecipes: ApiRecipeService,
    private recipeService: RecipeService,
    private store: Store<StoreType>
  ) {}
}
