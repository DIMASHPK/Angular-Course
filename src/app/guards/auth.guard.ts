import {
  ActivatedRouteSnapshot,
  CanActivate,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { Injectable } from '@angular/core';
import { map, take } from 'rxjs/operators';
import { StoreType } from '../types';
import { Store } from '@ngrx/store';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private store: Store<StoreType>, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const handleMap = ({ user: userData }: StoreType['auth']) => {
      const isAuth = !!userData;

      console.log(userData)

      if (isAuth) {
        return true;
      }

      return this.router.createUrlTree(['/auth']);
    };

    return this.store.select('auth').pipe(take(1), map(handleMap));
  }
}
