import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user: User | undefined = undefined;

  constructor(private http: HttpClient) {}
  
  insert(data: any): Observable<User> {
    console.log(data);
    return this.http.post<User>(`${environment.apiURL}/store.php`, data);
  }

  login(data : any): Observable<User>{
   // console.log(data);
   // console.log(environment.backend);
    return this.http.post<User>(`${environment.backend}login.php`, data);
  }

  setUser(user : User){
    this.user = user;
  }
}
