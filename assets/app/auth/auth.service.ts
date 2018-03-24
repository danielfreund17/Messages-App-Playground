import { HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

@Injectable()
export class AuthService {
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})
        };
    constructor(private http: HttpClient){}

    signup(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:3000/user', body, this.httpOptions)
        .catch((error : Response) => Observable.throw(error));
    }

    login(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:3000/user/login', body, this.httpOptions)
        .catch((error : Response) => Observable.throw(error));
    }
   
    logout(): any {
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}