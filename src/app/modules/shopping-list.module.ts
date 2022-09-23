import {NgModule} from "@angular/core";
import {ShoppingListComponent} from "../pages/shopping-list/shopping-list.component";
import {ShoppingEditComponent} from "../pages/shopping-list/shopping-edit/shopping-edit.component";
import {ShoppingListRoutingModule} from "../routing/shopping-list-routing.module";
import {SharedModule} from "./shared.module";

@NgModule({
  declarations: [
    ShoppingListComponent,
    ShoppingEditComponent,
  ],
  imports: [
    ShoppingListRoutingModule,
    SharedModule
  ],
  exports: []
})
export class ShoppingListModule {}
