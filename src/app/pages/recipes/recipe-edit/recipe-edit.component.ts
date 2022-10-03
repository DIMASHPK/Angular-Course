import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import {
  UntypedFormArray,
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
} from '@angular/forms';
import { Ingredient } from '../../../models/ingredient.model';
import { Recipe } from '../../../models/recipe.model';
import { Store } from '@ngrx/store';
import { StoreType } from '../../../types';
import { addRecipe, editRecipe } from '../../../store/recipes/recipe.actions';
import { flatMap, mergeMap, Subscription, tap } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css'],
})
export class RecipeEditComponent implements OnInit {
  id!: number;
  editMode = false;
  currentRecipe!: Recipe;

  recipeForm!: UntypedFormGroup;

  routeSubscription!: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private store: Store<StoreType>
  ) {}

  ngOnInit(): void {
    const handleMergeMap = ({ id }: Params) => {
      this.id = parseInt(id);
      this.editMode = Boolean(id);

      return this.store.select('recipes');
    };

    const handleParamsSubscribe = ({ recipes }: StoreType['recipes']) => {
      this.currentRecipe = recipes[this.id];

      this.initForm();
    };

    this.route.params
      .pipe(mergeMap(handleMergeMap))
      .subscribe(handleParamsSubscribe);
  }

  initForm = () => {
    let name = '';
    let imagePath = '';
    let description = '';
    let recipeIngredients = new UntypedFormArray([]);

    if (this.editMode) {
      ({ name, imagePath, description } = this.currentRecipe);
      const { ingredients } = this.currentRecipe;

      if (ingredients?.length) {
        const handleForEach = ({ name, amount }: Ingredient) => {
          recipeIngredients.push(
            new UntypedFormGroup({
              name: new UntypedFormControl(name, Validators.required),
              amount: new UntypedFormControl(amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/),
              ]),
            })
          );
        };

        ingredients.forEach(handleForEach);
      }
    }

    this.recipeForm = new UntypedFormGroup({
      name: new UntypedFormControl(name, Validators.required),
      imagePath: new UntypedFormControl(imagePath, Validators.required),
      description: new UntypedFormControl(description, Validators.required),
      ingredients: recipeIngredients,
    });
  };

  onSubmit = () => {
    const { name, imagePath, description, ingredients } = this.recipeForm.value;

    const newRecipe = new Recipe(name, description, imagePath, ingredients);

    if (this.editMode) {
      this.store.dispatch(
        editRecipe({ payload: { recipe: newRecipe, index: this.id } })
      );
    } else {
      this.store.dispatch(addRecipe({ payload: newRecipe }));
    }

    this.onCancel();
  };

  get ingredientsControls() {
    return (<UntypedFormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient = () => {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).push(
      new UntypedFormGroup({
        name: new UntypedFormControl('', Validators.required),
        amount: new UntypedFormControl('', [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/),
        ]),
      })
    );
  };

  onCancel = () => {
    this.router.navigate(['../'], { relativeTo: this.route });
  };

  onDeleteIngredient = (index: number) => {
    (<UntypedFormArray>this.recipeForm.get('ingredients')).removeAt(index);
  };
}
