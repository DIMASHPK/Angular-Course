import {Component, OnDestroy, OnInit} from '@angular/core';

import { Ingredient } from '../../models/ingredient.model';
import {ShoppingListService} from "../../services/shopping-list.service";
import {Observable, Subscription} from "rxjs";
import {Store} from "@ngrx/store";
import {rootReducer} from "../../ngrx/rootReducer";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit , OnDestroy{
  ingredients = [] as Ingredient[]

  ingredientsSubscription!: Subscription;

  constructor(private shoppingListService: ShoppingListService, private store: Store<typeof rootReducer>) {
  }

  ngOnInit() {
    console.log( this.store.select('shoppingList'))
    //this.ingredients = this.store.select('shoppingList')

  }

  ngOnDestroy() {
    this.ingredientsSubscription.unsubscribe()
  }

  onEditItem = (index: number) => {
    this.shoppingListService.fireIngredientsEditingSubject(index)
  }
}
