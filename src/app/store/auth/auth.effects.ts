import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Injectable } from '@angular/core';
import { catchError, of, switchMap, tap } from 'rxjs';
import { AuthService } from '../../services/auth.service';
import { map } from 'rxjs/operators';
import {
  authSuccess,
  autoLogin,
  loginStart,
  logout,
  signUpStart,
} from './auth.actions';
import { ApiAuthService } from '../../api/auth.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthEffects {
  authLogin$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loginStart),
      switchMap(({ payload: { email, password } }) =>
        this.apiAuth
          .login(email, password)
          .pipe(
            map(this.authService.auth),
            catchError(this.authService.handleAuthError)
          )
      )
    )
  );

  authSignUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(signUpStart),
      switchMap(({ payload: { email, password } }) =>
        this.apiAuth
          .signup(email, password)
          .pipe(
            map(this.authService.auth),
            catchError(this.authService.handleAuthError)
          )
      )
    )
  );

  authRedirect$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(authSuccess),
        tap(({payload: {redirect}}) => {
          if(redirect) this.router.navigate(['/']);
        })
      ),
    { dispatch: false }
  );

  authLogout$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(logout),
        tap(() => {
          this.router.navigate(['/auth']);

          localStorage.removeItem('userData');
        })
      ),
    { dispatch: false }
  );

  autoLogin$ = createEffect(() =>
    this.actions$.pipe(ofType(autoLogin), map(this.authService.autoLogin))
  );

  constructor(
    private actions$: Actions,
    private authService: AuthService,
    private apiAuth: ApiAuthService,
    private router: Router
  ) {}
}
