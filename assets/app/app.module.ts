import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {FormsModule, ReactiveFormsModule} from '@angular/forms'
import { AppComponent } from "./app.component";
import {MessageComponent} from "./messages/message.component";
import { MessageListComponent } from './messages/message-list.component';
import { MessageInputComponent } from './messages/message-input.component';
import { MessagesComponent } from './messages/messages.component';
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
import { StickyNavModule } from 'ng2-sticky-nav';
import { MessageModule } from './messages/message.module';
import { AuthModule } from './auth/auth.module';
import { AuthenticationComponent } from './auth/authentication.component';

@NgModule({
    declarations: [
        AppComponent,
        AuthenticationComponent,
        HeaderComponent,
        ErrorComponent
    ],
    imports: [
        BrowserModule,
        FormsModule,
        routing,
        ReactiveFormsModule,
        HttpClientModule,
        TooltipModule,
        MessageModule,
        AuthModule
    ],
    providers: [ErrorService],
    bootstrap: [AppComponent]
})
export class AppModule {

}