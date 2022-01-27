import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../interfaces/user';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  userName!: string | null;

  constructor(private http: HttpClient) {
  }
  
  insert(data: any): Observable<User> {
    return this.http.post<User>(`${environment.backendURL}/api/store.php`, data);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(`${environment.backendURL}/api/users/list.php?id=${id}`);
  }

  SetUser(name : string){
    this.userName = name;
  }

  getUserId() : number{
    return Number(localStorage.getItem("id"));
  }

  getName(){
    return localStorage.getItem("name");
  }

  logOutUser(){
   localStorage.clear();
   this.userName = null;
  }
}
