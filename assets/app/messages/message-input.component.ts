import { Component } from "@angular/core";
import { MessageService } from "./message.service";
import { Message } from "./message.model";
import { NgForm } from "@angular/forms";

@Component({
    selector: 'app-message-input',
    templateUrl: './message-input.component.html',
    //providers: [MessageService] //declared in AppComponent in order to share same instance with message-input component
})

export class MessageInputComponent {

    constructor(private messageService: MessageService) {}

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
}