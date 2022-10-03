import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';
import {StoreType} from "../../types";
import {setIngredientEditIndex} from "../../store/shoppingList/shopping-list.actions";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
})
export class ShoppingListComponent {
  ingredients!: Observable<StoreType["shoppingList"]>;

  constructor(
    private store: Store<StoreType>
  ) {
    this.ingredients = store.select('shoppingList');
  }

  onEditItem = (index: number) => {
    this.store.dispatch(setIngredientEditIndex({payload: index}))
  };
}
