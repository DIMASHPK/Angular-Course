import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from "./routing/app-routing.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import {SharedModule} from "./modules/shared.module";
import {CoreModule} from "./modules/core.module";
import {StoreModule} from "@ngrx/store";
import {rootReducer} from "./ngrx/rootReducer";



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(rootReducer)
  ],
  providers: [],
  bootstrap: [AppComponent],

})
export class AppModule {}
