import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import {
  addIngredient,
  deleteIngredient,
  editIngredient, setIngredientEditIndex,
} from '../../../store/shoppingList/shopping-list.actions';
import { StoreType } from '../../../types';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('ingredientsForm') ingredientsForm!: NgForm;

  editIngredientsSubscription!: Subscription;

  editMode = false;
  editedItem!: Ingredient;

  constructor(private store: Store<StoreType>) {}

  ngOnInit() {
    const subscribeIngredientsEditingSubjectHandler = ({
      editIngredientIndex,
      ingredients,
    }: StoreType['shoppingList']) => {
      if (editIngredientIndex !== null && ingredients[editIngredientIndex]) {
        this.editMode = true;
        this.editedItem = ingredients[editIngredientIndex];

        const { name, amount } = this.editedItem;

        this.ingredientsForm.setValue({
          name,
          amount,
        });
      }
    };

    this.editIngredientsSubscription = this.store
      .select('shoppingList')
      .subscribe(subscribeIngredientsEditingSubjectHandler);
  }

  ngOnDestroy() {
    this.editIngredientsSubscription.unsubscribe();

    this.store.dispatch(setIngredientEditIndex({payload: null}))
  }

  handleSubmit = (ingredientsForm: NgForm) => {
    const { amount, name } = ingredientsForm.value;

    const newIngredient = new Ingredient(name, parseInt(amount));

    if (this.editMode) {
      this.store.dispatch(
        editIngredient({
          payload: {
            ingredient: newIngredient,
          },
        })
      );
    }

    if (!this.editMode) {
      this.store.dispatch(addIngredient({ payload: newIngredient }));
    }

    this.handleClear();
  };

  handleClear = () => {
    this.ingredientsForm.reset();
    this.editMode = false;

    this.store.dispatch(setIngredientEditIndex({payload: null}))
  };

  handleDelete = () => {
      this.store.dispatch(deleteIngredient());
      this.handleClear();
  };
}
