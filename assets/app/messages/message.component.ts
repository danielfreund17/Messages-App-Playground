
import {Component, Input} from "@angular/core";
import {Message} from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message',
    templateUrl: './message.component.html',
    styles: [`
        .author {
            display: inline-block;
            test-align: left;
            font-style: italic;
            font-size: 12px;
            width: 80%;
        }
        .config {
            display: inline-block;
            test-align: right;
            font-size: 12px;
            width: 19%;
        }
   `]
})
export class MessageComponent {
    @Input() message : Message; //input comes from messaes-list (ngForeach) 
    showEdit: boolean = false;

    constructor(private messageService: MessageService){}

    onDelete() {
        //TODO- http req
        this.messageService.deleteMessage(this.message).subscribe(
            res => console.log(res),
            err => console.log(err)
        );
    }

    onSave(){
        this.messageService.saveEditedMessage(this.message).subscribe(
            data => console.log(data),
            err => console.log(err)
        );

        this.showEdit = !this.showEdit;
    }
}