import {NgModule} from "@angular/core";
import {RouterModule, Routes} from "@angular/router";

import {RecipesComponent} from "../pages/recipes/recipes.component";
import {RecipeStartComponent} from "../pages/recipes/recipe-start/recipe-start.component";
import {RecipeDetailComponent} from "../pages/recipes/recipe-detail/recipe-detail.component";
import {RecipeEditComponent} from "../pages/recipes/recipe-edit/recipe-edit.component";
import {RecipesResolverService} from "../resolvers/recipes-resolver.service";
import {AuthGuard} from "../guards/auth.guard";


const routes: Routes = [
  {
    path: "",
    component: RecipesComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: "",
        component: RecipeStartComponent
      },
      {
        path: "new",
        component: RecipeEditComponent
      },
      {
        path: ":id",
        component: RecipeDetailComponent,
        resolve: [RecipesResolverService]
      },
      {
        path: ":id/edit",
        component: RecipeEditComponent,
        resolve: [RecipesResolverService]
      }
    ]
  }
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModule {

}
