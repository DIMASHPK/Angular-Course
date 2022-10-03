import { Injectable } from '@angular/core';
import {
  HttpHandler,
  HttpInterceptor,
  HttpParams,
  HttpRequest,
} from '@angular/common/http';
import { exhaustMap, take } from 'rxjs/operators';
import { StoreType } from '../types';
import { Store } from '@ngrx/store';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {
  constructor(private store: Store<StoreType>) {}

  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const handleExhaustedMap = ({ user }: StoreType['auth']) => {
      if (!user?.token) {
        return next.handle(req);
      }

      const modifiedRequest = req.clone({
        params: new HttpParams().set('auth', user.token),
      });

      return next.handle(modifiedRequest);
    };

    return this.store
      .select('auth')
      .pipe(take(1), exhaustMap(handleExhaustedMap));
  }
}
