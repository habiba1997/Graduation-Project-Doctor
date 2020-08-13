import {ChangeDetectorRef, Component, OnInit, ViewChild} from '@angular/core';
import { NavigationService } from '../NavService/navigation.service';
import { DatastreamingService } from 'src/app/services/datastream/datastreaming.service';
import { HttpService } from '../HttPService/http.service';
import {
    ActionSheetController,
    AlertController,
    IonContent,
    IonSegment,
    LoadingController,
    Platform, ToastController
} from '@ionic/angular';
import {IinputData, ImagePath} from "../DataModels";
import {Camera, CameraOptions, PictureSourceType} from '@ionic-native/camera/ngx';
import {File, FileEntry} from '@ionic-native/file/ngx';
import {WebView} from '@ionic-native/ionic-webview/ngx';
import {Storage} from '@ionic/storage';
import {FilePath} from '@ionic-native/file-path/ngx';
import {finalize} from "rxjs/operators";
import {NetworkService} from "../../services/Network/network.service";






@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],
})

export class ProfileComponent implements OnInit {
    private InputData:IinputData[];
    private spinnerState:boolean=true;
    private save_state:boolean=true;
    public folder: string;
    // / hold image to render
    public image :any;
    private STORAGE_KEY = 'my_image';

    private profileImage=new ImagePath();
  @ViewChild(IonSegment,{static:false}) ionSegment: IonSegment;
  constructor(private navigation:NavigationService,
    private datastream: DatastreamingService,
    private editPatientService: HttpService,
    private savedata:AlertController,
              private camera: Camera, private file: File, private webview: WebView,
              private actionSheetController: ActionSheetController, private toastController: ToastController,
              private storage: Storage, private plt: Platform, private loadingController: LoadingController,
              private ref: ChangeDetectorRef, private filePath: FilePath,private http:HttpService,private network:NetworkService


) {


  }

  ngOnInit() {
      this.STORAGE_KEY=this.STORAGE_KEY+this.datastream.getDoctorId();
      this.plt.ready().then(() => {
          this.loadStoredImages();
      });
      new Promise((resolve, reject) => {
          this.DataSet();
          console.log("data set has ended");
          if(this.InputData==undefined){reject("undefined User Data");}
          else {resolve();}

      }).then(()=>{this.spinnerState=false; console.log("resolved",this.InputData);}
      ).catch((err) => alert('data stream error'+err));
  }
    DataSet(){
        console.log("data set has started");
        this.InputData=[{
            label:"Name",
            value:this.datastream.getDoctorName(),
            type:"string"},

            {
                label:"Mobile",
                value:this.datastream.getDoctorMobile(),
                type:"string"},
            {
                label:"Specialization",
                value:"",
                type:"string"},
            {
                label:"Years of Experience",
                value:this.datastream.getDoctorYearsOfExperience(),
                type:"number"},
            {
                label:"Clinic Address 1",
                value:"",
                type:"string"},
            {
                label:"Clinic Address 2",
                value:"",
                type:"string"},
            {
                label:"Clinic Address 3",
                value:"",
                type:"string"},


        ];



    }


 edit(){
     this.save_state=false;


 }
 
async save(){
  
  const alert =this.savedata.create({
    header: 'Are you sure you want to save edits?',
    animated :true,
  
    buttons:
    
     [ {text:'Cancel',
    
     handler: async data => {
         this.DataSet();
         this.save_state=true;

     }
      },
       {
      text:'Save',
      
      handler: async  => {

          this.save_state=true;
          let token = this.datastream.getToken();
          console.log("data to save  ",this.InputData);
    this.editPatientService.editDoctorProfile(this.InputData[0].value,this.InputData[3].value).subscribe(
       response=>{
      // this.datastream.setToken(response.token);
      console.log("http request to Change patient Data: "+ JSON.stringify(response));
           this.datastream.changeDoctorData(this.InputData[0].value,this.InputData[3].value);
    }, 
    err =>
    {
      console.log('HTTP Edit profile Error: ', err.error.message);
    });

  }

      
   
  }
    
   
  ]
  });

   (await alert).present();
  }




//Searching for image in our app storage first
loadStoredImages() {
    console.log("load stored images");
    this.storage.get(this.STORAGE_KEY).then(images => {
        if (images) {
            console.log('stored images',images);
            const arr = JSON.parse(images);
            this.image = "";
            for (const img of arr) {
                //path of our app directory
                const filePath = this.file.dataDirectory + img;
                // get path for image on our app directory
                const resPath = this.pathForImage(filePath);
                this.image={ name: img, path: resPath, filePath };
                this.ref.detectChanges();
            }
        }
    });
}
//get image path to render image from
pathForImage(img) {
    if (img === null) {
        return '';
    } else {
        //convert image pah of file:// to WebView Path
        const converted = this.webview.convertFileSrc(img);
        return converted;
    }
}
////action sheet for Choosing How to Capture the image
async selectImage() {
    console.log("select image");
    const actionSheet = await this.actionSheetController.create({
        header: "Select Image source",
        buttons: [{
            text: 'Load from Library',
            handler: () => {
                this.takePicture(this.camera.PictureSourceType.PHOTOLIBRARY);
            }
        },
            {
                text: 'Use Camera',
                handler: () => {
                    this.takePicture(this.camera.PictureSourceType.CAMERA);
                }
            },
            {
                text: 'Cancel',
                role: 'cancel'
            }
        ]
    });
    await actionSheet.present();
}

/////setting Camera Options
takePicture(sourceType: PictureSourceType) {
    //storing Image as URI not base64 to save storage
    console.log("take pics");
    var options: CameraOptions = {
        quality: 100,
        sourceType: sourceType,
        saveToPhotoAlbum: false,
        correctOrientation: true
    };
// get copy of the original selected image to our app directory
    this.camera.getPicture(options).then(imagePath => {
        if( this.network.NetworkStateGetter()) {
            if (this.plt.is('android') && sourceType === this.camera.PictureSourceType.PHOTOLIBRARY) {
                this.filePath.resolveNativePath(imagePath)
                    .then(filePath => {
                        let correctPath = filePath.substr(0, filePath.lastIndexOf('/') + 1);
                        let currentName = imagePath.substring(imagePath.lastIndexOf('/') + 1, imagePath.lastIndexOf('?'));
                        this.profileImage = {
                            path: correctPath + currentName,
                            currentName: currentName,
                            correctPath: correctPath
                        };
                        this.startUpload(this.profileImage.path);


                    });
            } else {
                var currentName = imagePath.substr(imagePath.lastIndexOf('/') + 1);
                var correctPath = imagePath.substr(0, imagePath.lastIndexOf('/') + 1);
                this.profileImage = {
                    path: correctPath + currentName,
                    currentName: currentName,
                    correctPath: correctPath
                };
                this.startUpload(this.profileImage.path);


            }
        }
        else {
            alert("you are Offline");
        }
    });

}
//create new file name for the image to be stored in our app storage
createFileName() {
    var d = new Date(),
        n = d.getTime(),

        newFileName = n + ".jpg";
    return newFileName;
}

//copy image with new name and path to our app directory
copyFileToLocalDir(namePath, currentName, newFileName) {
    console.log("copy to local directory");
    this.file.copyFile(namePath, currentName, this.file.dataDirectory, newFileName).then(success => {
        //Updating Local Storage
        this.updateStoredImages(newFileName);
    }, error => {
        alert('Error while storing file.'+error);
    });
}
updateStoredImages(name) {
    console.log("update stored image ");
    new Promise((resolve, reject) => {
        this.storage.get(this.STORAGE_KEY).then(images => {
            let arr = JSON.parse(images);
            let newImage = [name];
            this.storage.set(this.STORAGE_KEY, JSON.stringify(newImage));
            let filePath = this.file.dataDirectory + name;
            let resPath = this.pathForImage(filePath);
            // Data Object to hold new image data
            this.image = {
                name: name,
                path: resPath,
                filePath: filePath
            };
            this.ref.detectChanges(); // trigger change detection cycle
            this.datastream.changeDoctorProfileImage(this.image.path);
            if(this.image==undefined){
                reject("undefined image file");
            }
            else {resolve();}

        }).catch(err=>{alert(err)});

    });



}

startUpload(imgEntry) {
    console.log("start up upload");
    console.log("image data to be uploaded",imgEntry);
    this.file.resolveLocalFilesystemUrl(imgEntry)
        .then(entry => {
            ( < FileEntry > entry).file(file => this.readFile(file))
        })
        .catch(err => {
            alert('Error while reading file '+err);
        });
}

readFile(file: any) {
    console.log("read file ");
    const reader = new FileReader();
    reader.onload = () => {
        const formData = new FormData();
        const imgBlob = new Blob([reader.result], {
            type: file.type
        });
        formData.append('file', imgBlob);
        this.uploadImageData(formData).then(()=>console.log("returned from uploading"));
    };
    reader.readAsArrayBuffer(file);
}

async uploadImageData(formData: FormData) {
    console.log("upload image data image");
    const loading = await this.loadingController.create({
        message: 'Uploading image...',
    });
    await loading.present();

    //http goes here
    this.http.postProfileImage(formData).pipe(
        finalize(() => {
            console.log("Finalize");
            loading.dismiss();
        })
    ).subscribe(res => {
            console.log("http post image");
            console.log(res);
            this.copyFileToLocalDir(this.profileImage.correctPath, this.profileImage.currentName, this.createFileName());
        },error1 => {alert(error1+'http error');}
    );


}

}



