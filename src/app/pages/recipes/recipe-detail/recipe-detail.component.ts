import { Component, Input, OnInit } from '@angular/core';
import { Recipe } from '../../../models/recipe.model';
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Params, Router} from "@angular/router";

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
})
export class RecipeDetailComponent implements OnInit {
  recipe!: Recipe;
  id!: string

  constructor(private recipeService: RecipeService, private route: ActivatedRoute, private router: Router) {}

  ngOnInit() {
    const handleParamsSubscribe = (params: Params) => {
      const {id} = params

      this.id = id
      this.recipe = this.recipeService.getRecipeById(id)
    }

    this.route.params.subscribe(handleParamsSubscribe)
  }

  handleAddIngredientsToShopping = () => {
    this.recipeService.addIngredientsToShopping(this.recipe.ingredients)
  }

  handleEditClick = () => {
    //this working too, second example just for example purpose
    //this.router.navigate(['edit'], {relativeTo: this.route})
    this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route})
  }

  handleDeleteRecipe = () => {
    this.recipeService.deleteRecipe(parseInt(this.id))

    this.router.navigate(['/recipes'])
  }
}
