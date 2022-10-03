import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {AppRoutingModule} from "./routing/app-routing.module";

import { AppComponent } from './app.component';
import { HeaderComponent } from './layout/header/header.component';
import {SharedModule} from "./modules/shared.module";
import {CoreModule} from "./modules/core.module";
import {StoreModule} from "@ngrx/store";
import {rootReducer} from "./store/rootReducer";
import {EffectsModule} from "@ngrx/effects";
import {rootEffects} from "./store/rootEffects";
import {StoreDevtoolsModule} from "@ngrx/store-devtools";
import {environment} from "../environments/environment";
import {StoreRouterConnectingModule} from "@ngrx/router-store";



@NgModule({
  declarations: [AppComponent, HeaderComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    AppRoutingModule,
    SharedModule,
    CoreModule,
    StoreModule.forRoot(rootReducer),
    EffectsModule.forRoot(rootEffects),
    StoreDevtoolsModule.instrument({ logOnly: environment.production }),
    StoreRouterConnectingModule.forRoot()
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
