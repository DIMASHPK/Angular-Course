import {Injectable} from "@angular/core";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, BehaviorSubject, throwError} from "rxjs";
import {User} from "../models/user.model";
import {tap} from "rxjs/operators";
import {Router} from "@angular/router";

interface userStorageData {
  email: string,
  id: string,
  _token: string,
  _tokenExpirationDate: string
}

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  localId: string;
  registered?: boolean;
  expiresIn: string
}

@Injectable({
  providedIn: "root"
})
export class AuthService {
  private userSubject = new BehaviorSubject<User | null>(null);

  private apiKey = "AIzaSyCZ5TgzGlktYzwu9qg3rH3oLYkb4mzI07w"
  private signUpUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${this.apiKey}`
  private signInUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${this.apiKey}`

  private tokenExpirationTimer:any = null

  constructor(private httpClient: HttpClient, private router: Router) {
  }

  private handleError = (errorRes: HttpErrorResponse) => {
    let errorMessage = "An unknown error occurred"

    if(!errorRes?.error?.error){
      return throwError(() => new Error(errorMessage))
    }

    switch (errorRes.error.error.message){
      case "EMAIL_EXISTS":
        errorMessage = "This email already exists"
        break;
      case "EMAIL_NOT_FOUND":
        errorMessage = "This email does not exists"
        break;
      case "INVALID_PASSWORD":
        errorMessage = "This password is not correct."
        break;
    }

    return throwError(() => new Error(errorMessage))
  }

  private handleAuthentication = ({email, localId, idToken, expiresIn}: AuthResponseData) => {
    const convertedToNumberExpiresIn = parseInt(expiresIn)
    const expirationDate = new Date(new Date().getTime() + convertedToNumberExpiresIn * 1000)

    const user = new User(email, localId, idToken, expirationDate);

    this.fireUserSubject(user)

    this.autoLogout(convertedToNumberExpiresIn  * 1000)

    localStorage.setItem('userData', JSON.stringify(user))
  }

  fireUserSubject = (userData: User | null) => {
    this.userSubject.next(userData)
  }

  subscribeUserSubject = (callback: (userDate: User | null) => void) => this.userSubject.subscribe(callback)

  get user(){
    return this.userSubject
  }

  signup = (email: string, password: string) =>
    this.httpClient
      .post<AuthResponseData>(this.signUpUrl, {
        email,
        password,
        returnSecureToken: true
      })
      .pipe(
        catchError(this.handleError),
        tap(this.handleAuthentication)
      )

  login = (email: string, password: string) =>
    this.httpClient.post<AuthResponseData>(this.signInUrl, {
      email,
      password,
      returnSecureToken: true
    }).pipe(
      catchError(this.handleError),
      tap(this.handleAuthentication)
    )

  logout = () => {
    this.fireUserSubject(null)
    this.router.navigate(['/auth'])

    localStorage.removeItem('userData')

    if(this.tokenExpirationTimer){
      clearTimeout(this.tokenExpirationTimer)
    }

    this.tokenExpirationTimer = null
  }

  autoLogout = (expirationDuration: number) => {
    const handleTimeout = () => {
      this.logout()
    }

    this.tokenExpirationTimer = setTimeout(handleTimeout, expirationDuration)
  }

  autoLogin = () => {
    const userData = localStorage.getItem('userData')

    if(!userData){
      return;
    }

    const {email, id, _token, _tokenExpirationDate}: userStorageData = JSON.parse(userData)

    const loadedUser = new User(email, id, _token, new Date(_tokenExpirationDate))

    if(loadedUser.token){
      this.fireUserSubject(loadedUser)

      const expirationDuration = new Date(loadedUser.tokenExpirationDate).getTime() - new Date().getTime()

      this.autoLogout(expirationDuration)
    }

  }

}
