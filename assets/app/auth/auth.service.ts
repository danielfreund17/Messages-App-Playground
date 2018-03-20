import { HttpHeaders, HttpClient } from "@angular/common/http";
import { User } from "./user.model";
import { Injectable } from "@angular/core";

@Injectable()
export class AuthService {
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})
        };

    constructor(private http: HttpClient){}
}