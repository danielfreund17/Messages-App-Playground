import { Message } from "./message.model";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Injectable } from "@angular/core";
import 'rxjs/Rx'
import { Observable } from "rxjs/Observable";

@Injectable()
export class MessageService {
    private messages: Message[] = [];
    private httpOptions = {
        headers: new HttpHeaders({
          'Content-Type':  'application/json'})
        };

    constructor(private http: HttpClient){}

    addMessage(message : Message){
        const body = JSON.stringify(message);
        return this.http.post('http://localhost:3000/message', body, this.httpOptions)
        .map((response : Response) => {
            const result = response['obj'];
            const newMessage = new Message(result.content, 'Daniel', result._id, null);
            this.messages.push(newMessage);
        })
        .catch(err => Observable.throw(err.json)); // only creates observable
    }

    getMessages(){
        return this.http.get('http://localhost:3000/message')
        .map((respone: Response) => {
            const messages = respone['obj'];
            let myMessages : Message[] = [];
            for(let message of messages) {
                myMessages.push(new Message(message.content, 'DanielF', message._id))
            }

            this.messages = myMessages;
            return myMessages;
        })
        .catch(err => Observable.throw(err.json)); 
    }
    

    deleteMessage(message: Message) { 
        var index = this.messages.indexOf(message);
        this.messages.splice(index,1); //delete one, start from index

        const body = JSON.stringify(message);
        return this.http.delete('http://localhost:3000/message/' + message.messageId, this.httpOptions)
        .map((respone: Response) => {
            const resMessage = respone['message'];
            return resMessage;
        })
        .catch(err => Observable.throw(err.json));
    }

    saveEditedMessage(message: Message) {
        const body = JSON.stringify(message);
        return this.http.patch('http://localhost:3000/message/' + message.messageId, body, this.httpOptions)
        .map((respone: Response) => {
            const resMessage = respone['message'];
            return resMessage;
        })
        .catch(err => Observable.throw(err.json)); 
    }
}