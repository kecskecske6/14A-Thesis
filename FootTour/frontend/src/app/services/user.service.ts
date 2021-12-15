import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment.prod';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  user: User;

  constructor(private http: HttpClient) { }

  insert(data: any) {
    return this.http.put(`${environment.apiURL}/store.php`, data);
  }
}
