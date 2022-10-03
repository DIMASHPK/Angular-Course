import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Recipe } from '../models/recipe.model';
import { Store } from '@ngrx/store';
import { StoreType } from '../types';
import { mergeMap, take, tap } from 'rxjs/operators';
import { fetchRecipes, setRecipes } from '../store/recipes/recipe.actions';
import { Actions, ofType } from '@ngrx/effects';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecipesResolverService implements Resolve<Recipe[]> {
  constructor(private store: Store<StoreType>, private actions$: Actions) {}

  resolve(): any {
    const handleMergeMap = ({ recipes }: StoreType['recipes']) => {
      if (!recipes.length) {
        this.store.dispatch(fetchRecipes());

        return this.actions$.pipe(ofType(setRecipes), take(1));
      }

      return of(recipes);
    };

    return this.store.select('recipes').pipe(take(1), mergeMap(handleMergeMap));
  }
}
