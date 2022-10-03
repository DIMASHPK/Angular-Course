import { StoreType } from '../../types';
import { createReducer, on } from '@ngrx/store';
import {
  authSuccess,
  logout,
  loginStart,
  authFail,
  signUpStart,
  resetError,
} from './auth.actions';

const initialState: StoreType['auth'] = {
  user: null,
  error: null,
  loading: false,
};

export const authReducer = createReducer(
  initialState,
  on(loginStart, signUpStart, state => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(
    authSuccess,
    (state, { payload: { email, id, token, tokenExpirationDate } }) => ({
      ...state,
      error: null,
      loading: false,
      user: { email, id, token, tokenExpirationDate },
    })
  ),
  on(authFail, (state, { payload: error }) => ({
    ...state,
    loading: false,
    error,
  })),
  on(logout, state => ({ ...state, user: null })),
  on(resetError, state => ({ ...state, error: null }))
);
