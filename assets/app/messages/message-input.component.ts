import { Component } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { NgForm } from "@angular/forms";
import { AuthService } from "../auth/auth.service";
import { Router } from "@angular/router";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    styles : [`
      .sticky-box-shadow {
        box-shadow: 5px 0px 10px 5px rgba(0,0,0,0.5);
        position: absolute;
        left:0;
        margin-left: 20px;
        float:left;
        align-content: left;
        width: 400px;
        margin-top: 30px;   
      }
    `]
    //providers: [MessageService] //declared in AppComponent in order to share same instance with message-input component
})

export class MessageInputComponent {

    constructor(private messageService: MessageService, private authService: AuthService, private router: Router) {}

    onSubmit(form : NgForm){
        console.log(form);
        var message = new Message(form.value.messageContent, 'DanielF');
        this.messageService.addMessage(message).subscribe(
            data => console.log(data),
            err => console.log(err)
        );
       // console.log(this.messageService.getMessages());
        form.resetForm();
    }

    onLogout() {
        this.authService.logout();
        this.router.navigateByUrl('/auth/login');
    }

    isLoggedIn() {
        return this.authService.isLoggedIn();
    }
}