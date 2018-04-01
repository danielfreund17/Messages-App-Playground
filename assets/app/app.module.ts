import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from "./app.component";
import {MessageComponent} from "./messages/message.component";
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { HeaderComponent } from './header.component';
import { routing } from './app.routing';
import { LogoutComponent } from './auth/logout.component';
import { LoginComponent } from './auth/login.component';
import { SignupComponent } from './auth/signup.component';
import { HttpClientModule } from '@angular/common/http';
import { AuthService } from './auth/auth.service';
import { ErrorComponent } from './errors/error.component';
import { ErrorService } from './errors/error.service';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {TooltipModule} from "ngx-tooltip";



@NgModule({
    declarations: [
        AppComponent,
        MessageComponent, 
        MessageListComponent,
        MessageInputComponent,
        MessagesComponent,
        AuthenticationComponent,
        HeaderComponent,
        LogoutComponent,
        LoginComponent,
        SignupComponent,
        ErrorComponent
    ],
    imports: [BrowserModule, FormsModule, routing, ReactiveFormsModule, HttpClientModule, TooltipModule],
    providers: [AuthService, ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}