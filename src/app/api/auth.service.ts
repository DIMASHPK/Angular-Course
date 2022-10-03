import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AuthResponseData } from '../types';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ApiAuthService {
  constructor(private httpClient: HttpClient) {}

  signup = (email: string, password: string) =>
    this.httpClient.post<AuthResponseData>(environment.signUpUrl, {
      email,
      password,
      returnSecureToken: true,
    });

  login = (email: string, password: string) =>
    this.httpClient.post<AuthResponseData>(environment.signInUrl, {
      email,
      password,
      returnSecureToken: true,
    });
}
