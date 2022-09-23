import {Ingredient} from "../models/ingredient.model";
import {Subject, Subscription} from "rxjs";

export class ShoppingListService {
  private ingredientsSubject = new Subject<Ingredient[]>()
  private ingredientsSubscription!: Subscription

  private ingredientEditingSubject = new Subject<number>()

  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];

  getIngredients = () => {
    return this.ingredients.slice()
  }

  getIngredient = (index: number) => this.getIngredients()[index]

  private fireIngredients = (ingredients?: Ingredient[]) => {
    console.log(this.getIngredients())

    this.ingredientsSubject.next(ingredients || this.getIngredients())
  }

  subscribeIngredients = (callback: (ingredients: Ingredient[]) => any) =>
    this.ingredientsSubscription = this.ingredientsSubject.subscribe(callback)

  handleAddIngredient = (ingredient: Ingredient) => {
    this.ingredients.push(new Ingredient(ingredient.name, ingredient.amount));

    this.fireIngredients()
  };

  handleEditIngredient = (index: number, ingredient: Ingredient) => {
    this.ingredients[index] = ingredient;

    this.fireIngredients()
  }

  handleDeleteIngredient = (index: number) => {
    this.ingredients.splice(index, 1);

    this.fireIngredients()
  }

  handleAddIngredients = (ingredients: Ingredient[]) => {
    this.ingredients.push(...ingredients)

    this.fireIngredients()
  };

  fireIngredientsEditingSubject = (id: number) => {
    this.ingredientEditingSubject.next(id)
  }

  subscribeIngredientsEditingSubject = (callback: (index: number) => any ) =>
    this.ingredientEditingSubject.subscribe(callback)
}
