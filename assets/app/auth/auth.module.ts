import { CommonModule } from "@angular/common";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { AuthService } from "./auth.service";
import { NgModule } from "@angular/core";
import { LogoutComponent } from "./logout.component";
import { LoginComponent } from "./login.component";
import { SignupComponent } from "./signup.component";

@NgModule({
    declarations: [
        LogoutComponent,
        LoginComponent,
        SignupComponent
    ],
    imports: [
        CommonModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [
        AuthService
    ]
})
export class AuthModule {

}