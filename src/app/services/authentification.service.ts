import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {Router} from "@angular/router";
import { map, Observable } from 'rxjs';
import { User } from '../model/users.model';

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  public username : any;
  public roles : string[] = [];
  public authenticated : boolean =false;
  private apiUrl = 'http://localhost:3000/users'; // json-server --watch users.json --port 3000

  constructor(private http: HttpClient, private router: Router) {}

  public login(username: string, password: string): Observable<boolean> {
    return this.http.get<any[]>(this.apiUrl).pipe(
      map(users => {
        const user = users.find(u => u.username === username && u.password === password);
        if (user) {
          this.username = user.username;
          this.roles = user.roles;
          this.authenticated = true;
          return true;
        } else {
          return false;
        }
      })
    );
  }

  logout() {
    this.authenticated=false;
    this.username = undefined;
    this.roles = [];
    this.router.navigateByUrl("/login");
  }

  addUser(user :User): Observable<any> {
    return this.http.post(this.apiUrl, user);
  }
}
