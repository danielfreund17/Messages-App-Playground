export class Message{
    public content: string;
    public userName?: string;
    public groupName?: string;
    public messageId?: string;
    public userId?: string;

    constructor(content: string, username?: string,group?:string, messageId?: string, userId?: string) {
        this.content = content;
        this.userName = username;
        this.messageId  = messageId;
        this.userId = userId;
        this.groupName = group;
    }
}