import {Routes, RouterModule} from '@angular/router';
import { MessagesComponent } from './messages/messages.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { AUTH_ROUTES } from './auth/auth.routes';

const APP_ROUTES: Routes = [
    {path: '', redirectTo: '/messages', pathMatch :'full'}, //only react to this path if '' is the FULL PATH and not partial
    {path: 'messages', component: MessagesComponent},
    {path: 'auth', component: AuthenticationComponent, children: AUTH_ROUTES} //use AUTH_ROUTES as child routes of auth (ex: auth/login, auth/logout)
];

export const routing = RouterModule.forRoot(APP_ROUTES);
