import { Component } from "@angular/core";
import { AuthService } from "./auth/auth.service";
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';


@Component({
    selector: 'app-header',
    templateUrl : './header.component.html',
    styles: [`
        .tooltip-inner {
            color: #000080;
        }
        .tooltip {
            visibility: visible;
            top: 42px;
            left: 150px;
          }
    `]
})
export class HeaderComponent {
    constructor(private authService: AuthService){}
    isUserLoggedIn() {
        return this.authService.isLoggedIn();
    }

}