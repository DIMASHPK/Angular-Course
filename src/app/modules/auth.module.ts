import {NgModule} from "@angular/core";
import {AuthComponent} from "../shared/components/auth/auth.component";
import {SharedModule} from "./shared.module";
import {AuthRoutingModule} from "../routing/auth-routing.module";

@NgModule({
  declarations: [AuthComponent],
  imports: [SharedModule],
  exports: [AuthComponent, AuthRoutingModule]
})
export class AuthModule {

}
