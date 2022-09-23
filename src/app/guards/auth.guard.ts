import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot} from "@angular/router";
import {Injectable} from "@angular/core";
import {AuthService} from "../services/auth.service";
import {map, take} from "rxjs/operators";
import {User} from "../models/user.model";

@Injectable({
  providedIn: "root"
})
export class AuthGuard implements CanActivate{
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const handleMap = (userData: User | null) => {

      const isAuth = !!userData

      if(isAuth){
        return true
      }

      return this.router.createUrlTree(['/auth'])
    }

    return this.authService.user.pipe(take(1),map(handleMap))
  }

}
