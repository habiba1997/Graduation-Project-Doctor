
export class patientData{

      patientId: number;
      name: string;
      fcmtoken:string;
      age:number;
      address: string;
      mobile: string;
      relationId: number;
      user_img:String;

      constructor(patientId?: number,
        name?: string,
        fcmtoken?: string,
        mobile?: string,
        age?:number,
        address?:string,
        relationid?: number,
                  user_img?:String)
      {
        this.patientId= patientId;
        this.name= name;
        this.fcmtoken= fcmtoken;
        this.mobile= mobile;
        this.age= age;
        this.relationId= relationid;
        this.address = address;
        this.user_img=user_img;
      }
  }
