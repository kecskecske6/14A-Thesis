import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { retry, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { LoginResponse } from '../interfaces/loginresponse';
import { environment } from 'src/environments/environment.prod';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private router: Router, private http: HttpClient, private userService : UserService) { }

  httpOptions = {
    headers: new HttpHeaders({'Content-Type' : 'application/json'})
  };
  handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('Hiba lépett fel:', error.error.message);
    } else {
      console.error(
        `A szerver a következővel válaszolt: ${error.status}, ` +
        `A body: ${error.error}`);
    }
    if(error.status == 401){
      return throwError("Hibás felhasználónév vagy jelszó");
    }
    else{
      return throwError("Váratlan hiba történt!");
    }
  }

  loginForm(data : any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(environment.backendURL + '/api/' + 'login.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }

  setUser(resp: LoginResponse) {
    localStorage.setItem('id', resp.id.toString());
    localStorage.setItem('access_token', resp.access_token);
  }

  isLoggedIn() {
    return localStorage.getItem('access_token') != null;
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['login']);
    this.userService.logOutUser();
    
  }

  getToken(): string{
    return localStorage.getItem('access_token')!;
  }

  getId(): string{
    return localStorage.getItem('id')!;
  }

  getData(data : any): Observable<LoginResponse> {
    return this.http
      .post<LoginResponse>(environment.backendURL + '/api/' + 'login.php', data, this.httpOptions)
      .pipe(
        retry(2),
        catchError(this.handleError)
      );
  }
}
