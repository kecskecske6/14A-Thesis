import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../interfaces/user';
import { environment } from 'src/environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  user! : User;

  constructor(private http: HttpClient) {}
  
  insert(data: any): Observable<User> {
    console.log(data);
    return this.http.post<User>(`${environment.apiURL}/store.php`, data);
  }

  SetUser(name : string){
    this.user.name = name;
  }
}
