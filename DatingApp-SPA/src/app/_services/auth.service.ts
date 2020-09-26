import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  baseUrl: any = environment.apiUrl + 'auth/';
  jwtHelperService = new JwtHelperService();
  decodedToken: any;

  constructor(private http: HttpClient) {}

  login(model: any) {
    return this.http.post(this.baseUrl + 'login', model).pipe(
      map((response: any) => {
        const user = response;
        if (user) {
          localStorage.setItem('token', user.token);
          this.decodedToken = this.jwtHelperService.decodeToken(user.token);
        }
      })
    );
  }

  loggedIn() {
    if (localStorage.getItem('token')) {
      return true;
    }
    return false;
  }

  register(model: any) {
    return this.http.post(this.baseUrl + 'register', model);
  }
}
