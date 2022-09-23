import {
  Component,
  OnDestroy,
  OnInit, ViewChild,
} from '@angular/core';
import { Ingredient } from '../../../models/ingredient.model';
import {ShoppingListService} from "../../../services/shopping-list.service";
import {NgForm} from "@angular/forms";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css'],
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild("ingredientsForm")ingredientsForm!: NgForm;

  editIngredientsSubscription!: Subscription

  editMode = false
  editedItemIndex: number | null = null
  editedItem!: Ingredient;

  constructor(private shoppingListService: ShoppingListService) {}

  ngOnInit() {
    const subscribeIngredientsEditingSubjectHandler = (id: number) => {
      this.editMode = true
      this.editedItemIndex = id;
      this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex)

      const {name, amount} = this.editedItem

      this.ingredientsForm.setValue({
        name,
        amount
      })
    }

    this.editIngredientsSubscription =
      this.shoppingListService.subscribeIngredientsEditingSubject(
        subscribeIngredientsEditingSubjectHandler
      )
  }

  ngOnDestroy() {
    this.editIngredientsSubscription.unsubscribe()
  }

  handleSubmit = (ingredientsForm: NgForm) => {
    const {amount, name} = ingredientsForm.value

    const newIngredient = new Ingredient(name, parseInt(amount))

    if(this.editMode && typeof this.editedItemIndex === 'number'){
      this.shoppingListService.handleEditIngredient(this.editedItemIndex,newIngredient)
    }

    if(!this.editMode){
      this.shoppingListService.handleAddIngredient(newIngredient)
    }

    this.handleClear()
  };

  handleClear = () => {
    this.ingredientsForm.reset();
    this.editMode = false;
    this.editedItemIndex = null
  }

  handleDelete = () => {
    if(typeof this.editedItemIndex === 'number'){
      this.shoppingListService.handleDeleteIngredient(this.editedItemIndex)
      this.handleClear();
    }
  }
}
