import { Message } from "./message.model";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Injectable } from "@angular/core";
import 'rxjs/Rx'
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth/auth.service";

@Injectable()
export class MessageService {
    private messages: Message[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.onLogoutEvent.subscribe({
            next: () => this.messages = null
        });
    }

    addMessage(message : Message){
        let httpOptions = this.getHTTPHeaders();
        const body = JSON.stringify(message);
        return this.http.post('http://localhost:3000/message', body, httpOptions)
        .map((response : Response) => {
            const msg = response['msg'];
            const firstName = response['userFirstName'];
            const lastName = response['userLastName'];
            const newMessage = new Message(msg.content,
                firstName + ' ' + lastName,
                 msg._id,
                 msg.user);
            this.messages.push(newMessage);
        })
        .catch(err => Observable.throw(err.json)); // only creates observable
    }

    getMessages(){
        let httpOptions = this.getHTTPHeaders();
        return this.http.get('http://localhost:3000/message', httpOptions)
        .map((respone: Response) => {
            const messages = respone['obj'];
            let myMessages : Message[] = [];
            for(let message of messages) {
                myMessages.push(new Message(message.content,
                     message.user.firstName + ' ' + message.user.lastName,
                      message._id,
                       message.user._id));
            }

            this.messages = myMessages;
            return myMessages;
        })
        .catch((err: any) =>  {
            console.log(err)
            return Observable.throw(err);
        }); 
    }
    

    deleteMessage(message: Message) { 
        var index = this.messages.indexOf(message);
        this.messages.splice(index,1); //delete one, start from index

        let httpOptions = this.getHTTPHeaders();
        const body = JSON.stringify(message);
        return this.http.delete('http://localhost:3000/message/' + message.messageId, httpOptions)
        .map((respone: Response) => {
            const resMessage = respone['message'];
            return resMessage;
        })
        .catch(err => Observable.throw(err.json));
    }

    saveEditedMessage(message: Message) {
        let httpOptions = this.getHTTPHeaders();
        const body = JSON.stringify(message);
        return this.http.patch('http://localhost:3000/message/' + message.messageId, body, httpOptions)
        .map((respone: Response) => {
            const resMessage = respone['message'];
            return resMessage;
        })
        .catch(err => Observable.throw(err.json)); 
    }

    getHTTPHeaders() {
        //This method is being called before every HTTP request in order to make sure we still have the token.
        return {
            headers: new HttpHeaders({
              'Content-Type':  'application/json',
              'Authorization' : `${localStorage.getItem('token')}`})
            };
    }
}