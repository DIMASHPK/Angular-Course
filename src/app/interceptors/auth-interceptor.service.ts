import {Injectable} from "@angular/core";
import {HttpHandler, HttpInterceptor, HttpParams, HttpRequest} from "@angular/common/http";
import {AuthService} from "../services/auth.service";
import {exhaustMap, take} from "rxjs/operators";
import {User} from "../models/user.model";

@Injectable()
export class AuthInterceptorService implements HttpInterceptor{
  constructor(private authService: AuthService) {}


  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const handleExhaustedMap = (user: User | null) => {
      if(!user?.token){
        return next.handle(req)
      }

      const modifiedRequest = req.clone({
        params: new HttpParams().set("auth", user.token)
      })

      return next.handle(modifiedRequest)
    }

    return this.authService
      .user
      .pipe(
        take(1),
        exhaustMap(handleExhaustedMap)
      )
  }
}
