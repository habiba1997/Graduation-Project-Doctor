export class inboxThread{

    sender_id:number;
    receiver_id:number;
    thread_id:number;
​​    msg_subject: string;
    created_date: string;
    is_readed: number;
    sender_name:string;
    receiver_name:string;
    msg_body:string;
    profile_img:String;


    constructor(sender_id?: number,
                receiver_id?:number,
                thread_id?: number,
                msg_subject?: string,
                created_date?: string,
                is_readed?: number,
                sender_name?:string,
                receiver_name?:string,
                msg_body?:string,
                profile_img?:String
    )
    {

        console.log("create new thread obj");
        this.sender_id=sender_id;
        this.receiver_id=receiver_id;
        this.thread_id=thread_id;
        this.msg_subject=msg_subject;
        this.created_date=created_date;
        this.is_readed=is_readed;
        this.sender_name=sender_name;
        this.receiver_name=receiver_name;
        this.msg_body=msg_body;
        this.profile_img=profile_img;

    }

}

