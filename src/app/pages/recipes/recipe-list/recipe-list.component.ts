import {Component, OnDestroy, OnInit} from '@angular/core';

import { Recipe } from '../../../models/recipe.model';
import {RecipeService} from "../../../services/recipe.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css'],
})
export class RecipeListComponent implements OnInit, OnDestroy {
  recipes: Recipe[] = []

  recipeSubjectSubscription!: Subscription

  constructor(private recipeService: RecipeService, private router: Router, private route: ActivatedRoute) {
    this.recipes = this.recipeService.getRecipes()
  }

  ngOnInit() {
    const handleRecipeSubscribe = (recipes: Recipe[]) => {
      this.recipes = recipes
    }

    this.recipeSubjectSubscription =  this.recipeService.recipeSubjectSubscribe(handleRecipeSubscribe)
  }

  ngOnDestroy() {
    this.recipeSubjectSubscription.unsubscribe()
  }

  handleNewClick  = () => {
    this.router.navigate(['new'], {relativeTo: this.route})
  }
}
