import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User | undefined = undefined;

  constructor(private http: HttpClient) { }

  insert(data: any): Observable<User> {
    console.log(data);
    return this.http.post<User>(`${environment.apiURL}/store.php`, data);
  }
}
