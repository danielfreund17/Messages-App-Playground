import { Component } from "@angular/core";
import { AuthService } from "./auth.service";

@Component({
    selector: 'app-authentication',
    template: 
    `
<header class="row spacing">
    <nav class="col-md-8 col-md-offset-2">
        <ul class="nav nav-tabs">
            <li routerLinkActive="active"><a [routerLink] = "['signup']">Signup</a></li>
            <li routerLinkActive="active"><a [routerLink] = "['login']" *ngIf="!isLoggedIn()">Login</a></li>
        </ul>
    </nav>
<hr>
<router-outlet></router-outlet>
</header>
    `

    //routerLinkActive - mark tab as class "active" when the router link is the active one 
})
export class AuthenticationComponent {

    constructor(private authService: AuthService) {}

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }

}