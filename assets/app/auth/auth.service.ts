import { HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { Injectable, EventEmitter, Output } from "@angular/core";
import { Observable } from "rxjs";
import { ErrorService } from "../errors/error.service";

@Injectable()
export class AuthService {
    @Output() onLogoutEvent: EventEmitter<any> = new EventEmitter();
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})
        };
    constructor(private http: HttpClient, private errorService: ErrorService){}

    signup(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:3000/user', body, this.httpOptions)
        .catch((error : Response) => { 
            this.errorService.handleError(error['error']);
            return Observable.throw(error);
        });
    }

    login(user: User) {
        const body = JSON.stringify(user);
        return this.http.post('http://localhost:3000/user/login', body, this.httpOptions)
        .catch((error : Response) => { 
            this.errorService.handleError(error['error']);
            return Observable.throw(error);
        });
    }
   
    logout(): any {
        this.onLogoutEvent.emit();
        localStorage.clear();
    }

    isLoggedIn() {
        return localStorage.getItem('token') !== null;
    }
}