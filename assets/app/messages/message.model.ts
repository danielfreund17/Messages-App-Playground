export class Message{
    content: string;
    userName: string;
    messageId?: string;
    userId?: string;

    constructor(content: string, username: string, messageId?: string, userId?: string ) {
        this.content = content;
        this.userName = username;
        this.messageId  = messageId;
        this.userId = userId;
    }
}