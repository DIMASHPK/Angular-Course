import {NgModule} from "@angular/core";
import {PreloadAllModules, RouterModule, Routes} from "@angular/router";


const routes: Routes = [
  {
    path:"",
    redirectTo: "/recipes",
    pathMatch: "full"
  },
  {
    path: "recipes",
    loadChildren: () =>
      import('../modules/recipes.module')
        .then(module => module.RecipesModule)
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('../modules/auth.module')
        .then(module => module.AuthModule)
  },
  {
    path: 'shopping-list',
    loadChildren: () =>
      import('../modules/shopping-list.module')
        .then(module => module.ShoppingListModule)
  }

]

@NgModule({
 imports: [RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules, initialNavigation: 'enabledBlocking' })],
  exports: [RouterModule]
})
export class AppRoutingModule {

}
