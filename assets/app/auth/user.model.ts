export class User {
    constructor(public email: string,
                public password: string,
                public groupName?: string,
                public firstName?: string,
                public lastName?: string) {
        
    }
}