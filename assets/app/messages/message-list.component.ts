import { Component, OnInit } from "@angular/core";
import { Message } from "./message.model";
import { MessageService } from "./message.service";
import { Observable, Subscription } from "rxjs";

@Component({
    selector: 'app-message-list',
    template:
     `
    <div class="col-md-8 col-md-offset-2">
        <app-message
            *ngFor="let appMessage of appMessages"
            [message] = "appMessage" 
            (stopPoolingEvent) = "stopPooling()"
            (continuePoolingEvent) = "continuePooling()">
         </app-message>
    </div>
    `,
    //(editClicked) - The output (the event is the output)
    //[message] = "appMessage" The input of app-message component
   // providers: [MessageService] //declared in AppComponent in order to share same instance with message-input component
})
export class MessageListComponent implements OnInit {

    ///appMessages has same reference as messageService.messages, so when we add message from message-imput component, the *ngFor will add the new added message
    appMessages: Message[]; 
    messagePooler: Subscription;
 
    constructor(private messageService : MessageService){
        //this.appMessages = this.messageService.getMessages();
     }

     ngOnInit(): void { //invoked after ctor
        //Make a call to get messages every 2 seconds
        this.startPooling();
    }

    stopPooling() {
        this.messagePooler.unsubscribe();
    }
    
    continuePooling() {
        this.startPooling();
    }

    startPooling() {
        this.messagePooler = Observable.interval(2000).subscribe((val) => {
            this.messageService.getMessages().subscribe(
                (messages: Message[]) => {
                    this.appMessages = messages;
                });
            });
    }


}