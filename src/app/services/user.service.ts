import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../Model/User';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private _url =
    'https://script.google.com/macros/s/AKfycbxkNYAikOLYEkeVmDdk-GTpXAQWvyU5FAxLWEf1j9jdBo9JlaM/exec';

  constructor(private http: HttpClient) {}

  postData(obj): Observable<any> {
    if (localStorage.getItem('user') === null) {
      const users = [obj];
      localStorage.setItem('user', JSON.stringify(users));
    } else {
      const users = [...JSON.parse(localStorage.getItem('user')), obj];
      localStorage.clear();
      localStorage.setItem('user', JSON.stringify(users));
    }
    return this.http.get<User>(this._url, {
      params: { data: JSON.stringify(obj) },
    });
  }

  getData() {
    return JSON.parse(localStorage.getItem('user'));
  }
}
