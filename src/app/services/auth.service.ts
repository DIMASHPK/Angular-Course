import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { of } from 'rxjs';
import { User } from '../models/user.model';
import { Store } from '@ngrx/store';
import { AuthResponseData, StoreType, userStorageData } from '../types';
import { authFail, authSuccess, logout } from '../store/auth/auth.actions';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private tokenExpirationTimer: any = null;

  constructor(
    private httpClient: HttpClient,
    private store: Store<StoreType>
  ) {}

  handleAuthError = (errorRes: HttpErrorResponse) => {
    let errorMessage = 'An unknown error occurred';

    if (!errorRes?.error?.error) {
      return of(authFail({ payload: errorMessage }));
    }

    switch (errorRes.error.error.message) {
      case 'EMAIL_EXISTS':
        errorMessage = 'This email already exists';
        break;
      case 'EMAIL_NOT_FOUND':
        errorMessage = 'This email does not exists';
        break;
      case 'INVALID_PASSWORD':
        errorMessage = 'This password is not correct.';
        break;
    }

    return of(authFail({ payload: errorMessage }));
  };

  private handleAuthData = ({
    email,
    localId,
    idToken,
    expiresIn,
  }: AuthResponseData) => {
    const convertedToNumberExpiresIn = parseInt(expiresIn);
    const expirationDate = new Date(
      new Date().getTime() + convertedToNumberExpiresIn * 1000
    );

    const user = new User(email, localId, idToken, expirationDate);

    this.autoLogout(convertedToNumberExpiresIn * 1000);

    localStorage.setItem('userData', JSON.stringify(user));

    return user;
  };

  auth = (authData: AuthResponseData) => {
    const user = this.handleAuthData(authData);

    return authSuccess({ payload: Object.assign(user, { redirect: true }) });
  };

  logout = () => {
    this.store.dispatch(logout());

    if (this.tokenExpirationTimer) {
      clearTimeout(this.tokenExpirationTimer);
    }

    this.tokenExpirationTimer = null;
  };

  autoLogout = (expirationDuration: number) => {
    const handleTimeout = () => {
      this.logout();
    };

    this.tokenExpirationTimer = setTimeout(handleTimeout, expirationDuration);
  };

  autoLogin = () => {
    const userData = localStorage.getItem('userData');

    if (!userData) {
      return { type: 'DUMMY' };
    }

    const { email, id, _token, _tokenExpirationDate }: userStorageData =
      JSON.parse(userData);

    const loadedUser = new User(
      email,
      id,
      _token,
      new Date(_tokenExpirationDate)
    );

    if (loadedUser.token) {
      const expirationDuration =
        new Date(loadedUser.tokenExpirationDate).getTime() -
        new Date().getTime();

      this.autoLogout(expirationDuration);

      return authSuccess({
        payload: Object.assign(loadedUser, { redirect: false }),
      });
    }

    return { type: 'DUMMY' };
  };
}
