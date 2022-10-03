import { createAction, props } from '@ngrx/store';
import {
  LOGIN_START,
  LOGOUT,
  AUTH_FAIL,
  SIGN_UP_START,
  AUTH_SUCCESS, RESET_ERROR, AUTO_LOGIN,
} from './auth.constants';
import { User } from '../../models/user.model';
import { AuthDataType } from '../../types';

export const loginStart = createAction(
  LOGIN_START,
  props<{ payload: AuthDataType }>()
);

export const signUpStart = createAction(
  SIGN_UP_START,
  props<{ payload: AuthDataType }>()
);

export const authSuccess = createAction(
  AUTH_SUCCESS,
  props<{ payload: User & {redirect: boolean} }>()
);

export const authFail = createAction(AUTH_FAIL, props<{ payload: string }>());

export const resetError = createAction(RESET_ERROR)

export const logout = createAction(LOGOUT);

export const autoLogin = createAction(AUTO_LOGIN)
