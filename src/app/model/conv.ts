export interface Iconvs{
    sender_id:number,
    receiver_id:number,
    thread_id:number,
    ​​msg_subject: string,
    created_date: string;
    is_readed: number,
    sender_name:string,
    receiver_name:string,
    msg_body:string,
}
export interface Reply{
    sender_id: number,
    receiver_id	:number,
    sender_name: String,
    receiver_name:String,
    msg_body:String,
    thread_subject:string,
    fcm_token:string
}
