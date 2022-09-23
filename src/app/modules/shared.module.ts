import {NgModule} from "@angular/core";
import {PreloaderComponent} from "../shared/components/preloader/preloader.component";
import {AlertComponent} from "../shared/components/alert/alert.component";
import {PlaceholderDirective} from "../shared/directives/placeholder.directive";
import {AppDropdownDirective} from "../shared/directives/dropdown.directive";
import {CommonModule} from "@angular/common";
import {RouterModule} from "@angular/router";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    PreloaderComponent,
    AlertComponent,
    PlaceholderDirective,
    AppDropdownDirective
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    PreloaderComponent,
    AlertComponent,
    PlaceholderDirective,
    AppDropdownDirective,
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ]
})
export class SharedModule {

}
