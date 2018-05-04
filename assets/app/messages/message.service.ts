import { Message } from "./message.model";
import {HttpClient, HttpHeaders} from "@angular/common/http"
import { Injectable } from "@angular/core";
import 'rxjs/Rx'
import { Observable } from "rxjs/Observable";
import { AuthService } from "../auth/auth.service";
import { Urls } from "../../urlsconfig";

@Injectable()
export class MessageService {
    private messages: Message[] = [];

    constructor(private http: HttpClient, private authService: AuthService) {
        this.authService.onLogoutEvent.subscribe({
            next: () => this.messages = null
        });
    }

    addMessage(message : Message){
        let httpOptions = this.getHTTPHeaders(); //Get http headers, including the jwt of the logged in user
        const body = JSON.stringify(message);
        return this.http.post(Urls.URL + 'message', body, httpOptions)
        .map((response : Response) => {
            const msg = response['msg'];
            const firstName = response['userFirstName'];
            const lastName = response['userLastName'];
            const newMessage = new Message(msg.content,
                firstName + ' ' + lastName,
                msg.groupName,
                 msg._id,
                 msg.user
                );
        })
        .catch(err => Observable.throw(err.json)); // only creates observable
    }

    getMessages(){
        let httpOptions = this.getHTTPHeaders();
        return this.http.get(Urls.URL + 'message', httpOptions)
        .map((respone: Response) => {
            const messages = respone['obj'];
            let myMessages : Message[] = [];
            for(let message of messages) {
                myMessages.push(new Message(message.content,
                     message.user.firstName + ' ' + message.user.lastName,
                     null, //Group is not needed at client for now
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
        return this.http.delete(Urls.URL + 'message/' + message.messageId, httpOptions)
        .map((respone: Response) => {
            const resMessage = respone['message'];
            return resMessage;
        })
        .catch(err => Observable.throw(err.json));
    }

    saveEditedMessage(message: Message) {
        let httpOptions = this.getHTTPHeaders();
        const body = JSON.stringify(message);
        return this.http.patch(Urls.URL + 'message/' + message.messageId, body, httpOptions)
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