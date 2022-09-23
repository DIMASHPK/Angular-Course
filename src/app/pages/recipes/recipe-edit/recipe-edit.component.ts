import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Params, Router} from "@angular/router";
import {FormArray, FormControl, FormGroup, Validators} from "@angular/forms";
import {RecipeService} from "../../../services/recipe.service";
import {Ingredient} from "../../../models/ingredient.model";
import {Recipe} from "../../../models/recipe.model";

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id!: number
  editMode = false

  recipeForm!: FormGroup

  constructor(private route: ActivatedRoute, private recipeService: RecipeService, private router: Router) { }

  ngOnInit(): void {
    const handleParamsSubscribe = (params: Params) => {
      const {id} = params

      this.id = parseInt(id)
      this.editMode = Boolean(id)

      this.initForm()
    }

    this.route.params.subscribe(handleParamsSubscribe)
  }

  initForm = () => {
    let name = "";
    let imagePath = "";
    let description = ""
    let recipeIngredients = new FormArray([])

    if(this.editMode){
      const currentRecipe = this.recipeService.getRecipeById(this.id);

      ({name, imagePath, description} = currentRecipe);
      const {ingredients} = currentRecipe

      if(ingredients?.length){
        const handleForEach = ({name, amount}: Ingredient) => {
          recipeIngredients.push(new FormGroup({
            name: new FormControl(name, Validators.required),
            amount: new FormControl(amount, [
              Validators.required,
              Validators.pattern(/^[1-9]+[0-9]*$/)
            ])
          }))
        }

        ingredients.forEach(handleForEach)
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(name, Validators.required),
      imagePath: new FormControl(imagePath, Validators.required),
      description: new FormControl(description, Validators.required),
      ingredients: recipeIngredients
    })
  }

  onSubmit = () => {
    const {name, imagePath, description, ingredients} = this.recipeForm.value

    const newRecipe = new Recipe(name, description, imagePath, ingredients)

    if(this.editMode){
      this.recipeService.updateRecipe(this.id, newRecipe)
    }else {
      this.recipeService.addRecipe(newRecipe)
    }

    this.onCancel()
  }

  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  onAddIngredient = () => {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl("", Validators.required),
      amount: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[1-9]+[0-9]*$/)
      ])
    }))
  }

  onCancel = () => {
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient = (index: number) => {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }
}
