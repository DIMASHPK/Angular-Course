import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import { RecipeService } from '../../../services/recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { StoreType } from '../../../types';
import { deleteRecipe } from '../../../store/recipes/recipe.actions';
import { flatMap, mergeMap, tap } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: string;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<StoreType>
  ) {}

  ngOnInit() {
    const handleParamsSubscribe = ({ recipes }: StoreType['recipes']) => {
      this.recipe = recipes[parseInt(this.id)];
    };

    this.route.params
      .pipe(
        mergeMap(({ id }) => {
          this.id = id;

          return this.store.select('recipes');
        })
      )
      .subscribe(handleParamsSubscribe);
  }

  handleAddIngredientsToShopping = () => {
    this.recipeService.addIngredientsToShopping(this.recipe.ingredients);
  };

  handleEditClick = () => {
    //this working too, second example just for example purpose
    //this.router.navigate(['edit'], {relativeTo: this.route})
    this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  };

  handleDeleteRecipe = () => {
    this.store.dispatch(deleteRecipe({ payload: parseInt(this.id) }));

    this.router.navigate(['/recipes']);
  };
}
