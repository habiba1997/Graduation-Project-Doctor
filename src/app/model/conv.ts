export interface Iconvs{
      
    sender_id:number;
    // @ts-ignore
    receiver_name:string,
    thread_id:number,
    ​​msg_subject: string,
    created_date: string,
    is_readed: number,
    sender_name:string,
    receiver_name_string:string,
    msg_body:string;
}
export interface Reply{
    sender_id: number,
    reciever_id	:number,
    msg_body:String,
    thread_subject:string,
    fcm_token:string
}
